"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { FaChartSimple } from "react-icons/fa6";
import { IoMdBook } from "react-icons/io";

// 類型定義
interface MenuItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SubMenuItem {
  href: string;
  label: string;
}

interface ExpandableMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems: SubMenuItem[];
  defaultExpanded?: boolean;
}

// 菜單配置（移到組件外部，避免每次渲染都重新創建）
const TITLE = "Aiia 營運管理";

const SIMPLE_MENU_ITEMS: MenuItem[] = [
  {
    href: "/",
    label: "首頁",
    icon: <IoHomeOutline className="w-5 h-5" />,
  },
  {
    href: "/projects",
    label: "專案管理",
    icon: <FaRegFileAlt className="w-5 h-5" />,
  },
  {
    href: "/",
    label: "幫助中心",
    icon: <IoMdBook className="w-5 h-5" />,
  },
];

const EXPANDABLE_MENU_ITEMS: ExpandableMenuItem[] = [
  {
    id: "user-company",
    label: "使用者/公司",
    icon: <FiUsers className="w-5 h-5" />,
    defaultExpanded: true,
    subItems: [
      { href: "/system-integrators", label: "系統整合商管理" },
      { href: "/groups", label: "群組管理" },
      { href: "/users", label: "使用者管理" },
    ],
  },
  {
    id: "monitoring",
    label: "監控",
    icon: <MdOutlineDesktopWindows className="w-5 h-5" />,
    defaultExpanded: false,
    subItems: [
      { href: "/monitoring/logs", label: "日誌監控" },
      { href: "/monitoring/analytics", label: "使用分析" },
      { href: "/monitoring/device-status", label: "裝置狀態" },
    ],
  },
  {
    id: "evaluation",
    label: "評測",
    icon: <FaChartSimple className="w-5 h-5" />,
    defaultExpanded: false,
    subItems: [
      { href: "/evaluation/datasets", label: "資料集" },
      { href: "/evaluation/history", label: "歷史紀錄" },
    ],
  },
];

export default function SidebarMenu() {
  // 初始化展開狀態
  const initialExpandedMenus = useMemo(() => {
    const menus: Record<string, boolean> = {};
    EXPANDABLE_MENU_ITEMS.forEach((item) => {
      menus[item.id] = item.defaultExpanded ?? false;
    });
    return menus;
  }, []);

  // 狀態管理
  const [expandedMenus, setExpandedMenus] =
    useState<Record<string, boolean>>(initialExpandedMenus);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 切換展開菜單
  const handleToggleExpandableMenu = (menuId: string): void => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  // 切換側邊欄收起/展開
  const handleToggleCollapse = (): void => {
    setIsCollapsed((prev) => {
      const willCollapse = !prev;

      // 收起時關閉所有子菜單，展開時恢復默認狀態
      if (willCollapse) {
        // 收起時關閉所有
        const closedMenus: Record<string, boolean> = {};
        EXPANDABLE_MENU_ITEMS.forEach((item) => {
          closedMenus[item.id] = false;
        });
        setExpandedMenus(closedMenus);
      } else {
        // 展開時恢復默認狀態
        setExpandedMenus(initialExpandedMenus);
      }

      return willCollapse;
    });
  };

  // 渲染標題區域
  const renderHeader = () => {
    return (
      <header
        className={`flex items-center border-b border-gray-200 pb-2 font-bold transition-all duration-300 ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && (
          <h2 className="text-lg font-bold transition-all duration-300">
            {TITLE}
          </h2>
        )}
        <button
          type="button"
          onClick={handleToggleCollapse}
          aria-label={isCollapsed ? "展開側邊欄" : "收起側邊欄"}
          className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
        >
          {isCollapsed ? (
            <FiChevronRight className="w-5 h-5" />
          ) : (
            <FiChevronLeft className="w-5 h-5" />
          )}
        </button>
      </header>
    );
  };

  // 渲染簡單菜單項（無子菜單）
  const renderMenuItem = (item: MenuItem) => {
    return (
      <Link
        key={item.href + item.label}
        href={item.href}
        className={`flex items-center transition-all duration-300 ${
          isCollapsed ? "justify-center" : "gap-2"
        } hover:text-blue-600`}
        title={isCollapsed ? item.label : undefined}
      >
        <span className="flex-shrink-0">{item.icon}</span>
        {!isCollapsed && (
          <span className="transition-all duration-300">{item.label}</span>
        )}
      </Link>
    );
  };

  // 渲染子菜單項列表
  const renderSubMenuItems = (
    subItems: SubMenuItem[],
    menuId: string
  ): React.ReactNode => {
    return (
      <ul
        id={`${menuId}-submenu`}
        className="flex flex-col ml-7 mt-2 gap-2"
        role="menu"
      >
        {subItems.map((item) => (
          <li key={item.href} role="menuitem">
            <Link
              href={item.href}
              className="mt-2 hover:bg-gray-100 rounded-md px-2 py-1 hover:text-blue-600 transition-colors block text-left"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  // 渲染展開菜單（統一處理所有可展開的菜單）
  const renderExpandableMenu = (item: ExpandableMenuItem): React.ReactNode => {
    const isExpanded = expandedMenus[item.id] ?? false;

    // 收起狀態：只顯示圖標
    if (isCollapsed) {
      return (
        <button
          key={item.id}
          type="button"
          className="flex items-center justify-center hover:text-blue-600 transition-colors"
          title={item.label}
        >
          {item.icon}
        </button>
      );
    }

    // 展開狀態：顯示完整菜單
    return (
      <div key={item.id} className="flex flex-col">
        <button
          type="button"
          onClick={() => handleToggleExpandableMenu(item.id)}
          className="flex items-center gap-2 hover:text-blue-600 transition-colors text-left"
          aria-expanded={isExpanded}
          aria-controls={`${item.id}-submenu`}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          <span className="flex-1">{item.label}</span>
          <span className="flex-shrink-0">
            {isExpanded ? (
              <FiChevronDown className="w-5 h-5" />
            ) : (
              <FiChevronRight className="w-5 h-5" />
            )}
          </span>
        </button>
        {isExpanded && renderSubMenuItems(item.subItems, item.id)}
      </div>
    );
  };

  // 渲染導航區域
  const renderNavigation = () => {
    return (
      <nav
        className={`flex flex-col gap-6 mt-4 transition-all duration-300 ${
          isCollapsed ? "px-0" : "px-4"
        }`}
        aria-label="主要導航"
      >
        {/* 簡單菜單項 */}
        {SIMPLE_MENU_ITEMS.slice(0, 2).map((item) => renderMenuItem(item))}

        {/* 可展開菜單項 */}
        {EXPANDABLE_MENU_ITEMS.map((item) => renderExpandableMenu(item))}

        {/* 最後一個簡單菜單項（幫助中心） */}
        {renderMenuItem(SIMPLE_MENU_ITEMS[2])}
      </nav>
    );
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-16 px-2" : "w-64 px-4"
      } bg-white border-r border-gray-200 py-4 flex flex-col gap-2 text-md transition-all duration-300 overflow-hidden`}
    >
      {renderHeader()}
      {renderNavigation()}
    </aside>
  );
}
