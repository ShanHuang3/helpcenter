// "use client";

import Link from "next/link";
import Image from "next/image";
import { FaRegBell } from "react-icons/fa";
import { PiLineVerticalThin } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import Button from "../../components/Button";
import RoleSelector from "../../components/RoleSelector";
import LanguageSelector from "../../components/LanguageSelector";

export default function Navigation() {
  return (
    <header className="bg-[var(--color-primary)] dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
      <div className="flex justify-between items-center">
        <h1 className="flex items-center gap-3">
          <Image
            src="/Logo_Aiia.png"
            alt="Aiia Logo"
            width={47}
            height={47}
            className="object-contain"
            priority
          />
          <Link
            href="/"
            className="font-medium text-2xl text-[var(--color-primary-accent)] dark:text-white hover:opacity-80 transition-opacity rounded"
          >
            Aiia Operation Management
          </Link>
        </h1>
        <nav
          className="flex items-center text-white gap-1"
          aria-label="主要導航"
        >
          <button
            className="p-2 hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="通知"
          >
            <FaRegBell className="w-4 h-4" />
          </button>

          <div aria-hidden="true">
            <PiLineVerticalThin className="w-4 h-4" />
          </div>
          <RoleSelector />
          <div aria-hidden="true">
            <PiLineVerticalThin className="w-4 h-4" />
          </div>
          <LanguageSelector />
          <div aria-hidden="true">
            <PiLineVerticalThin className="w-4 h-4" />
          </div>
          <Button
            icon={<LuLogOut className="w-4 h-4" />}
            text="Log Out"
            aria-label="登出"
          />
        </nav>
      </div>
    </header>
  );
}
