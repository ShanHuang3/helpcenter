"use client";

import React, { Component } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { FaChartSimple } from "react-icons/fa6";
import { IoMdBook } from "react-icons/io";
import { ReactNode } from "react";

interface MenuItem {
  href: string;
  label: string;
  icon: ReactNode;
}

interface SubMenuItem {
  href: string;
  label: string;
}

interface SidebarMenuState {
  isUserCompanyExpanded: boolean;
  isMonitoringExpanded: boolean;
  isEvaluationExpanded: boolean;
  isCollapsed: boolean;
}

type SidebarMenuProps = Record<string, never>;

class SidebarMenu extends Component<SidebarMenuProps, SidebarMenuState> {
  private readonly menuItems: MenuItem[];
  private readonly subMenuItems: SubMenuItem[];
  private readonly monitoringSubMenuItems: SubMenuItem[];
  private readonly evaluationSubMenuItems: SubMenuItem[];
  private readonly title: string = "Aiia 營運管理";

  constructor(props: SidebarMenuProps) {
    super(props);
    this.state = {
      isUserCompanyExpanded: true,
      isMonitoringExpanded: false,
      isEvaluationExpanded: false,
      isCollapsed: false,
    };

    this.menuItems = [
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
        href: "/monitoring",
        label: "監控",
        icon: <MdOutlineDesktopWindows className="w-5 h-5" />,
      },
      {
        href: "/evaluation",
        label: "評測",
        icon: <FaChartSimple className="w-5 h-5" />,
      },
      {
        href: "/",
        label: "幫助中心",
        icon: <IoMdBook className="w-5 h-5" />,
      },
    ];

    this.subMenuItems = [
      {
        href: "/system-integrators",
        label: "系統整合商管理",
      },
      {
        href: "/groups",
        label: "群組管理",
      },
      {
        href: "/users",
        label: "使用者管理",
      },
    ];

    this.monitoringSubMenuItems = [
      {
        href: "/monitoring/logs",
        label: "日誌監控",
      },
      {
        href: "/monitoring/analytics",
        label: "使用分析",
      },
      {
        href: "/monitoring/device-status",
        label: "裝置狀態",
      },
    ];

