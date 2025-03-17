"use client";

import { useState } from "react";
import Link from "next/link";

export default function VideoUploadPage() {
  const [file, setFile] = useState(null);
  const [week, setWeek] = useState("");
  const [day, setDay] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Generate options for weeks (1-52)
  const weekOptions = Array.from({ length: 52 }, (_, i) => i + 1);

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
    // We'll implement this in the next step
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
          className="rounded bg-primary-red px-4 py-2 text-white"
          disabled={!file || !week || !day || uploading}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>

        {message && <p className="text-red-500">{message}</p>}
      </form>
    </div>
  );
}
