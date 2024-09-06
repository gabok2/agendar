"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { Icons } from "../ui/icons";

interface DropdownProps {
  baseUrl: URLSearchParams;
  itemsPerPage: number;
  PageSize: { value: number; label: string }[];
}

const Dropdown = ({ baseUrl, itemsPerPage, PageSize }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getPageUrl = (pageSize: number) => {
    const newUrl = new URLSearchParams(baseUrl);
    newUrl.set("pageSize", pageSize.toString());
    newUrl.set("page", "1");
    return `home/?${newUrl.toString()}`;
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    if (isOpen && dropdownRef.current && buttonRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;

      // Verifica se há espaço suficiente abaixo do botão
      if (spaceBelow < dropdownRect.height) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className="inline-flex justify-center items-center w-14 rounded-lg shadow-sm px-3 bg-zinc-200 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {itemsPerPage}
          <div className="pl-2">
            <Icons type={isOpen ? "CaretUp" : "CaretDown"} size={16} />
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute z-10 px-4 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
            dropdownPosition === "bottom" ? "mt-2" : "bottom-full mb-2"
          }`}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {PageSize.map((size) => (
              <Link
                key={size.value}
                href={getPageUrl(size.value)}
                className="block py-1 px-2 text-sm text-gray-700"
                onClick={toggleDropdown}
              >
                {size.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
