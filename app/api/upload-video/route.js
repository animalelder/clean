import { NextResponse } from "next/server";
import {
  getContainerClient,
  uploadFileToBlob,
} from "@/lib/azure-storage-utility";

// Make route dynamic to handle form submissions
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    // Use the native FormData API for parsing the request
    const formData = await request.formData();

    // Get form data fields
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const week = formData.get("week");
    const day = formData.get("day");
    const videoFile = formData.get("video");

    if (!week || !day || !file || !firstName || !lastName || !videoFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate week and day values
    const weekNum = parseInt(week, 10);
    const dayNum = parseInt(day, 10);

    if (isNaN(weekNum) || weekNum < 1 || weekNum > 5) {
      return NextResponse.json(
        { error: "Week must be between 1 and 5" },
        { status: 400 },
      );
    }

    if (isNaN(dayNum) || dayNum < 1 || dayNum > 7) {
      return NextResponse.json(
        { error: "Day must be between 1 and 7" },
        { status: 400 },
      );
    }

    // Check if videoFile is actually a File object
    if (!(videoFile instanceof File)) {
      return NextResponse.json(
        { error: "Invalid file uploaded" },
        { status: 400 },
      );
    }

    // Extract file information
    const originalFilename = videoFile.name || "video.mp4";
    // Remove special characters and spaces from filename
    const cleanFilename = originalFilename.replace(/[^a-zA-Z0-9.-]/g, "_");

    // Create the blob path with week/day structure
    const blobName = `${weekNum}/${dayNum}/${firstName}_${lastName}/${cleanFilename}`;

    // Get the container client
    const containerClient = getContainerClient();

    // Convert the file to a buffer
    const fileArrayBuffer = await videoFile.arrayBuffer();
    const fileBuffer = Buffer.from(fileArrayBuffer);

    // Upload to Azure Blob Storage
    await uploadFileToBlob(containerClient, blobName, fileBuffer);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Video uploaded successfully",
      path: blobName,
    });
  } catch (error) {
    console.error("Upload error:", error);

    // Return error response
    return NextResponse.json(
      {
        error: "Upload failed",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

// Handle GET requests (method not allowed)
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