    this.evaluationSubMenuItems = [
      {
        href: "/evaluation/datasets",
        label: "資料集",
      },
      {
        href: "/evaluation/history",
        label: "歷史紀錄",
      },
    ];
  }

  private handleToggleUserCompany = (): void => {
    this.setState((prevState) => ({
      isUserCompanyExpanded: !prevState.isUserCompanyExpanded,
    }));
  };

  private handleToggleMonitoring = (): void => {
    this.setState((prevState) => ({
      isMonitoringExpanded: !prevState.isMonitoringExpanded,
    }));
  };

  private handleToggleEvaluation = (): void => {
    this.setState((prevState) => ({
      isEvaluationExpanded: !prevState.isEvaluationExpanded,
    }));
  };

  private handleToggleCollapse = (): void => {
    this.setState((prevState) => ({
      isCollapsed: !prevState.isCollapsed,
      // 收起時也收起子菜單
      isUserCompanyExpanded: prevState.isCollapsed ? true : false,
      isMonitoringExpanded: prevState.isCollapsed ? false : false,
      isEvaluationExpanded: prevState.isCollapsed ? false : false,
    }));
  };

  private renderHeader(): ReactNode {
    const { isCollapsed } = this.state;
    return (
      <header
        className={`flex items-center border-b border-gray-200 pb-2 font-bold ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && <h2 className="text-lg font-bold">{this.title}</h2>}
        <button
          type="button"
          onClick={this.handleToggleCollapse}
          aria-label={isCollapsed ? "展開側邊欄" : "收起側邊欄"}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          {isCollapsed ? (
            <FiChevronRight className="w-5 h-5" />
          ) : (
            <FiChevronLeft className="w-5 h-5" />
          )}
        </button>
      </header>
    );
  }

  private renderMenuItem(item: MenuItem): ReactNode {
    const { isCollapsed } = this.state;
    return (
      <Link
        key={item.href + item.label}
        href={item.href}
        className={`flex items-center ${
          isCollapsed ? "justify-center" : "gap-2"
        } hover:text-blue-600 transition-colors`}
        title={isCollapsed ? item.label : undefined}
      >
        {item.icon}
        {!isCollapsed && <span>{item.label}</span>}
      </Link>
    );
  }

  private renderUserCompanyMenu(): ReactNode {
    const { isUserCompanyExpanded, isCollapsed } = this.state;

    if (isCollapsed) {
      return (
        <button
          type="button"
          className="flex items-center justify-center hover:text-blue-600 transition-colors"
          title="使用者/公司"
        >
          <FiUsers className="w-5 h-5" />
        </button>
      );
    }

    return (
      <div className="flex flex-col">
        <button
          type="button"
          onClick={this.handleToggleUserCompany}
          className="flex items-center gap-2 hover:text-blue-600 transition-colors text-left"
          aria-expanded={isUserCompanyExpanded}
          aria-controls="user-company-submenu"
        >
          <FiUsers className="w-5 h-5" />
          使用者/公司
          {isUserCompanyExpanded ? (
            <FiChevronDown className="w-5 h-5" />
          ) : (
            <FiChevronRight className="w-5 h-5" />
          )}
        </button>
        {isUserCompanyExpanded && (
          <ul
            id="user-company-submenu"
            className="flex flex-col ml-7 mt-2 gap-2"
            role="menu"
          >
            {this.subMenuItems.map((item) => (
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
        )}
      </div>
    );
  }

  private renderMonitoringMenu(): ReactNode {
    const { isMonitoringExpanded, isCollapsed } = this.state;

    if (isCollapsed) {
      return (
        <button
          type="button"
          className="flex items-center justify-center hover:text-blue-600 transition-colors"
          title="監控"
        >
          <MdOutlineDesktopWindows className="w-5 h-5" />
        </button>
      );
    }

    return (
      <div className="flex flex-col">
        <button
          type="button"
          onClick={this.handleToggleMonitoring}
          className="flex items-center gap-2 hover:text-blue-600 transition-colors text-left"
          aria-expanded={isMonitoringExpanded}
          aria-controls="monitoring-submenu"
        >
          <MdOutlineDesktopWindows className="w-5 h-5" />
          監控
          {isMonitoringExpanded ? (
            <FiChevronDown className="w-5 h-5" />
          ) : (
            <FiChevronRight className="w-5 h-5" />
          )}
        </button>
        {isMonitoringExpanded && (
          <ul
            id="monitoring-submenu"
            className="flex flex-col ml-7 mt-2 gap-2"
            role="menu"
          >
            {this.monitoringSubMenuItems.map((item) => (
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
        )}
      </div>
    );
  }

  private renderEvaluationMenu(): ReactNode {
    const { isEvaluationExpanded, isCollapsed } = this.state;

    if (isCollapsed) {
      return (
        <button
          type="button"
          className="flex items-center justify-center hover:text-blue-600 transition-colors"
          title="評測"
        >
          <FaChartSimple className="w-5 h-5" />
        </button>
      );
    }

    return (
      <div className="flex flex-col">
        <button
          type="button"
          onClick={this.handleToggleEvaluation}
          className="flex items-center gap-2 hover:text-blue-600 transition-colors text-left"
          aria-expanded={isEvaluationExpanded}
          aria-controls="evaluation-submenu"
        >
          <FaChartSimple className="w-5 h-5" />
          評測
          {isEvaluationExpanded ? (
            <FiChevronDown className="w-5 h-5" />
          ) : (
            <FiChevronRight className="w-5 h-5" />
          )}
        </button>
        {isEvaluationExpanded && (
          <ul
            id="evaluation-submenu"
            className="flex flex-col ml-7 mt-2 gap-2"
            role="menu"
          >
            {this.evaluationSubMenuItems.map((item) => (
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
        )}
      </div>
    );
  }

  private renderNavigation(): ReactNode {
    const { isCollapsed } = this.state;
    return (
      <nav
        className={`flex flex-col gap-6 mt-4 ${isCollapsed ? "px-0" : "px-4"}`}
        aria-label="主要導航"
      >
        {this.renderMenuItem(this.menuItems[0])}
        {this.renderMenuItem(this.menuItems[1])}
        {this.renderUserCompanyMenu()}
        {this.renderMonitoringMenu()}
        {this.renderEvaluationMenu()}
        {this.renderMenuItem(this.menuItems[4])}
      </nav>
    );
  }

  public render(): ReactNode {
    const { isCollapsed } = this.state;
    return (
      <aside
        className={`${
          isCollapsed ? "w-16 px-2" : "w-64 px-4"
        } bg-white border-r border-gray-200 py-4 flex flex-col gap-2 text-md transition-all duration-300`}
      >
        {this.renderHeader()}
        {this.renderNavigation()}
      </aside>
    );
  }
}

export default SidebarMenu;
