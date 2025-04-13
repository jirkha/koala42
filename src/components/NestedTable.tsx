import React from "react";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { Node } from "../data/types";

interface Props {
  relation: string;
  group: { records: Node[] };
  onRemoveNode: (tempId: string) => void;
}

const NestedTable: React.FC<Props> = ({ relation, group, onRemoveNode }) => {
  const childDataKeys =
    group.records.length > 0 && group.records[0].data
      ? Object.keys(group.records[0].data)
      : [];

  return (
    <div className="mb-4">
      {group.records.length > 0 ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead>
            <TableHeader dataKeys={childDataKeys} />
          </thead>
          <tbody>
            {group.records.map((child) => (
              <TableRow
                key={child.__tempId}
                node={child}
                dataKeys={childDataKeys}
                onRemoveNode={onRemoveNode}
                isNested={true}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">
          Žádní potomci pro {relation}.
        </p>
      )}
    </div>
  );
};

export default NestedTable;
