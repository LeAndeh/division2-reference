export interface ChangelogEntry {
  date: string;
  patch?: string;
  title: string;
  changes: string[];
}

export interface ChangelogData {
  currentPatch: string;
  lastUpdated: string;
  entries: ChangelogEntry[];
}
