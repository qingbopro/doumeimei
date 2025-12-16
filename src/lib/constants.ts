export const VIDEO_THEMES = [
  {
    id: "zzxjj",
    name: "小姐姐",
    url: "https://api.yujn.cn/api/zzxjj.php?type=video",
  },
  {
    id: "heisis",
    name: "黑丝",
    url: "http://api.yujn.cn/api/heisis.php?type=video",
  },
  {
    id: "baisis",
    name: "白丝",
    url: "http://api.yujn.cn/api/baisis.php?type=video",
  },
  {
    id: "nvda",
    name: "女大学生",
    url: "https://api.yujn.cn/api/nvda.php?type=video",
  },
  {
    id: "qingchun",
    name: "清纯妹妹",
    url: "http://api.yujn.cn/api/qingchun.php?type=video",
  },
  {
    id: "rewu",
    name: "热舞",
    url: "http://api.yujn.cn/api/rewu.php?type=video",
  },
  {
    id: "yuzu",
    name: "玉足",
    url: "http://api.yujn.cn/api/yuzu.php?type=video",
  },
] as const;

export type ThemeId = (typeof VIDEO_THEMES)[number]["id"];
