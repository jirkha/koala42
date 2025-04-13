import React from "react";

interface Props {
  dataKeys: string[];
}

const TableHeader: React.FC<Props> = ({ dataKeys }) => (
  <tr className="text-xs text-gray-900 uppercase bg-[#00E2AC] dark:bg-gray-700 dark:text-gray-400">
    <th className="px-4 py-2"></th>
    {dataKeys.map((key) => (
      <th key={key} className="px-4 py-2">
        {key}
      </th>
    ))}
    <th className="px-4 py-2">Odebrat</th>
  </tr>
);

export default TableHeader;
