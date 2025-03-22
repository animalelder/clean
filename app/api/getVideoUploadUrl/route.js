// /app/api/getVideoUploadUrl/route.js
import { randomUUID } from "crypto";
import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";
import { NextResponse } from "next/server";

// Maximum size of each chunk in bytes (4MB)
const CHUNK_SIZE = 4 * 1024 * 1024;

export async function POST(request) {
  try {
    // Extract environment variables
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

    // Check if Azure credentials are available
    if (!accountName || !accountKey || !containerName) {
      console.error("Azure Storage credentials are missing");
      return NextResponse.json(
        { error: "Storage configuration is missing" },
        { status: 500 },
      );
    }

    // Parse form data
    const formData = await request.formData();
    const cohort = formData.get("cohort");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const week = formData.get("week");
    const day = formData.get("day");
    const videoFile = formData.get("video");

    // Validate form data
    if (!cohort || !firstName || !lastName || !week || !day || !videoFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Validate that the file is a video
    if (!videoFile.type.includes("video/")) {
      return NextResponse.json(
        { error: "Uploaded file must be a video" },
        { status: 400 },
      );
    }

    // Sanitize file name (remove special characters)
    const sanitizedName = `${firstName.replace(/[^a-z0-9]/gi, "")}-${lastName.replace(/[^a-z0-9]/gi, "")}`;

    // Get file extension
    const fileName = videoFile.name;
    const extension = fileName.substring(fileName.lastIndexOf("."));

    // Create blob name using the specified convention
    const blobName = `cohort${cohort}/week${week}/day${day}/${sanitizedName}-${Date.now()}${extension}`;

    // Create Azure Blob Service connection string
    const connectionString = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=core.windows.net`;

    // Create blob service client
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create a block blob client for this specific upload
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Read the file as an ArrayBuffer
    const fileBuffer = await videoFile.arrayBuffer();

    // Upload the file in chunks
    const blockIds = [];
    let startIndex = 0;

    while (startIndex < fileBuffer.byteLength) {
      const endIndex = Math.min(startIndex + CHUNK_SIZE, fileBuffer.byteLength);
      const chunk = fileBuffer.slice(startIndex, endIndex);

      // Create a unique block ID for each chunk (base64 encoded)
      const blockId = Buffer.from(`block-${randomUUID()}`).toString("base64");
      blockIds.push(blockId);

      // Upload the chunk as a block
      await blockBlobClient.stageBlock(blockId, chunk, chunk.byteLength);

      startIndex = endIndex;
    }

    // Commit all blocks together to finalize the blob
    await blockBlobClient.commitBlockList(blockIds, {
      blobHTTPHeaders: {
        blobContentType: videoFile.type,
      },
    });

    // Return success response with the blob URL
    return NextResponse.json({
      success: true,
      message: "Video uploaded successfully",
      blobUrl: blockBlobClient.url,
    });
  } catch (error) {
    console.error("Error uploading to Azure:", error);
    return NextResponse.json(
      { error: "Failed to upload video: " + error.message },
      { status: 500 },
    );
  }
}
