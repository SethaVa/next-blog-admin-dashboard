import React from "react";
import { Skeleton } from "../ui/skeleton";

const HeadingSkeleton = () => {
  return (
    <div className="flex items-start flex-col space-y-2">
      <Skeleton className="w-[300px] h-[30px]"></Skeleton>
      <Skeleton className="w-[100px] h-[20px]"></Skeleton>
    </div>
  );
};

export default HeadingSkeleton;
