import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { Node } from "../data/types";

interface Props {
  data: Node[];
  onRemoveNode: (tempId: string) => void;
}

const HierarchyTable: React.FC<Props> = ({ data, onRemoveNode }) => {
  const dataKeys =
    data.length > 0 && data[0].data ? Object.keys(data[0].data) : [];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead>
          <TableHeader dataKeys={dataKeys} />
        </thead>
        <tbody>
          {data.map((node) => (
            <TableRow
              key={node.__tempId}
              node={node}
              dataKeys={dataKeys}
              onRemoveNode={onRemoveNode}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HierarchyTable;
