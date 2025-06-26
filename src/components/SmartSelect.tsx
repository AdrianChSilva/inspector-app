import { useEffect, useRef, useState } from "react";
import { useUIStore } from "../stores/uiStore";

interface SmartSelectProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SmartSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}: SmartSelectProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetAutocomplete = useUIStore((state) => state.resetAutocomplete);
  const acknowledgeReset = useUIStore((state) => state.acknowledgeReset);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (resetAutocomplete) {
      setQuery("");
      acknowledgeReset();
    }
  }, [resetAutocomplete, acknowledgeReset]);

  return (
    <div className="relative flex flex-col gap-1" ref={containerRef}>
      {label && (
        <label className="text-base font-medium text-gray-700">{label}</label>
      )}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder || "Escribe para buscar..."}
        className="border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto z-10 shadow-md">
          {filteredOptions.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setQuery("");
                setIsOpen(false);
                inputRef.current?.blur();
              }}
              className="px-4 py-3 text-base hover:bg-blue-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SmartSelect;
