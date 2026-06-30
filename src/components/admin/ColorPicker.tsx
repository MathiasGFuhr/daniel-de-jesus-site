"use client";

import { useState } from "react";

export function ColorPicker({
  name,
  label,
  defaultValue = "#000000",
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const valid = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white p-1.5 pr-3">
        <input
          type="color"
          value={valid ? value : "#000000"}
          onChange={(e) => setValue(e.target.value)}
          aria-label={`Cor ${label}`}
          className="h-9 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
        />
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent text-sm text-slate-900 outline-none"
        />
      </div>
    </div>
  );
}
