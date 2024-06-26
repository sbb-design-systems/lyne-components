export interface ScreenshotFiles {
  browserName: string;
  name: string;
  failedFile?: string;
  diffFile?: string;
  baselineFile?: string;
  isNew: boolean;
  viewport: string;
}

export type ScreenshotMap = Record<string, Record<string, Record<string, ScreenshotFiles[]>>>;

export interface Meta {
  gitSha: string;
  commitUrl: string;
  baselineGitSha?: string;
  baselineCommitUrl?: string;
}
