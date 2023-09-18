"use client";

import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import React from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { HiCheckCircle } from "react-icons/hi";

interface DocumentInfoProps {
  entryId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isPublished?: boolean;
}

const DocumentInfo: React.FC<DocumentInfoProps> = ({
  entryId,
  createdAt,
  updatedAt,
  isPublished,
}) => {
  return (
    <div className="flex flex-col gap-16 h-full bg-slate-50">
      <div className="flex flex-col gap-3">
        <div className="text-sm text-muted-foreground">
          DOCUMENT INFORMATION
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-left">ID</div>
          <div className=" text-right">
            {entryId ? (
              <Badge
                variant="secondary"
                className="text-muted-foreground rounded-sm bg-slate-200"
              >
                {entryId}
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="text-muted-foreground bg-slate-200"
              >
                New
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-left">Created</div>
          <div className=" text-right">
            {createdAt ? (
              <div className="flex items-center text-indigo-600 gap-2 font-bold">
                <div className="text-muted-foreground text-xs">
                  {format(createdAt, "dd MMM yyyy, HH:mm")}
                </div>
                <User className="h-6 w-6 text-indigo-600 bg-slate-100 rounded-full p-1" />
              </div>
            ) : (
              <div className="flex gap-2">
                -{" "}
                <User className="h-6 w-6 bg-slate-100 text-indigo-600 rounded-full p-1" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-left">Last updated</div>
          <div className=" text-right">
            {updatedAt ? (
              <div className="flex items-center text-indigo-600 gap-2 font-bold">
                <div className="text-muted-foreground text-xs">
                  {format(updatedAt, "dd MMM yyyy, HH:mm")}
                </div>
                <User className="h-6 w-6 text-indigo-600 bg-slate-100 rounded-full p-1" />
              </div>
            ) : (
              <div className="flex gap-2">
                -{" "}
                <User className="h-6 w-6 bg-slate-100 text-indigo-600 rounded-full p-1" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm text-muted-foreground">STAGES</div>
        <div className="flex items-start justify-between">
          {isPublished ? (
            <Card className="w-full">
              <CardContent>
                <div className="flex-1 py-4 flex items-center justify-between">
                  <p className="text-sm font-bold">Published</p>
                  <div className="flex items-center justify-center">
                    <HiCheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-sm tracking-wider font-semibold text-slate-600">
                      LATEST
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-6 w-6 text-indigo-600 bg-slate-100 rounded-full p-1" />
                  <div className="text-muted-foreground text-xs">
                    {/* {format(updatedAt, "dd MMM yyyy, HH:mm")} */}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-right italic text-sm px-3">
              Entry is not published
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentInfo;
