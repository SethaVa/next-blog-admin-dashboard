"use client";

// Libs
import { ColumnDef } from "@tanstack/react-table";

// Components
import { CategoryColumn, columns } from "@/app/categories/components/columns";
import DataListModal from "@/components/modals/data-list-modal";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";

const columnsWithoutActionCell: ColumnDef<CategoryColumn>[] = columns.filter(
  (column) => column.id !== "actions"
);

interface CategoryModalProps {
  isOpen: boolean;
  isLoading: boolean;
  data: CategoryColumn[];
  onClose: () => void;
  setCategories: (value: any) => void;
  selectedCategoryRows: any;
  setSelectedCategoryRows: any;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  isLoading,
  data,
  onClose,
  setCategories,
  selectedCategoryRows,
  setSelectedCategoryRows,
}) => {
  if (!isOpen) return null;

  const setSelectedCategories = () => {
    const selectedIndex = Object.keys(selectedCategoryRows);

    const selectedCategoryId = selectedIndex.map((x) => {
      const selectedData = data[Number(x)];
      return selectedData.id;
    });

    setCategories(selectedCategoryId);
    onClose();
  };

  return (
    <DataListModal
      title="Select Categories"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
    >
      <DataTable
        columns={columnsWithoutActionCell}
        data={data}
        rowSelection={selectedCategoryRows}
        onRowSelectionChange={setSelectedCategoryRows}
      />
      <div className="flex justify-end items-center w-full pt-6 space-x-2">
        <Button disabled={isLoading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={setSelectedCategories}>
          Add Selected Categories
        </Button>
      </div>
    </DataListModal>
  );
};

export default CategoryModal;
