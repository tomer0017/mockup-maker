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
      <>
        <div
          className="position-relative"
          ref={ref}
          style={{
            width: "700px",
            height: "850px",
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          <img
            src={imageUrl}
            crossOrigin="anonymous"
            alt="Artwork"
            className={`img-fluid rounded position-absolute ${imageClassName || ""}`}
            style={imageStyles}
          />

          {overlays?.map((overlay, i) => (
            <img
              key={i}
              src={overlay.src}
              crossOrigin="anonymous"
              className="position-absolute"
              style={overlay.style}
            />
          ))}

          <img
            src={backgroundUrl}
            crossOrigin="anonymous"
            alt="Scene"
            className="w-100"
            style={{ width: "100%" }}
          />
        </div>

        <div className="pt-3 text-center">
          <button className="btn btn-primary" onClick={onDownload}>
            הורדת הדמיה
          </button>
        </div>
      </>
    );
  }
);

export default GenericMockup;
