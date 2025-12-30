// "use client";

import Link from "next/link";
import Image from "next/image";
import { FaRegBell } from "react-icons/fa";
import { PiLineVerticalThin } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import Button from "../../components/Button";

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
          <button
            className="p-2 hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="語言選擇"
          >
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
          </button>
          <div aria-hidden="true">
            <PiLineVerticalThin className="w-4 h-4" />
          </div>
          <div className="p-3 flex items-center gap-1 text-sm ">
            <FiUser className="w-4 h-4" aria-hidden="true" />
            <span>Account</span>
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
