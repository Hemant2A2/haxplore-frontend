// ImageUpload.tsx
import React, { useState, useRef } from "react";

interface ImageUploadProps {
  onUpload: (images: string[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  // previewImages is an array of preview URLs
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = async (files: File[] | FileList) => {
    const formData = new FormData();
    // Ensure we convert FileList to an Array if needed.
    const fileArray = Array.isArray(files) ? files : Array.from(files);
    
    // Use the key "file" (which matches your backend's middleware)
    fileArray.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        // data.previewPaths is expected to be an array.
        const previews: string[] = data.previewPaths || [];
        setPreviewImages(previews);
        // Call the onUpload callback to pass the preview URLs up to the parent.
        onUpload(previews);
      } else {
        console.error("Upload failed with status", response.status);
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleClick}
      className="border-2 border-dashed p-4 text-center cursor-pointer hover:bg-gray-100 transition"
    >
      <p>Drag & drop an image here or click to select</p>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleInputChange}
        className="hidden"
      />
      {/* <div className="mt-2 flex flex-wrap gap-2 justify-center">
        {previewImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Preview"
            className="w-20 h-20 object-cover rounded"
          />
        ))}
      </div> */}
    </div>
  );
};

export default ImageUpload;
