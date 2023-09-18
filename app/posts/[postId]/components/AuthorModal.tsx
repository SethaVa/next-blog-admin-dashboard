"use client";
import { useEffect, useState } from "react";

// Libs
import { ColumnDef } from "@tanstack/react-table";
import { isEmpty } from "lodash";

// Components
import { AuthorColumn, columns } from "@/app/authors/components/Columns";
import DataListModal from "@/components/modals/data-list-modal";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";

const columnsWithoutActionCell: ColumnDef<AuthorColumn>[] = columns.filter(
  (column) => column.id !== "actions"
);

interface AuthorModalProps {
  isOpen: boolean;
  isLoading: boolean;
  data: AuthorColumn[];
  selectedAuthorId: any;
  onClose: () => void;
  setSelectedAuthorId: (value: any) => void;
}

const AuthorModal: React.FC<AuthorModalProps> = ({
  isOpen,
  isLoading,
  data,
  selectedAuthorId,
  onClose,
  setSelectedAuthorId,
}) => {
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    if (!isEmpty(rowSelection)) {
      const selectedIndex = Object.keys(rowSelection);

      const selectedAuthorId: any = selectedIndex.map((x) => {
        const selectedData = data[Number(x)];
        return selectedData.id;
      })[0];

      setSelectedAuthorId(selectedAuthorId);
    }
  }, [rowSelection]);

  if (!isOpen) return null;

  return (
    <DataListModal
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      title="Select Author"
    >
      <DataTable
        columns={columnsWithoutActionCell}
        data={data}
        rowSelection={selectedAuthorId}
        onRowSelectionChange={setRowSelection}
      />
      <div className="flex justify-end items-center w-full pt-6 space-x-2">
        <Button disabled={isLoading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </DataListModal>
  );
};

export default AuthorModal;
