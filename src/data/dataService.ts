import { Node } from "../types";

export const fetchData = async (): Promise<Node[]> => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/example-data.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData: Node[] = await response.json();
    return addUniqueTempIds(jsonData);
  } catch (error: any) {
    console.error("Chyba při načítání dat:", error);
    throw error;
  }
};

export const addUniqueTempIds = (nodes: Node[]): Node[] => {
  const processNode = (node: Node): Node => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    const uniqueId = `${timestamp}-${random}`;

    const updatedChildren: Record<string, { records: Node[] }> = {};
    for (const relation in node.children) {
      if (
        node.children.hasOwnProperty(relation) &&
        node.children[relation].records
      ) {
        updatedChildren[relation] = {
          records: node.children[relation].records.map((child) =>
            processNode(child)
          ),
        };
      } else {
        updatedChildren[relation] = node.children[relation];
      }
    }
    return { ...node, __tempId: uniqueId, children: updatedChildren };
  };

  return nodes.map((node) => processNode(node));
};

export const removeNodeFromData = (
  data: Node[],
  tempIdToRemove: string
): Node[] => {
  const removeNodeRecursive = (nodes: Node[]): Node[] => {
    return nodes
      .filter((node) => node.__tempId !== tempIdToRemove)
      .map((node) => {
        return {
          ...node,
          children: Object.keys(node.children).reduce((acc, key) => {
            acc[key] = {
              records: removeNodeRecursive(node.children[key].records),
            };
            return acc;
          }, {} as Record<string, { records: Node[] }>),
        };
      });
  };

  return removeNodeRecursive(data);
};
