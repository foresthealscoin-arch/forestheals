'use client';

import { Search } from 'lucide-react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBox({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search wellness..."
        className="w-full rounded-full border border-black/10 bg-white py-3 pl-11 pr-5 outline-none focus:border-black"
      />
    </div>
  );
}
