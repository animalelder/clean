import { BlobServiceClient } from "@azure/storage-blob";

// Create a connection string for the Azure Blob Storage account
const getConnectionString = () => {
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

  if (!accountName || !accountKey) {
    throw new Error(
      "Azure Storage credentials not found in environment variables",
    );
  }

  return `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=core.windows.net`;
};

// Get a reference to the blob service client
export const getBlobServiceClient = () => {
  const connectionString = getConnectionString();
  return BlobServiceClient.fromConnectionString(connectionString);
};

// Get a reference to a container client
export const getContainerClient = (
  containerName = process.env.AZURE_STORAGE_CONTAINER_NAME,
) => {
  if (!containerName) {
    throw new Error(
      "Azure Storage container name not found in environment variables",
    );
  }

  const blobServiceClient = getBlobServiceClient();
  return blobServiceClient.getContainerClient(containerName);
};

// Upload a file to a specific path in the container
export const uploadFileToBlob = async (
  containerClient,
  blobName,
  fileBuffer,
) => {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Set the content type based on the file extension
  const contentType = getContentTypeFromFileName(blobName);
  const options = { blobHTTPHeaders: { blobContentType: contentType } };

  // Upload the file
  return blockBlobClient.upload(fileBuffer, fileBuffer.length, options);
};

// Helper function to determine content type from filename
const getContentTypeFromFileName = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();

  const contentTypes = {
    mp4: "video/mp4",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    wmv: "video/x-ms-wmv",
    mkv: "video/x-matroska",
    webm: "video/webm",
  };

  return contentTypes[extension] || "application/octet-stream";
};
