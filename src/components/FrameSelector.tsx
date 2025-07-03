import React from "react";
import { Check } from "lucide-react";

interface FrameSelectorProps {
  selectedFrame: string | null;
  onFrameSelect: (frameId: string) => void;
}

const frames = [
  {
    id: "wood",
    name: "מסגרת עץ",
    description: "מסגרת עץ טבעי חמה ואלגנטית",
    color: "bg-warning",
    preview: "🪵"
  },
  {
    id: "black",
    name: "מסגרת שחורה",
    description: "מסגרת שחורה קלאסית ומינימליסטית",
    color: "bg-dark text-white",
    preview: "⬛"
  }
];

export default function FrameSelector({ selectedFrame, onFrameSelect }: FrameSelectorProps) {
  return (
    <div>
      <h3 className="mb-4">בחר סוג מסגרת</h3>
      <div className="row">
        {frames.map((frame) => (
          <div key={frame.id} className="col-md-6 mb-3">
            <div
              className={`p-3 border rounded position-relative cursor-pointer ${
                selectedFrame === frame.id ? "border-primary" : ""
              }`}
              onClick={() => onFrameSelect(frame.id)}
            >
              {selectedFrame === frame.id && (
                <div className="position-absolute top-0 end-0 p-1 bg-warning text-white rounded-circle">
                  <Check size={16} />
                </div>
              )}
              <div
                className={`rounded mb-2 d-flex align-items-center justify-content-center ${frame.color}`}
                style={{ width: "50px", height: "50px" }}
              >
                <span>{frame.preview}</span>
              </div>
              <h5>{frame.name}</h5>
              <p className="text-muted">{frame.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
