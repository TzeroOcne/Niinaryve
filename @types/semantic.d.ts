export interface SemanticRelease {
  extends?: string[] | string;
  branches?: string[] | string | Record<string,unknown>;
  repositoryUrl?: string;
  tagFormat?: string;
  plugins?: string;
  dryRun?: boolean;
  ci?: boolean;
  debug?: boolean;
}