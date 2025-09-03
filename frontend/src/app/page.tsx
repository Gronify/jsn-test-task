"use client";

import React, { useState, ChangeEvent } from "react";

interface UploadedFile {
  id: string;
  path: string;
}

export default function MultiFileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert("Select at least one file");

    setUploading(true);
    const uploaded: UploadedFile[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("http://localhost:3001/api/v1/files/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const data: UploadedFile = await res.json();
        uploaded.push(data);
      } catch (err) {
        console.error(err);
        alert(`Failed to upload file: ${file.name}`);
      }
    }

    setUploadedFiles(uploaded);
    setUploading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Multiple Files</h2>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="border p-2 rounded mb-4 w-full"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Uploaded Files:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="border p-2 rounded">
                <p className="text-sm truncate">{file.id}</p>
                <a
                  href={file.path}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Open
                </a>
                <img
                  src={file.path}
                  alt={file.id}
                  className="mt-2 w-full h-32 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
