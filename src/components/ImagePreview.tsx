import React from "react";

interface ImagePreviewProps {
  imageFile: File;
  imageUrl: string;
  onRemove: () => void;
}

export default function ImagePreview({ imageFile, imageUrl, onRemove }: ImagePreviewProps) {
  return (
    <div className="text-center">
      <img src={imageUrl} alt="Uploaded Preview" className="img-fluid rounded mb-3" style={{ maxHeight: "300px" }} />
      <br />
      <button className="btn btn-danger" onClick={onRemove}>
        הסר תמונה
      </button>
    </div>
  );
}