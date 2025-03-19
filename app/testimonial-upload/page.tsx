"use client";

import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [week, setWeek] = useState("");
  const [day, setDay] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Generate options for select inputs
  const weekOptions = Array.from({ length: 5 }, (_, i) => i + 1);
  const dayOptions = Array.from({ length: 7 }, (_, i) => i + 1);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes("video")) {
      setFile(selectedFile);

      // Create a preview URL for the video
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setFile(null);
      setPreviewUrl(null);
      alert("Please select a valid video file");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!week || !day || !file) {
      alert("Please select a week, day, and video file");
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append("week", week);
      formData.append("day", day);
      formData.append("video", file);

      const response = await fetch("/api/uploadVideo", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus({
          success: true,
          message: "Video uploaded successfully!",
        });

        // Reset form after successful upload
        setFile(null);
        setPreviewUrl(null);
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus({
        success: false,
        message: `Upload failed: ${error.message}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Handle reset of the form
  const handleReset = () => {
    setWeek("");
    setDay("");
    setFile(null);
    setPreviewUrl(null);
    setUploadStatus(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-bg">
      <Head>
        <title>Video Upload for Azure</title>
        <meta
          name="description"
          content="Upload videos to Azure Blob Storage"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-title-black">
          Upload Video
        </h1>

        <div className="mx-auto max-w-md">
          {uploadStatus && uploadStatus.success ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
              <p className="mb-4 text-lg text-green-700">
                {uploadStatus.message}
              </p>
              <button
                onClick={handleReset}
                className="rounded-lg bg-primaryred px-6 py-2 text-white transition-colors hover:bg-primaryred-800"
              >
                Upload Another Video
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <div className="mb-4">
                <label
                  htmlFor="week"
                  className="mb-2 block font-medium text-description-gray"
                >
                  Select Week:
                </label>
                <select
                  id="week"
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-formfield px-4 py-2 focus:border-primaryred focus:ring-primaryred"
                >
                  <option value="">-- Select Week --</option>
                  {weekOptions.map((num) => (
                    <option
                      key={`week-${num}`}
                      value={num}
                    >
                      Week {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="day"
                  className="mb-2 block font-medium text-description-gray"
                >
                  Select Day:
                </label>
                <select
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-formfield px-4 py-2 focus:border-primaryred focus:ring-primaryred"
                >
                  <option value="">-- Select Day --</option>
                  {dayOptions.map((num) => (
                    <option
                      key={`day-${num}`}
                      value={num}
                    >
                      Day {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="video"
                  className="mb-2 block font-medium text-description-gray"
                >
                  Upload Video:
                </label>
                <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="video"
                        className="relative cursor-pointer rounded-md font-medium text-primaryred hover:text-primaryred-700 focus:outline-none"
                      >
                        <span>Upload a video</span>
                        <input
                          id="video"
                          type="file"
                          accept="video/*"
                          onChange={handleFileChange}
                          required
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">MP4, MOV, AVI, etc.</p>
                  </div>
                </div>
              </div>

              {previewUrl && (
                <div className="mb-6">
                  <h3 className="mb-2 font-medium text-description-gray">
                    Preview:
                  </h3>
                  <div className="overflow-hidden rounded-lg">
                    <video
                      controls
                      className="h-auto w-full"
                    >
                      <source
                        src={previewUrl}
                        type={file.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!week || !day || !file || isUploading}
                  className={`rounded-lg px-6 py-2 text-white transition-colors ${
                    !week || !day || !file || isUploading
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-primaryred hover:bg-primaryred-800"
                  }`}
                >
                  {isUploading ? "Uploading..." : "Upload Video"}
                </button>
              </div>

              {isUploading && (
                <div className="mt-6 text-center">
                  <div className="inline-block animate-roll">
                    <svg
                      className="h-8 w-8 text-primaryred"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <p className="mt-2 text-description-gray">
                    Uploading your video to Azure...
                  </p>
                </div>
              )}

              {uploadStatus && !uploadStatus.success && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-red-700">
                  <p>{uploadStatus.message}</p>
                </div>
              )}
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
