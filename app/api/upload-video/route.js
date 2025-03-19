import fs from "fs";
import { BlobServiceClient } from "@azure/storage-blob";
import { IncomingForm } from "formidable";

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse the form with formidable
    const form = new IncomingForm();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Get form data
    const week = fields.week[0];
    const day = fields.day[0];
    const videoFile = files.video[0];

    // Connect to Azure Blob Storage
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      `DefaultEndpointsProtocol=https;AccountName=${process.env.AZURE_STORAGE_ACCOUNT_NAME};AccountKey=${process.env.AZURE_STORAGE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`,
    );

    const containerClient = blobServiceClient.getContainerClient(
      process.env.AZURE_STORAGE_CONTAINER_NAME,
    );

    // Create the path with week/day structure
    const originalFilename = videoFile.originalFilename || "video.mp4";
    const blobName = `${week}/${day}/${originalFilename}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the file
    const fileBuffer = fs.readFileSync(videoFile.filepath);
    const uploadResponse = await blockBlobClient.upload(
      fileBuffer,
      fileBuffer.length,
    );

    // Clean up the temporary file
    fs.unlinkSync(videoFile.filepath);

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      path: blobName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
}
