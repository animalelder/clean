"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function VideoUploadPage() {
  const [file, setFile] = useState(null);
  const [week, setWeek] = useState("");
  const [day, setDay] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  // Generate options for weeks (1-5)
  const weekOptions = Array.from({ length: 5 }, (_, i) => i + 1);

  // Day options (1-7)
  const dayOptions = Array.from({ length: 7 }, (_, i) => (i + 1).toString());

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes("video/")) {
      setFile(selectedFile);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Please select a valid video file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !week || !day) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      setUploading(true);
      setMessage("");
      setUploadProgress(0);

      // Generate a unique filename
      const fileExtension = file.name.split(".").pop();
      const uniqueFileName = `${uuidv4()}.${fileExtension}`;

      // Get the upload URL from our API
      const response = await fetch("/api/get-upload-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: uniqueFileName,
          contentType: file.type,
          week: week,
          day: day,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to get upload URL");
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { uploadUrl, _blobPath } = await response.json();

      // Upload the file directly to Azure Blob Storage
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload the file");
      }

      setMessage("Video uploaded successfully!");
      // Clear the form
      setFile(null);
      setWeek("");
      setDay("");
      // Reset the file input
      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Video Upload</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="mb-2 block">Select Video:</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full border p-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block">Select Week:</label>
          <select
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            className="w-full border p-2"
            required
          >
            <option value="">Select a week</option>
            {weekOptions.map((w) => (
              <option
                key={w}
                value={w}
              >
                Week {w}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block">Select Day:</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full border p-2"
            required
          >
            <option value="">Select a day</option>
            {dayOptions.map((d) => (
              <option
                key={d}
                value={d}
              >
                Day {d}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded bg-primary-red px-4 py-2 text-white hover:bg-red-700 disabled:bg-red-300"
          disabled={!file || !week || !day || uploading}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>

        {uploading && (
          <div className="mt-2 h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-primary-red"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {message && (
          <p
            className={`text-${message.includes("Error") ? "red" : "green"}-500`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
