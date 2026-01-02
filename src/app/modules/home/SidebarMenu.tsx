import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { FaChartSimple } from "react-icons/fa6";
import { IoMdBook } from "react-icons/io";

export default function SidebarMenu() {
  return (
    <aside className="w-62 bg-white border-r border-gray-200 p-4 flex flex-col gap-2 text-md">
      <header className="flex items-center justify-between border-b border-gray-200 pb-2 font-bold">
        <h2 className="text-lg font-bold">Aiia 營運管理</h2>
        <button
          type="button"
          aria-label="收起側邊欄"
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
      </header>
      <nav className="flex flex-col gap-6 p-4" aria-label="主要導航">
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <IoHomeOutline className="w-5 h-5" />
          首頁
        </Link>
        <Link
          href="/projects"
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <FaRegFileAlt className="w-5 h-5" />
          專案管理
        </Link>
        <div className="flex flex-col">
          <button
            type="button"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors text-left"
            aria-expanded="true"
            aria-controls="user-company-submenu"
          >
            <FiUsers className="w-5 h-5" />
            使用者/公司
            <FiChevronDown className="w-5 h-5" />
          </button>
          <ul
            id="user-company-submenu"
            className="flex flex-col ml-7 mt-2 gap-2"
            role="menu"
          >
            <li role="menuitem">
              <Link
                href="/system-integrators"
                className="hover:text-blue-600 transition-colors block"
              >
                系統整合商管理
              </Link>
            </li>
            <li role="menuitem">
              <Link
                href="/groups"
                className="hover:text-blue-600 transition-colors block"
              >
                群組管理
              </Link>
            </li>
            <li role="menuitem">
              <Link
                href="/users"
                className="hover:text-blue-600 transition-colors block"
              >
                使用者管理
              </Link>
            </li>
          </ul>
        </div>
        <Link
          href="/monitoring"
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <MdOutlineDesktopWindows className="w-5 h-5" />
          監控
        </Link>
        <Link
          href="/evaluation"
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <FaChartSimple className="w-5 h-5" />
          評測
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <IoMdBook className="w-5 h-5" />
          幫助中心
        </Link>
      </nav>
    </aside>
  );
}
