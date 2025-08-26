"use client";

import { useRef, useState } from "react";
import { useImageKitUpload } from "@/components/useImageKitUpload";
import { ImageVariantType } from "@/models/Product";

const Upload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    license: "personal" as "personal" | "commercial",
  });

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { uploadFile, abortUpload, progress, isUploading } = useImageKitUpload({
    async onSuccess(response) {
      console.log("✅ Uploaded:", response);
      setUploadedUrl(response?.url || null);
      setMessage({ type: "success", text: "Image uploaded successfully!" });
    },
    onError(error) {
      console.error("❌ Upload error:", error);
      setMessage({ type: "error", text: error.message });
    },
  });

  const handleFileSelect = () => {
    const file = fileInputRef.current?.files?.[0];
    setSelectedFile(file || null);
    setMessage(null);
  };

  const handleUpload = () => {
    if (!selectedFile) return alert("Please select a file!");
    uploadFile(selectedFile);
  };

  const removeFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSelectedFile(null);
    setUploadedUrl(null);
    setMessage(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/upload-media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          imageUrl: uploadedUrl,
          type: "image",
          variants: [
            {
              type: "SQUARE" as ImageVariantType,
              price: Number(formData.price),
              license: formData.license,
            },
          ],
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error });
      } else {
        setMessage({ type: "success", text: "Metadata saved successfully!" });
        console.log("Saved:", data);
        setFormData({
          name: "",
          description: "",
          price: "",
          license: "personal",
        });
        setSelectedFile(null);
        setUploadedUrl(null);
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Something went wrong." });
    }
  };

  return (
    <div className="flex justify-center  items-center  mt-2.5">
      <div className="w-full max-w-md mx-auto p-3 bg-white shadow rounded-xl space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Create Product</h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleFormChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">License</label>
            <select
              name="license"
              value={formData.license}
              onChange={handleFormChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            >
              <option value="personal">Personal</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-2 border border-dashed border-gray-400 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              {selectedFile ? "Change File" : "Select File"}
            </button>

            {selectedFile && (
              <div className="flex items-center gap-4 p-3 border rounded-lg bg-gray-50">
                {selectedFile.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">
                    📄
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {selectedFile.name.slice(0, 20)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              {selectedFile && !isUploading && (
                <button
                  type="button"
                  onClick={handleUpload}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Upload
                </button>
              )}
              {isUploading && (
                <>
                  <button
                    type="button"
                    onClick={abortUpload}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <progress value={progress} max={100} className="w-full"></progress>
                </>
              )}
              {selectedFile && !isUploading && (
                <button
                  type="button"
                  onClick={removeFile}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Remove
                </button>
              )}
            </div>

            {uploadedUrl && (
              <p className="text-xs text-green-600 break-words">
                Uploaded: {uploadedUrl}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save Product
          </button>
        </form>

        {message && (
          <p
            className={`text-sm font-medium ${message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Upload;
