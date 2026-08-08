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
        className={`rounded-full px-4 py-2 text-sm ${
          selected === 'all'
            ? 'bg-black text-white'
            : 'bg-gray-100'
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`rounded-full px-4 py-2 text-sm ${
            selected === category
              ? 'bg-black text-white'
              : 'bg-gray-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
