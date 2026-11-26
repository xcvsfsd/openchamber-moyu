// moyu 原生契约的 OpenChamber 移植：一个形状走论坛 + 热榜聚合。
// 热榜只有列表：Topic.author 借放热度文案，channel 放子榜名，excerpt 放摘要；
// 有正文的源（InfoQ/IT之家/掘金全文，oschina/Solidot 摘要）正文=原文内容卡。
export type CommunityId = 'linuxdo' | 'v2ex' | 'toutiao' | 'juejin' | 'ithome' | 'oschina' | 'solidot' | 'infoq'
  | 'news' | 'tech' | 'fin' | 'ent' | 'community' | 'dev' | 'shopping' | 'weibo' | 'douyin';
export type Channel = { id: string; name: string };
export type CommunityInfo = { id: CommunityId; name: string; channels: Channel[] };
export type Topic = {
  community: CommunityId; id: string; title: string; author: string;
  avatar: string | null; channel: string | null;
  replies: number | null; time: number | null; url: string;
  excerpt?: string | null;
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
    // 融合流只拉 latest（已跨版块，覆盖 develop/gossip 等）；多频道会触发 429
    channels: [{ id: 'latest', name: '最新' }],
  },
  {
    id: 'v2ex', name: 'V2EX',
    channels: [
      { id: 'hot', name: '最热' }, { id: 'latest', name: '最新' },
      { id: 'programmer', name: '程序员' }, { id: 'share', name: '分享发现' },
      { id: 'qna', name: '问与答' },
    ],
  },
  { id: 'toutiao', name: '今日头条', channels: [{ id: 'hot', name: '热榜' }] },
  { id: 'juejin', name: '掘金', channels: [{ id: 'hot', name: '热门' }] },
  { id: 'ithome', name: 'IT之家', channels: [{ id: 'hot', name: '资讯' }] },
  { id: 'oschina', name: '开源中国', channels: [{ id: 'hot', name: '资讯' }] },
  { id: 'solidot', name: 'Solidot', channels: [{ id: 'hot', name: '资讯' }] },
  { id: 'infoq', name: 'InfoQ', channels: [{ id: 'hot', name: '推荐' }] },
  { id: 'news', name: '国内新闻', channels: [{ id: 'hot', name: '要闻' }] },
  { id: 'tech', name: '科技', channels: [{ id: 'hot', name: '热榜' }] },
  { id: 'fin', name: '财经', channels: [{ id: 'hot', name: '热榜' }] },
  { id: 'ent', name: '娱乐', channels: [{ id: 'hot', name: '热榜' }] },
  { id: 'community', name: '社区', channels: [{ id: 'hot', name: '热帖' }] },
  { id: 'dev', name: '开发', channels: [{ id: 'hot', name: '热榜' }] },
  { id: 'shopping', name: '购物', channels: [{ id: 'hot', name: '热榜' }] },
  { id: 'weibo', name: '微博', channels: [{ id: 'hot', name: '热搜' }] },
  { id: 'douyin', name: '抖音', channels: [{ id: 'hot', name: '热点' }] },
];
