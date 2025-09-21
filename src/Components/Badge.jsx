import React from "react";

export default function Badge({ text }) {
  return (
    <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
      {text}
    </span>
  );
}
