// moyu 原生契约的 OpenChamber 移植：一个形状走两个论坛 + 热榜聚合。
// 对应 antumi-moyu src/community.ts（去 zod，面板/service 共用，保持字段名一致）。
// 热榜（知乎/头条/CSDN/开源中国经 tophub.today，InfoQ 经官网）只有列表：
// 每条=一个 Topic（author 借放热度，channel 放子榜名），正文=原文链接卡。
export type CommunityId = 'linuxdo' | 'v2ex' | 'zhihu' | 'toutiao' | 'csdn' | 'oschina' | 'infoq';
export type Channel = { id: string; name: string };
export type CommunityInfo = { id: CommunityId; name: string; channels: Channel[] };
export type Topic = {
  community: CommunityId; id: string; title: string; author: string;
  avatar: string | null; channel: string | null;
  replies: number | null; time: number | null; url: string;
};
export type Post = {
  id?: string; floor: number; author: string; avatar: string | null;
  html: string; time: number | null; replyTo: number | null;
  likes: number | null; liked?: boolean; byAuthor: boolean;
};
export type Thread = { topic: Topic; opening: Post | null; posts: Post[]; page: number; more: boolean };
export type ForumAccount = { username: string; unreadNotifications?: number; userId?: number };
export type ReplyResult =
  | { state: 'sent'; message: string | null }
  | { state: 'pending'; message: string | null }
  | { state: 'failed'; failure: { kind: 'login' | 'rate-limit' | 'unconfirmed' | 'rejected'; message: string; retryAfter?: number } };
export type LikeResult =
  | { state: 'done'; liked: boolean; likes: number | null }
  | { state: 'failed'; failure: ReplyResult extends never ? never : { kind: 'login' | 'rate-limit' | 'unconfirmed' | 'rejected'; message: string; retryAfter?: number } };
export type ForumNotification = {
  id: string; kind: 'reply' | 'mention' | 'like' | 'quote' | 'message' | 'other';
  actor: string | null; title: string; excerpt: string | null;
  time: number | null; timeLabel: string | null; read: boolean | null;
  url: string; target: { topic: Topic; floor?: number; page?: number; postId?: string } | null;
};

export const COMMUNITIES: CommunityInfo[] = [
  {
    id: 'linuxdo', name: 'linux.do',
    channels: [
      { id: 'latest', name: '最新' }, { id: 'top', name: '热门' },
      { id: 'develop', name: '开发调优' }, { id: 'gossip', name: '搞七捻三' },
      { id: 'resource', name: '资源荟萃' }, { id: 'welfare', name: '福利羊毛' },
      { id: 'news', name: '前沿快讯' },
    ],
  },
  {
    id: 'v2ex', name: 'V2EX',
    channels: [
      { id: 'hot', name: '最热' }, { id: 'latest', name: '最新' },
      { id: 'programmer', name: '程序员' }, { id: 'share', name: '分享发现' },
      { id: 'create', name: '分享创造' }, { id: 'qna', name: '问与答' },
      { id: 'jobs', name: '酷工作' },
    ],
  },
  { id: 'zhihu', name: '知乎', channels: [{ id: 'hot', name: '热榜' }] },
  { id: 'toutiao', name: '今日头条', channels: [{ id: 'hot', name: '热榜' }] },
  { id: 'csdn', name: 'CSDN', channels: [{ id: 'hot', name: '热点' }] },
  { id: 'oschina', name: '开源中国', channels: [{ id: 'hot', name: '资讯' }] },
  { id: 'infoq', name: 'InfoQ', channels: [{ id: 'hot', name: '推荐' }] },
];
