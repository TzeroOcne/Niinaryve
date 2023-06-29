export interface ManifestV3 {
  // Required
  manifest_version?: 3;
  name?: string;
  version?: string;

  // Recommended
  action?: ActionObject;
  default_locale?: string;
  description?: string;
  icons?: IconsObject;

  // Optional
  author?: string;
  automation?: AutomationObject;
  background?: BackgroundObject;
  chrome_settings_overrides?: ChromeSettingsOverridesObject;
  chrome_url_overrides?: ChromeURLOverridesObject;
  commands?: CommandsObject;
  content_scripts?: ContentScriptObject[];
  content_security_policy?: ContentSecurityPolicyObject;
  cross_origin_embedder_policy?: CrossOriginEmbedderPolicyObject;
  cross_origin_opener_policy?: CrossOriginOpenerPolicyObject;
  declarative_net_request?: DeclarativeNetRequestObject;
  devtools_page?: string;
  export?: ExportObject;
  externally_connectable?: ExternallyConnectableObject;
  file_browser_handlers?: FileBrowserHandlerObject[];
  file_system_provider_capabilities?: FileSystemProviderCapabilitiesObject;
  homepage_url?: string;
  host_permissions?: string[];
  import?: ImportObject[];
  incognito?: IncognitoType;
  input_components?: InputComponentObject[];
  key?: string;
  minimum_chrome_version?: string;
  oauth2?: OAuth2Object;
  omnibox?: OmniboxObject;
  optional_host_permissions?: OptionalPermission[];
  optional_permissions?: string[];
  options_page?: string;
  options_ui?: OptionsUIObject;
  permissions?: Permission[];
  requirements?: RequirementsObject;
  sandbox?: SandboxObject;
  short_name?: string;
  side_panel?: SidePanelObject;
  storage?: StorageObject;
  tts_engine?: TTSEngineObject;
  update_url?: string;
  version_name?: string;
  web_accessible_resources?: WebAccessibleResouceObject[];
}

export interface ActionObject {
  // Action properties
  default_icon?: DefaultIconObject;
  default_title?: string;
  default_popup?: string;
}

export interface DefaultIconObject {
  '16'?: string;
  '24'?: string;
  '32'?: string;
}

export interface IconsObject {
  // Icons properties
  '16'?: string;
  '32'?: string;
  '48'?: string;
  '128'?: string;
}

export interface AutomationObject {
  // Automation properties
  desktop?: boolean;
  interact?: boolean;
  matches?: string[];
}

export interface BackgroundObject {
  // Background properties
  service_worker: string;
  type?: 'module' | 'classic';
}

export interface ChromeSettingsOverridesObject {
  // Chrome settings overrides properties
  homepage?: string;
  search_provider?: SearchProviderObject;
  startup_pages?: string[];
}

export interface SearchProviderObject {
  name?: string;
  keyword?: string;
  favicon_url?: string;
  search_url: string;
  encoding?: string;
  suggest_url?: string;
  image_url?: string;
  search_url_post_params?: string;
  suggest_url_post_params?: string;
  image_url_post_params?: string;
  alternate_urls?: string[];
  prepopulated_id?: number;
  is_default?: boolean;
}

export interface ChromeURLOverridesObject {
  // Chrome URL overrides properties
  bookmarks?: string;
  history?: string;
  newtab?: string;
}

export interface CommandsObject {
  // Commands properties
  [commandName: string]: {
    suggested_key?: string | {
      default?: string;
      chromeos?: string;
      linux?: string;
      mac?: string;
      windows?: string;
    };
    description?: string;
    global?: boolean;
  };
}

export interface ContentScriptObject {
  // Content script properties
  matches: string[];
  css?: string[];
  js?: string[];
  run_at?: RunAt;
  match_about_blank?: boolean;
  match_origin_as_fallback?: boolean;
  world?: ExecutionWorld;
  exclude_matches?: string[];
  include_globs?: string[];
  exclude_globs?: string[];
  all_frames?: boolean;
}

export type RunAt = 'document_idle' | 'document_start' | 'document_end';

export type ExecutionWorld = 'ISOLATED' | 'SHARED';

export interface ContentSecurityPolicyObject {
  // Content security policy properties
  extension_pages: string;
  sandbox?: string;
}

export interface CrossOriginEmbedderPolicyObject {
  // Cross-origin embedder policy properties
  value: string;
}

