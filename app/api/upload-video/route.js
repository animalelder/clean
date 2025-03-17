import {
  BlobSASPermissions,
  BlobServiceClient,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

export async function POST(request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { filename, contentType, week, day } = await request.json();

    // Azure Storage account information
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

    if (!accountName || !accountKey || !containerName) {
      return new Response(
        JSON.stringify({ error: "Azure Storage configuration missing" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Create a directory path based on week and day
    const blobPath = `week${week}/day${day}/${filename}`;

    // Create shared key credential
    const sharedKeyCredential = new StorageSharedKeyCredential(
      accountName,
      accountKey,
    );

    // Create blob service client
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      sharedKeyCredential,
    );

    // Get container client
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Generate SAS token with permissions to create the blob
    const sasOptions = {
      containerName,
      blobName: blobPath,
      permissions: BlobSASPermissions.parse("racwd"), // read, add, create, write, delete
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 hour from now
    };

    const sasToken = generateBlobSASQueryParameters(
      sasOptions,
      sharedKeyCredential,
    ).toString();

    // Construct the upload URL with SAS token
    const uploadUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobPath}?${sasToken}`;

    return new Response(
      JSON.stringify({
        uploadUrl,
        blobPath,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error generating SAS URL:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate upload URL" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
