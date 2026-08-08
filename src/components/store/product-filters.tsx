'use client';

type Props = {
  categories: string[];
  selected: string;
  onChange: (value: string) => void;
};

export function ProductFilters({
  categories,
  selected,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange('all')}
        aria-pressed={selected === 'all'}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          selected === 'all'
            ? 'bg-black text-white shadow-sm'
            : 'bg-white text-gray-700 ring-1 ring-black/10 hover:bg-gray-50'
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          aria-pressed={selected === category}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selected === category
              ? 'bg-black text-white shadow-sm'
              : 'bg-white text-gray-700 ring-1 ring-black/10 hover:bg-gray-50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
