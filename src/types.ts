export interface Node {
  data: Record<string, any>;
  children: Record<string, { records: Node[] }>;
  ID?: string;
  __tempId?: string;
}