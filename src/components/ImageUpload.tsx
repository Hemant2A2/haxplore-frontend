import React, { useState } from "react";

const ImageUpload: React.FC<{ onUpload: (images: string[]) => void }> = ({
  onUpload,
}) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = async (files: FileList | File[]) => {
    const formData = new FormData();
    Array.from(files).forEach((file: any) => formData.append("images", file));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const uploadedImages = await response.json();
        setPreviewImages(uploadedImages);
        onUpload(uploadedImages);
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed p-4 text-center cursor-pointer"
    >
      <p>Drag & drop images here or click to select</p>
      <input
        type="file"
        multiple
        onChange={(e) => handleFiles(e.target.files || [])}
        className="hidden"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {previewImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Preview"
            className="w-20 h-20 object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
