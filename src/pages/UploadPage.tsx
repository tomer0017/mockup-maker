import React, { useRef, useState } from "react";
import ImageUploader from "../components/ImageUploader";
import { toJpeg } from "html-to-image";
import GenericMockup from "../components/common/GenericMockup";

const scenes = [

  {
    id: "scene2",
    background: "/assets/mockups/FM1.png",
    imageStyles: {
      right: "300px",
      top: "30px",
      maxWidth: "243px",
      maxHeight: "280px",
      "--d": "6px",
      "--a": "5deg",
      "--x": "16px",
      "--_l": "6px",
      "--_r": "18px",
    } as React.CSSProperties,
    imageClassName: "painting_on_canvas_r",
  },
  {
    id: "scene3",
    background: "/assets/walls/light_grey.png",
    imageStyles: {
      left: "50%",
      top: "100px",
      maxHeight: "360px",
      transform: "translateX(-50%)",
    } as React.CSSProperties,
    imageClassName: "black-outer-border",
  },
  {
    id: "scene4",
    background: "/assets/walls/dark.png",
    imageStyles: {
      left: "50%",
      top: "100px",
      maxHeight: "360px",
      transform: "translateX(-50%)",
    } as React.CSSProperties,
    imageClassName: "black-outer-border",
  },
  {
    id: "scene5",
    background: "/assets/mockups/FM2.png",
    imageStyles: {
      left: "50%",
      top: "10px",
      maxHeight: "225px",
      transform: "translateX(-50%)",
    } as React.CSSProperties,
    imageClassName: "black-outer-border",
    overlays: [
      {
        src: "/assets/sunlights/L1.png",
        style: {
          width: "460px",
          right: "240px",
          top: "-16px",
          opacity: "0.2",
        },
      },
    ],
  },
  {
    id: "scene6",
    background: "/assets/mockups/FM3.png",
    imageStyles: {
      left: "50%",
      top: "35px",
      maxHeight: "165px",
      transform: "translateX(-50%)",
    } as React.CSSProperties,
    imageClassName: "black-outer-border",
    overlays: [
      {
        src: "/assets/sunlights/L1.png",
        style: {
          width: "500px",
          right: "180px",
          top: "-16px",
          opacity: "0.2",
        },
      },
    ],
  },

];

export default function UploadPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  const handleDownload = async (id: string) => {
    const ref = refs.current[id];
    if (!ref) return;

    try {
      const dataUrl = await toJpeg(ref, { quality: 0.95 });
      const link = document.createElement("a");
      link.download = "mockup.jpg";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating JPEG:", err);
    }
  };

  return (
    <div className="app py-5 rounded">
      <h1 className="text-center m-5" >העלאת ציור ובחירת מסגרת</h1>
      {imageUrl ? (
        <div className="text-center mb-4">
          <div className="pb-5">
            <img
              src={imageUrl}
              alt="Preview"
              className="img-fluid rounded"
              style={
                {
                  maxHeight: "400px",
                  "--d": "0px",
                  "--a": "0deg",
                  "--x": "0px",
                } as React.CSSProperties
              }
            />
            <div className="mt-4">
              <button className="btn btn-danger" onClick={handleRemoveImage}>
                הסר תמונה
              </button>
            </div>
          </div>

          <div className="row">
            {scenes.map((scene) => (
              <div
                key={scene.id}
                className="d-flex justify-content-center col-12 col-xxl-6"
              >
                <GenericMockup
                  ref={(el) => (refs.current[scene.id] = el)}
                  imageUrl={imageUrl}
                  backgroundUrl={scene.background}
                  imageStyles={scene.imageStyles}
                  imageClassName={scene.imageClassName}
                  overlays={scene.overlays}
                  onDownload={() => handleDownload(scene.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ImageUploader onImageSelect={handleImageSelect} />
      )}
    </div>
  );
}
