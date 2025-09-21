import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

export default function Rating({ value }) {
  return (
    <div className="flex items-center gap-1">
      <StarIcon className="w-4 h-4 text-yellow-400" />
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
