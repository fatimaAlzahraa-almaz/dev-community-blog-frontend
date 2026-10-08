"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CategoriesParams } from "../type";
import { useCategories } from "@/hooks/useCategories";

const Categories = ({ category, setCategory }: CategoriesParams) => {
  const { data } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const categories = data?.results ?? [];

  const handleCategorySelect = (value?: string) => {
    setCategory(value);
    setIsOpen(false);
  };

  const selectedLabel = category ?? "All tags";

  return (
    <div ref={menuRef} className="w-fit      text-primary     relative z-100">
      <button
        type="button"
        onClick={() => setIsOpen((currentState) => !currentState)}
        className="flex w-full items-center justify-between gap-1 rounded-full border-2 bg-background px-1.5 py-2 sm:px-4 sm:py-3 text-left text-sm font-medium transition-colors hover:bg-accent sm:text-base cursor-pointer  "
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="flex items-center gap-0.5 sm:gap-2 truncate">
          <span className="text-muted-foreground">Showing:</span>
          <span className="truncate text-primary">{selectedLabel}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen ? (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-border bg-background shadow-lg">
          <button
            type="button"
            onClick={() => handleCategorySelect(undefined)}
            className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors hover:bg-accent sm:text-base ${
              category
                ? "text-muted-foreground"
                : "bg-custom font-semibold text-primary"
            }`}
          >
            <span>All tags</span>
            {!category ? <span className="text-chart-4">Selected</span> : null}
          </button>

          {categories.length > 0 ? (
            <div className="max-h-72 overflow-y-auto py-1">
              {categories.map((el) => {
                const isSelected = category === el.title;

                return (
                  <button
                    key={el.id}
                    type="button"
                    onClick={() => handleCategorySelect(el.title)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors hover:bg-accent sm:text-base ${
                      isSelected
                        ? "bg-custom font-semibold text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span className="truncate">#{el.title}</span>
                    {isSelected ? (
                      <span className="text-chart-4">Selected</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="px-4 py-3 text-sm text-muted-foreground">
              No tags available yet.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Categories;
