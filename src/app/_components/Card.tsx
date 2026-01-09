"use client";
import { ReactNode } from "react";
import Link from "next/link";

export interface CardItem {
  title: string;
  onClick?: () => void;
  itemsIcon?: ReactNode;
  href?: string; // 外部連結（會在新分頁開啟）
  link?: string; // 內部路由（使用 Next.js Link）
}

export interface CardProps {
  categoryTitle: string;
  icon: ReactNode;
  items: CardItem[];
  defaultItemsIcon?: ReactNode;
}

export default function Card({
  categoryTitle,
  icon,
  items,
  defaultItemsIcon,
}: CardProps) {
  return (
    <div className="border border-gray-200 rounded-xl">
      <div className="bg-white shadow-sm p-6 w-[314px] h-[224px] rounded-xl hover:shadow-lg transition-shadow duration-300">
        <h2 className="flex items-center gap-3 mb-4 text-lg font-bold">
          <div className="w-5 h-5 text-[var(--color-background-blue)]">
            {icon}
          </div>
          {categoryTitle}
        </h2>
        {items.map((item, index) => {
          const handleClick = () => {
            if (item.href) {
              window.open(item.href, "_blank", "noopener,noreferrer");
            }
            item.onClick?.();
          };

          const content = (
            <>
              {item.title}
              {item.itemsIcon || defaultItemsIcon}
            </>
          );

          // 如果有內部路由，使用 Link
          if (item.link) {
            return (
              <Link
                key={index}
                href={item.link}
                className="flex items-center justify-between text-gray-600 text-lg px-2 py-4 hover:text-[var(--color-background-blue)] transition-colors duration-300 hover:bg-gray-50 rounded-xl cursor-pointer transform hover:translate-x-0.5"
              >
                {content}
              </Link>
            );
          }

          // 否則使用 div（支援外部連結或 onClick）
          return (
            <div
              key={index}
              onClick={handleClick}
              className="flex items-center justify-between text-gray-600 text-lg px-2 py-4 hover:text-[var(--color-background-blue)] transition-colors duration-300 hover:bg-gray-50 rounded-xl cursor-pointer transform hover:translate-x-0.5"
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
