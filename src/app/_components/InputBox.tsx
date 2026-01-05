"use client";

import { InputHTMLAttributes, useState } from "react";

interface InputBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  onSearch?: (value: string) => void;
}

export default function InputBox({
  className = "",
  onSearch,
  onChange,
  ...props
}: InputBoxProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(e);
    onSearch?.(newValue);
  };

  return (
    <section className="w-full max-w-2xl">
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="search"
          value={value}
          onChange={handleChange}
          placeholder={props.placeholder || "搜索幫助文章..."}
          className="w-full pl-12 pr-4 py-4 bg-white rounded-lg border-none shadow-sm focus:ring-2 text-gray-700 placeholder-gray-500"
          aria-label={props["aria-label"] || "搜索幫助文章"}
          {...props}
        />
      </div>
    </section>
  );
}
