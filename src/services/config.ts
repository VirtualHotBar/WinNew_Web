/**
 * API 配置
 * 根据环境自动切换 API 地址
 */
const config = {
  apiHost: import.meta.env.DEV 
    ? "http://localhost:3333"   // 开发环境
    : "https://api.hotpe.top",  // 生产环境
};

export { config };