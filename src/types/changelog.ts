export interface ChangelogEntry {
  date: string;
  patch?: string;
  title: string;
  changes: string[];
}

export interface ChangelogData {
  currentPatch: string;
  lastUpdated: string;
  notice?: string | null;
  entries: ChangelogEntry[];
}
