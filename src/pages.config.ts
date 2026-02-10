// 页面配置 - 定义每个页面的元数据

export interface PageConfig {
  name: string;
  title: string;
  description: string;
  url: string;
}

export const pages: PageConfig[] = [
  {
    name: 'index',
    title: 'WinNew - 从微软服务器获取最新的原版Windows镜像',
    description: '获取最新的原版Windows镜像，从微软官方服务器下载，原汁原味无修改。',
    url: 'https://winnew.cn/',
  },
  {
    name: 'donation',
    title: 'WinNew - 捐赠',
    description: 'WinNew为非盈利项目。如果你觉得项目不错请考虑捐赠，以维持项目的持续维护。',
    url: 'https://winnew.cn/donation',
  },
  {
    name: 'about',
    title: 'WinNew - 关于',
    description: 'WinNew是一个获取原版Windows镜像的网站，镜像来自于Windows更新服务器，提供直链下载。原汁原味，纯净无修改！',
    url: 'https://winnew.cn/about',
  },
];
