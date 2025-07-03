import React from "react";

interface MockupSceneProps {
  sceneName: string;
  sceneDescription: string;
  backgroundImageUrl: string;
  paintingImageUrl: string;
  frameType: "wood" | "black";
  isAngled?: boolean;
}

export default function MockupScene({
  sceneName,
  sceneDescription,
  backgroundImageUrl,
  paintingImageUrl,
  frameType,
  isAngled = false
}: MockupSceneProps) {
  return (
    <div className="border rounded shadow-sm p-3 bg-white text-center">
      <div
        className="position-relative mb-3"
        style={{
          width: "100%",
          paddingTop: "100%", // 1:1 aspect ratio
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px"
        }}
      >
        <img
          src={paintingImageUrl}
          alt="Painting mockup"
          className="position-absolute"
          style={{
            top: "20%",
            left: "20%",
            width: "60%",
            height: "60%",
            objectFit: "contain",
            border: frameType === "wood" ? "20px solid #a0522d" : "20px solid #000",
            borderRadius: "4px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            transform: isAngled ? "rotate(-10deg)" : "none",
            transformOrigin: "center center"
          }}
        />
      </div>
      <h5 className="mt-2 fw-bold">{sceneName}</h5>
      <p className="text-muted mb-0">{sceneDescription}</p>
    </div>
  );
}
