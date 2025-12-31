"use client";

import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { FiUser } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";

type Role = "Super Admin" | "SI Admin" | "Project Admin" | "User";

const roles: Role[] = ["Super Admin", "SI Admin", "Project Admin", "User"];

export default function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState<Role>("Super Admin");

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="p-3 flex items-center gap-1 text-sm hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
        <FiUser className="w-4 h-4" aria-hidden="true" />
        <span>{selectedRole}</span>
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
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
          <div className="px-4 py-3 bg-gray-50 rounded-t-lg">
            <h3 className="text-sm font-semibold text-gray-900">Switch Role</h3>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="py-1">
            {roles.map((role) => (
              <MenuItem key={role}>
                <button
                  onClick={() => setSelectedRole(role)}
                  className="group flex w-full items-center px-4 py-2 text-sm text-gray-900 transition-colors ui-active:bg-gray-100 ui-not-active:bg-white hover:bg-gray-100"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{role}</span>
                    {selectedRole === role && (
                      <FiCheck className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
