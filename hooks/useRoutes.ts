"use client"

import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { MdOutlineCategory } from "react-icons/md";
import {BsFileEarmarkPost} from "react-icons/bs";
import { RxDashboard } from "react-icons/rx"
import { IoPeopleCircleOutline } from "react-icons/io5"
const useRoutes = () => {
    const params = useParams();  
    const pathname = usePathname();

    const routes = useMemo(() => {
        return [
            {
                label: "Dashboard",
                href: "/",
                icon: RxDashboard,
                active: pathname === "/" 
            },
            {
                label: "Category",
                href: "/categories",
                icon: MdOutlineCategory,
                active: pathname.includes("categories")
            },
            {
                label: "Author",
                href: "/authors",
                icon: IoPeopleCircleOutline,
                active: pathname.includes("authors")
            },
            {
                label: "Post",  
                href: "/posts",
                icon: BsFileEarmarkPost,   
                active: pathname.includes("posts")
            } 
        ]
    }, [pathname]);

    return routes;
}

export default useRoutes;