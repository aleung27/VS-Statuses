export interface Status {
  timestamp: number;
  language: string | null;
  fileName: string | null;
  workspaceName?: string;
  customStatus?: string;
}