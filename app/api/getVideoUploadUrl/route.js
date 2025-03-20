// app/api/getVideoUploadUrl/route.js

import {
  BlobSASPermissions,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the multipart form data
    const formData = await request.formData();

    // Extract form fields
    const cohort = formData.get("cohort");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const week = formData.get("week");
    const day = formData.get("day");
    const videoFile = formData.get("video");

    // Validate required fields
    if (!cohort || !firstName || !lastName || !week || !day || !videoFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Get file details
    const filename = videoFile.name;
    const contentType = videoFile.type;

    // Validate that the content type is a video
    if (!contentType.startsWith("video/")) {
      return NextResponse.json(
        { error: "Only video files are allowed" },
        { status: 400 },
      );
    }

    // Azure Storage account details from environment variables
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

    if (!accountName || !accountKey || !containerName) {
      return NextResponse.json(
        { error: "Azure Storage configuration missing" },
        { status: 500 },
      );
    }

    // Determine file extension
    let extension = "";

    // Extract extension from the original filename if available
    const fileExtMatch = filename.match(/\.[^.]+$/);
    if (fileExtMatch) {
      extension = fileExtMatch[0];
    } else if (contentType) {
      // Set extension based on content type
      switch (contentType) {
        case "video/mp4":
          extension = ".mp4";
          break;
        case "video/webm":
          extension = ".webm";
          break;
        case "video/ogg":
          extension = ".ogv";
          break;
        case "video/quicktime":
          extension = ".mov";
          break;
        default:
          extension = ".mp4"; // Default fallback
      }
    }

    // Create a structured blob name using form data
    const sanitizedName =
      `${firstName.toLowerCase()}-${lastName.toLowerCase()}`.replace(
        /[^a-z0-9-]/g,
        "",
      );
    const blobName = `cohort${cohort}/week${week}/day${day}/${sanitizedName}-${Date.now()}${extension}`;

    // Create Credentials
    const sharedKeyCredential = new StorageSharedKeyCredential(
      accountName,
      accountKey,
    );

    // Set Permissions and Expiry
    const sasPermissions = new BlobSASPermissions();
    sasPermissions.write = true; // Allow write permissions

    const startDate = new Date();
    const expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 30); // Token valid for 30mins

    // Generate SAS token
    const sasToken = generateBlobSASQueryParameters(
      {
        containerName,
        blobName,
        permissions: sasPermissions,
        startsOn: startDate,
        expiresOn: expiryDate,
      },
      sharedKeyCredential,
    ).toString();

    // Construct full upload URL
    const uploadUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;

    // Read the file as ArrayBuffer
    const arrayBuffer = await videoFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload the file to Azure Blob Storage
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
        "x-ms-blob-type": "BlockBlob",
      },
      body: buffer,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    // Create a publicly accessible URL (without SAS token) for future reference
    const publicUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

    // Return success response to the client
    return NextResponse.json({
      success: true,
      message: "Video uploaded successfully!",
      blobName,
      publicUrl,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json(
      { error: "Failed to upload video: " + error.message },
      { status: 500 },
    );
  }
}

// Enable CORS by specifying allowed HTTP methods
export const OPTIONS = async () => {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    },
  );
};
