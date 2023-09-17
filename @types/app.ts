export interface AppConfig {
  [key:string]: unknown;
  baseColor: string;
  memberColor: string;
  adminColor: string;
  online: boolean;
}

export interface TimeModeEvent {
  showOriginal?: boolean;
}