export interface CrossOriginOpenerPolicyObject {
  // Cross-origin opener policy properties
  value: string;
}

export interface RuleResource {
  id: string;
  enabled: boolean;
  path: string;
}

export interface DeclarativeNetRequestObject {
  // Declarative net request properties
  rule_resources: RuleResource[];
}

export interface ExportObject {
  // Export properties
  allowlist?: string[];
}

export interface ExternallyConnectableObject {
  // Externally connectable properties
  ids?: string[];
  matches?: string[];
  accepts_tls_channel_id?: boolean;
}

export interface FileBrowserHandlerObject {
  // File browser handler properties
  id: string;
  default_title: string;
  file_filters: string[];
}

export interface FileSystemProviderCapabilitiesObject {
  // File system provider capabilities properties
  configurable: boolean;
  watchable: boolean;
  multiple_mounts: boolean;
  source: string;
}

export type OptionalPermission =
  | 'debugger'
  | 'declarativeNetRequest'
  | 'devtools'
  | 'experimental'
  | 'geolocation'
  | 'mdns'
  | 'proxy'
  | 'tts'
  | 'ttsEngine'
  | 'wallpaper';

export type Permission =
  | OptionalPermission
  | 'activeTab'
  | 'alarms'
  | 'background'
  | 'bookmarks'
  | 'browsingData'
  | 'certificateProvider'
  | 'clipboardRead'
  | 'clipboardWrite'
  | 'contentSettings'
  | 'contextMenus'
  | 'cookies'
  | 'declarativeContent'
  | 'declarativeNetRequestWithHostAccess'
  | 'declarativeNetRequestFeedback'
  | 'declarativeWebRequest'
  | 'desktopCapture'
  | 'documentScan'
  | 'downloads'
  | 'enterprise.deviceAttributes'
  | 'enterprise.hardwarePlatform'
  | 'enterprise.networkingAttributes'
  | 'enterprise.platformKeys'
  | 'fileBrowserHandler'
  | 'fileSystemProvider'
  | 'fontSettings'
  | 'gcm'
  | 'history'
  | 'identity'
  | 'idle'
  | 'loginState'
  | 'management'
  | 'nativeMessaging'
  | 'notifications'
  | 'offscreen'
  | 'pageCapture'
  | 'platformKeys'
  | 'power'
  | 'printerProvider'
  | 'printing'
  | 'printingMetrics'
  | 'privacy'
  | 'processes'
  | 'scripting'
  | 'search'
  | 'sessions'
  | 'sidePanel'
  | 'storage'
  | 'system.cpu'
  | 'system.display'
  | 'system.memory'
  | 'system.storage'
  | 'tabCapture'
  | 'tabGroups'
  | 'tabs'
  | 'topSites'
  | 'unlimitedStorage'
  | 'vpnProvider'
  | 'webAuthenticationProxy'
  | 'webNavigation'
  | 'webRequest'
  | 'webRequestBlocking';

export interface ImportObject {
  // Import properties
  id: string;
  minimum_version?: string;
}

export type IncognitoType = 'spanning' | 'split' | 'not_allowed';

export interface InputComponentObject {
  // Input component properties
  name: string;
  id?: string;
  language?: string | string[];
  layouts?: string | string[];
  input_view?: string;
  options_page?: string;
}

export interface OAuth2Object {
  // OAuth2 properties
  client_id: string;
  scopes: string[];
}

export interface OmniboxObject {
  // Omnibox properties
  keyword: string;
}

export interface OptionsUIObject {
  // Options UI properties
  page: string;
  open_in_tab: boolean;
}

export type RequirementsObject = Record<string, unknown>;

export type SandboxObject = Record<string, string[]>;

export interface SidePanelObject {
  // Side panel properties
  default_path: string;
}

export interface StorageObject {
  // Storage properties
  managed_schema: string;
}

export type VoiceEventType =
  | 'start'
  | 'word'
  | 'sentence'
  | 'marker'
  | 'end'
  | 'error';

export interface VoiceObject {
  // Voice properties
  voice_name: string;
  lang: string;
  event_types: VoiceEventType[];
}

export interface TTSEngineObject {
  // TTS engine properties
  voices: VoiceObject[];
}

export interface WebAccessibleResouceObject {
  resources: string[];
  matches: string[];
  extension_ids?: string[];
  use_dynamic_url?: boolean;
}
