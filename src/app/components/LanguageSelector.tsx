"use client";

import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";

type Language = "中文" | "English" | "日本語";

const languages: Language[] = ["中文", "English", "日本語"];

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("English");

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex items-center gap-2 p-2 hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          className="w-4 h-4 text-white"
          aria-hidden="true"
        >
          <path
            d="M10.4033 20C15.7214 20 20.0322 15.6891 20.0322 10.3711C20.0322 5.05305 15.7214 0.742188 10.4033 0.742188C5.08528 0.742188 0.774414 5.05305 0.774414 10.3711C0.774414 15.6891 5.08528 20 10.4033 20Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0.774414 10.3672H20.0322"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.4033 20C12.5303 20 14.2549 15.6891 14.2549 10.3711C14.2549 5.05305 12.5303 0.742188 10.4033 0.742188C8.27629 0.742188 6.55176 5.05305 6.55176 10.3711C6.55176 15.6891 8.27629 20 10.4033 20Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.59473 3.69531C4.48789 4.59072 5.54918 5.30083 6.71762 5.78483C7.88605 6.26882 9.13861 6.51718 10.4033 6.51562C11.668 6.51718 12.9206 6.26882 14.089 5.78483C15.2575 5.30083 16.3188 4.59072 17.2119 3.69531M17.2119 17.0391C16.3188 16.1436 15.2575 15.4335 14.089 14.9495C12.9206 14.4655 11.668 14.2172 10.4033 14.2187C9.13861 14.2172 7.88605 14.4655 6.71762 14.9495C5.54918 15.4335 4.48789 16.1436 3.59473 17.0391"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{selectedLanguage}</span>
        <FiChevronDown className="w-4 h-4" aria-hidden="true" />
      </MenuButton>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="absolute right-0 mt-2 w-36 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
          <div className="px-4 py-3 bg-gray-50 rounded-t-lg">
            <h3 className="text-sm font-semibold text-gray-900">Language</h3>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="py-1">
            {languages.map((language) => (
              <MenuItem key={language}>
                <button
                  onClick={() => setSelectedLanguage(language)}
                  className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-900 transition-colors ui-active:bg-gray-100 ui-not-active:bg-white hover:bg-gray-100"
                >
                  <span>{language}</span>

                  {selectedLanguage === language && (
                    <FiCheck className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
