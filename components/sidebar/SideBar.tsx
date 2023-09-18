"use client";

import useRoutes from "@/hooks/useRoutes";

// Libs
import { ImBlogger2 } from "react-icons/im";

// Components
import SidebarItem from "./SidebarItem";
import { Separator } from "@/components/ui/separator";

const SideBar = () => {
  const routes = useRoutes();

  return (
    <div className="flex flex-col justify-between w-24 lg:w-72 fixed space-y-0 left-0 px-4 overflow-auto z-20 bg-white border-r-[1px] h-screen">
      <nav className="flex flex-col justify-between mt-4">
        <ul role="list" className="flex flex-col items-start space-y-1">
          {/* Logo */}
          <div className="flex items-center mb-3 space-x-2 text-indigo-500 hover:cursor-pointer hover:text-indigo-600 justify-center lg:justify-start w-full">
            <ImBlogger2 className="w-16 h-16" />
            <span className=" font-bold text-2xl hidden lg:block">
              Setha Blog
            </span>
          </div>

          <Separator />

          {routes.map((route) => (
            <SidebarItem
              key={route.href}
              label={route.label}
              href={route.href}
              icon={route.icon}
              active={route.active}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
