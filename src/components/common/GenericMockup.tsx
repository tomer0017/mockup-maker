import React from "react";

export interface Overlay {
  src: string;
  style?: React.CSSProperties;
}

interface Props {
  imageUrl: string;
  backgroundUrl: string;
  backgroundClassName?: string;
  imageStyles?: React.CSSProperties;
  imageClassName?: string;
  overlays?: Overlay[];
  onDownload: () => void;
}

const GenericMockup = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      imageUrl,
      backgroundUrl,
      imageStyles,
      imageClassName,
      backgroundClassName = "basicMcBgSize",
      overlays,
      onDownload,
    },
    ref
  ) => {
    return (
      <div className="d-flex flex-column align-items-center">
        <div className={`position-relative ${backgroundClassName}`} ref={ref}>
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
        </div>

        <div className="pt-3 pb-5">
          <button className="btn btn-success " onClick={onDownload}>
            הורדת הדמיה
          </button>
        </div>
      </div>
    );
  }
);

export default GenericMockup;
