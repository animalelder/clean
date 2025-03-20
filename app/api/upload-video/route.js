import {
  getContainerClient,
  uploadFileToBlob,
} from "@/lib/azure-storage-utility";

// For App Router, we need to use a different config approach
export const dynamic = "force-dynamic"; // Equivalent to disabling static optimization

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

    if (!week || !day || !videoFile || !cohort || !firstName || !lastName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Validate week and day values
    const weekNum = parseInt(week, 10);
    const dayNum = parseInt(day, 10);
    const cohortNum = parseInt(cohort, 10);

    if (isNaN(weekNum) || weekNum < 1 || weekNum > 5) {
      return new Response(
        JSON.stringify({ error: "Week must be between 1 and 5" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (isNaN(dayNum) || dayNum < 1 || dayNum > 7) {
      return new Response(
        JSON.stringify({ error: "Day must be between 1 and 7" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (isNaN(cohortNum) || cohortNum < 45 || cohortNum > 100) {
      return new Response(
        JSON.stringify({ error: "cohort must be between 45 and 100" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Extract file information
    const originalFilename = videoFile.name || "video.mp4";
    // Remove special characters and spaces from filename
    const cleanFilename = originalFilename.replace(/[^a-zA-Z0-9.-]/g, "_");

    // Create the blob path with week/day structure
    const blobName = `cohort-${cohortNum}/wk-${weekNum}/day-${dayNum}/${firstName}_${lastName}/testimonial-${cleanFilename}_${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

    // Get the container client
    const containerClient = getContainerClient();

    // Convert the file to buffer
    const fileBuffer = await videoFile.arrayBuffer();

    // Upload to Azure Blob Storage
    await uploadFileToBlob(containerClient, blobName, Buffer.from(fileBuffer));

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Video uploaded successfully",
        path: blobName,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Upload error:", error);

    // Return error response
    return new Response(
      JSON.stringify({
        error: "Upload failed",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

// If you want to handle other HTTP methods, export them as named functions
export async function GET() {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}
