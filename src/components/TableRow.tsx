import React, { useState } from "react";
import { Node } from "../types";
import NestedTable from "./NestedTable";

interface Props {
  node: Node;
  dataKeys: string[];
  onRemoveNode: (tempId: string) => void;
  isNested?: boolean;
}

const TableRow: React.FC<Props> = ({
  node,
  dataKeys,
  onRemoveNode,
  isNested = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <tr
        className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
          isNested ? "text-sm" : ""
        }`}
      >
        <td className="px-4 py-2 w-8">
          {Object.keys(node.children).length > 0 && (
            <button onClick={toggleExpand} className="focus:outline-none">
              {expanded ? (
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              )}
            </button>
          )}
        </td>
        {dataKeys.map((key) => (
          <td
            key={key}
            className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs"
          >
            {node.data[key]}
          </td>
        ))}
        <td className="px-4 py-2 w-24">
          <button
            onClick={() => {
              if (node.__tempId) {
                onRemoveNode(node.__tempId);
              } else {
                console.warn("Pokus o odebrání uzlu bez __tempId:", node);
              }
            }}
            className="font-medium text-red-600 dark:text-red-500 hover:underline focus:outline-none"
          >
            Odebrat
          </button>
        </td>
      </tr>
      {expanded && Object.keys(node.children).length > 0 && (
        <tr>
          <td colSpan={dataKeys.length + 2} className="p-4">
            {Object.entries(node.children).map(([relation, group]) => (
              <NestedTable
                key={relation}
                relation={relation}
                group={group}
                onRemoveNode={onRemoveNode}
              />
            ))}
          </td>
        </tr>
      )}
    </>
  );
};

export default TableRow;
