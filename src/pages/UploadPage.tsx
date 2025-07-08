import React, { useEffect, useRef, useState } from "react";
import ImageUploader from "../components/ImageUploader";
import domtoimage from "dom-to-image-more";
import GenericMockup from "../components/common/GenericMockup";

const scenes = [
  {
    id: 1,
    background: "/assets/mockups/FM1.png",
    imageStyles: {
      right: "180px",
      top: "0px",
      maxWidth: "150px",
      maxHeight: "150px",
      "--d": "6px",
      "--a": "5deg",
      "--x": "16px",
      "--_l": "6px",
      "--_r": "18px",
    },
    imageClassName: "painting_on_canvas_r",
  },
  {
    id: 3,
    background: "/assets/walls/light_grey.png",
    imageStyles: {
      left: "50%",
      top: "30px",
      maxHeight: "250px",
      transform: "translateX(-50%)",
    },
    imageClassName: "black-outer-border",
  },
  {
    id: 5,
    background: "/assets/walls/dark.png",
    imageStyles: {
      left: "50%",
      top: "30px",
      maxHeight: "250px",
      transform: "translateX(-50%)",
    },
    imageClassName: "black-outer-border",
  },
  {
    id: 7,
    background: "/assets/mockups/FM2.png",
    imageStyles: {
      left: "50%",
      top: "0px",
      maxHeight: "125px",
      transform: "translateX(-50%)",
    },
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
    id: 9,
    background: "/assets/mockups/FM3.png",
    imageStyles: {
      left: "50%",
      top: "-5px",
      maxHeight: "100px",
      transform: "translateX(-50%)",
    },
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

const scenes_for_download = [
  {
    id: 2,
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
    },
    imageClassName: "painting_on_canvas_r",
  },
  {
    id: 4,
    background: "/assets/walls/light_grey.png",
    imageStyles: {
      left: "50%",
      top: "100px",
      maxHeight: "360px",
      transform: "translateX(-50%)",
    },
    imageClassName: "black-outer-border",
  },
  {
    id: 6,
    background: "/assets/walls/dark.png",
    imageStyles: {
      left: "50%",
      top: "100px",
      maxHeight: "360px",
      transform: "translateX(-50%)",
    },
    imageClassName: "black-outer-border",
  },
  {
    id: 8,
    background: "/assets/mockups/FM2.png",
    imageStyles: {
      left: "50%",
      top: "10px",
      maxHeight: "225px",
      transform: "translateX(-50%)",
    },
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
    id: 10,
    background: "/assets/mockups/FM3.png",
    imageStyles: {
      left: "50%",
      top: "35px",
      maxHeight: "165px",
      transform: "translateX(-50%)",
    },
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
  const [downloadMode, setDownloadMode] = useState(false);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleDownload = async (id: number) => {
    setDownloadMode(true);
    await delay(2000);
    const ref = refs.current[id + 1];
    if (!ref) return;

    try {
      const dataUrl = await domtoimage.toJpeg(ref, {
        quality: 0.95,
        bgcolor: "white",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = "mockup.jpg";
      link.href = dataUrl;
      link.click();
      await delay(2000);
      setDownloadMode(false);
    } catch (err) {
      console.error("Error generating JPEG:", err);
    }
  };

  return (
    <div className="app py-5 rounded">
      <h1 className="text-center m-5">העלאת ציור ובחירת מסגרת</h1>
      {imageUrl ? (
        <div className="text-center mb-4">
          <div className="pb-5">
            <img
              src={imageUrl}
              alt="Preview"
              className="img-fluid rounded"
              style={{
                maxHeight: "400px",
                "--d": "0px",
                "--a": "0deg",
                "--x": "0px",
              } as React.CSSProperties}
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
                className="d-flex justify-content-center col-12 col-xxl-4"
              >
                <GenericMockup
                  ref={(el) => (refs.current[scene.id] = el)}
                  imageUrl={imageUrl}
                  backgroundUrl={scene.background}
                  imageStyles={scene.imageStyles}
                  imageClassName={scene.imageClassName}
                  overlays={scene.overlays}
                  onDownload={() => handleDownload(scene.id)}
                  backgroundClassName="samllMcBgSize"
                />
              </div>
            ))}

            {downloadMode &&
              scenes_for_download.map((scene) => (
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
                    backgroundClassName="fullMcBgSize"
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
