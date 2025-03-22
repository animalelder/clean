export default async function UploadImageStream(
  containerClient,
  blobName,
  videoFile,
) {
  try {
    if (!containerClient) {
      throw new Error("Container client is undefined");
    }

    // Get the block blob client from the container client
    const blobClient = containerClient.getBlockBlobClient(blobName);

    if (!blobClient || !blobClient.url) {
      throw new Error("Blob client or URL is undefined");
    }

    console.log("Uploading to blob:", blobClient.url);

    // Convert the FormData file to an array buffer and upload
    const arrayBuffer = await videoFile.arrayBuffer();
    await blobClient.uploadData(arrayBuffer);

    // Return the URL stored from the blob client
    return blobClient.url;
  } catch (error) {
    console.error("Error in UploadImageStream:", error);
    throw error;
  }
}
