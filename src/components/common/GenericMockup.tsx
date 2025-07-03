import React from "react";

export interface Overlay {
  src: string;
  style?: React.CSSProperties;
}

interface Props {
  imageUrl: string;
  backgroundUrl: string;
  imageStyles?: React.CSSProperties;
  imageClassName?: string;
  overlays?: Overlay[];
  onDownload: () => void;
}

const GenericMockup = React.forwardRef<HTMLDivElement, Props>(
  ({ imageUrl, backgroundUrl, imageStyles, imageClassName, overlays, onDownload }, ref) => {
    return (
      <div
        className="position-relative"
        style={{ width: "700px", height: "850px" }}
        ref={ref}
      >
        <img
          src={imageUrl}
          alt="Preview"
          className={`img-fluid rounded my-5 position-absolute ${imageClassName || ""}`}
          style={imageStyles}
        />
        {overlays?.map((overlay, i) => (
          <img
            key={i}
            src={overlay.src}
            className="position-absolute"
            style={overlay.style}
          />
        ))}
        <img src={backgroundUrl} className="w-100" />
        <div className="pt-3">
          <button className="btn btn-primary" onClick={onDownload}>
            הורדת הדמיה
          </button>
        </div>
      </div>
    );
  }
);

export default GenericMockup;
