"use client";

import { Separator } from "@radix-ui/react-separator";
import HeadingSkeleton from "../skeleton/HeadingSkeloton";
import { Skeleton } from "../ui/skeleton";

const TableLoading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white h-screen flex-1 p-8 pt-6 space-y-4">
      {children}
      {/* <Separator /> */}
    </div>
  );
};

export default TableLoading;
