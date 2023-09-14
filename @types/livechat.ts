export type BadgeType = 'member' | 'moderator' | 'verified';

export interface Param {
  key?: string;
  value?: string;
}

export interface ServiceTrackingParams {
  service?: string;
  params?: Param[];
}

export interface ResponseContext {
  serviceTrackingParams?: ServiceTrackingParams[];
  mainAppWebResponseContext?: {
    datasyncId?: string;
    loggedOut?: boolean;
    trackingParam?: string;
  };
  webResponseContextExtensionData?: {
    hasDecorated?: boolean;
  };
}

export interface Run {
  text?: string;
}

export interface Message {
  runs?: Run[];
}

export interface Thumbnail {
  url?: string;
  width?: number;
  height?: number;
}

export interface AuthorPhoto {
  thumbnails?: Thumbnail[];
}

export interface ContextMenuEndpoint {
  commandMetadata?: {
    webCommandMetadata?: {
      ignoreNavigation?: boolean;
    };
  };
  liveChatItemContextMenuEndpoint?: {
    params?: string;
  };
}

export interface ContextMenuAccessibility {
  accessibilityData?: {
    label?: string;
  };
}

export interface Thumbnail {
  url?: string;
  width?: number;
  height?: number;
}

export interface AccessibilityData {
  label?: string;
}

export interface Accessibility {
  accessibilityData?: AccessibilityData;
}

export interface CustomThumbnail {
  thumbnails?: Thumbnail[];
}

export interface LiveChatAuthorBadgeRenderer {
  customThumbnail?: CustomThumbnail;
  tooltip?: string;
  accessibility?: Accessibility;
}

export interface AuthorBadge {
  liveChatAuthorBadgeRenderer?: LiveChatAuthorBadgeRenderer;
}

export interface AuthorBadgeObject {
  liveChatAuthorBadgeRenderer?: LiveChatAuthorBadgeRenderer;
}

export interface LiveChatMessageRenderer {
  message?: Message;
  authorName?: {
    simpleText?: string;
  };
  authorPhoto?: AuthorPhoto | AuthorPhoto[];
  sponsorPhoto?: AuthorPhoto | AuthorPhoto[];
  contextMenuEndpoint?: ContextMenuEndpoint;
  id?: string;
  timestampUsec?: string;
  authorExternalChannelId?: string;
  contextMenuAccessibility?: ContextMenuAccessibility;
  authorBadges?: AuthorBadgeObject[];
  durationSec?: number;
  fullDurationSec?: number;
}

export interface Item {
  liveChatTextMessageRenderer?: LiveChatMessageRenderer;
  liveChatPaidMessageRenderer?: LiveChatMessageRenderer;
  liveChatTickerSponsorItemRenderer?: LiveChatMessageRenderer;
}

export interface InvalidationId {
  objectSource?: number;
  objectId?: string;
  topic?: string;
  subscribeToGcmTopics?: boolean;
  protoCreationTimestampMs?: string;
}

export interface InvalidationContinuationData {
  invalidationId?: InvalidationId;
  timeoutMs?: number;
  continuation?: string;
}

export interface Continuation {
  invalidationContinuationData?: InvalidationContinuationData;
}

export interface Actions {
  addChatItemAction?: ActionItem;
  addLiveChatTickerItemAction?: ActionItem;
  replayChatItemAction?: ReplayChatItemAction;
}

export interface LiveChatContinuation {
  continuations?: Continuation[];
  actions?: Actions[];
}

export interface ActionItem {
  item?: Item;
}

export interface ReplayChatItemAction {
  actions?: Actions[];
  videoOffsetTimeMsec: unknown;
}

export interface ContinuationContents {
  liveChatContinuation?: LiveChatContinuation;
}

export interface Contents {
  liveChatRenderer?: LiveChatContinuation;
}

export interface Reactions {
  key?: string;
  value?: number;
}

export interface Duration {
  seconds?: string;
}

export interface ReactionBucket {
  reactions?: Reactions[];
  totalReactions?: number;
  duration?: Duration;
  intensityScore?: number;
}

export interface EmojiFountainDataEntity {
  key?: string;
  reactionBuckets?: ReactionBucket[];
}

export interface MutationPayload {
  emojiFountainDataEntity?: EmojiFountainDataEntity;
}

export interface Mutation {
  entityKey?: string;
  type?: string;
  payload?: MutationPayload;
}

export interface EntityBatchUpdate {
  mutations?: Mutation[];
}

export interface FrameworkUpdates {
  entityBatchUpdate?: EntityBatchUpdate;
}

export interface AuthorSummary {
  authorName?: {
      simpleText?: string;
  };
  authorExternalChannelId?: string;
  id?: string;
  authorBadges?: AuthorBadgeObject[];
  paid: boolean;
  photo?: string;
  badgeList?: BadgeType[];
  badgeImg?: string;
  timestamp?: number;
}

export interface LiveChatData {
  responseContext?: ResponseContext;
  continuationContents?: ContinuationContents;
  contents?: Contents;
  frameworkUpdates?: FrameworkUpdates;
}
