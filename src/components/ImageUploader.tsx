import React from "react";

export interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

export default function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="text-center px-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="form-control"
      />
    </div>
  );
}
