import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { NextResponse } from "next/server";
import StoreMetadata from "@/lib/video-upload/store-metadata";
import UploadImageStream from "@/lib/video-upload/upload-image-stream";

// For App Router, we need to use a different config approach
export const dynamic = "force-dynamic"; // Equivalent to disabling static optimization

// initialization variables
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

// Create a StorageSharedKeyCredential object
const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey,
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential,
);
// azure client
const containerClient = blobServiceClient.getContainerClient(containerName);

// Export the POST method as a named function
export async function POST(request) {
  try {
    // Use the native FormData API with App Router
    const formData = await request.formData();

    // Get form data fields
    const cohort = formData.get("cohort");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const week = formData.get("week");
    const day = formData.get("day");
    const videoFile = formData.get("video");
    let imageUrl;

    if (!week || !day || !videoFile || !cohort || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate week and day values
    const weekNum = parseInt(week, 10);
    const dayNum = parseInt(day, 10);
    const cohortNum = parseInt(cohort, 10);

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

    if (isNaN(cohortNum) || cohortNum < 45 || cohortNum > 100) {
      return NextResponse.json(
        { error: "cohort must be between 45 and 100" },
        { status: 400 },
      );
    }

    // Extract file information
    const originalFilename = videoFile.name || "video.mp4";
    // Remove special characters and spaces from filename
    const cleanFilename = originalFilename.replace(/[^a-zA-Z0-9.-]/g, "_");

    // Create the blob path with week/day structure
    const blobName = `cohort-${cohortNum}/wk-${weekNum}/day-${dayNum}/${firstName}_${lastName}/testimonial-${cleanFilename}_${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

    // helper function for uploading image as a stream to azure
    try {
      imageUrl = await UploadImageStream(
        containerClient,
        cleanFilename,
        videoFile,
      );
    } catch (error) {
      console.log("Error in storing metadata: ", error);
      return NextResponse.json(
        {
          success: false,
          message: "Error in uploading image stream: " + error,
          path: blobName,
        },
        { status: 500 },
      );
    }

    // helper function to upload metadata to mongodb

    if (imageUrl) {
      try {
        await StoreMetadata(
          cohort,
          firstName,
          lastName,
          week,
          day,
          cleanFilename,
          imageUrl,
        );
      } catch (error) {
        console.log("Error in storing metadata: ", error);
        return NextResponse.json(
          {
            success: false,
            message: "Error in storing metadata: " + error,
            path: blobName,
          },
          { status: 500 },
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "ImageUrl not created; please try again",
          path: blobName,
        },
        { status: 500 },
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Video uploaded successfully",
        path: blobName,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Video uploaded unsuccessful: " + error,
        path: blobName,
      },
      { status: 500 },
    );
  }
}
