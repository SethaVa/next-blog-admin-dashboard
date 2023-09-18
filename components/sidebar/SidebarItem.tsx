"use client";

import React from "react";

// Libs
import clsx from "clsx";
import Link from "next/link";

interface SidebarItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={href}
      className={clsx(
        `
                    group
                    flex
                    group-x-3
                    rounded-md
                    p-4
                    text-sm
                    leading-6
                    w-full
                    font-semibold
                    text-slate-500
                    hover:bg-indigo-400
                    hover:text-white
                    items-center
                    justify-center
                    lg:justify-start
                `,
        active && `bg-indigo-400 text-white`
      )}
    >
      <Icon className="w-6 h-6 shrink-0" />
      <span className="px-2 hidden lg:block">{label}</span>
    </Link>
  );
};

export default SidebarItem;
