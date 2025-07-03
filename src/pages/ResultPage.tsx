import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MockupScene from "../components/MockupScene";

const scenes = [
  {
    name: "סלון מודרני",
    description: "הדמיה בסלון נקי ועכשווי.",
    url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=2000&q=80",
    isAngled: false
  },
  {
    name: "משרד / גלריה",
    description: "הדמיה בחלל עבודה מינימליסטי.",
    url: "https://images.unsplash.com/photo-1616594039964-ae9197a20c6b?w=2000&q=80",
    isAngled: false
  },
  {
    name: "תצוגה בזווית",
    description: "מבט מהצד המדגיש את עומק התמונה.",
    url: "https://images.unsplash.com/photo-1616594039964-ae9197a20c6b?w=2000&q=80",
    isAngled: true
  }
];

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const image = query.get("image");
  const frame = query.get("frame") as "wood" | "black" | null;

  if (!image || !frame) {
    navigate("/");
    return null;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">🎉 המוקאפים שלך מוכנים</h1>
      <div className="row g-4">
        {scenes.map(scene => (
          <div className="col-md-4" key={scene.name}>
            <MockupScene
              sceneName={scene.name}
              sceneDescription={scene.description}
              backgroundImageUrl={scene.url}
              paintingImageUrl={image}
              frameType={frame}
              isAngled={scene.isAngled}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
