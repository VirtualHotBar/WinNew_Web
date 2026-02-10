/"**
 * Format Utilities
 * 格式化工具函数
 */

/**
 * 格式化文件大小
 * @param bytes 文件大小（字节）
 * @returns 格式化后的字符串，如 "4.52 GB"
 */
export function formatFileSize(bytes: number | string): string {
  const size = typeof bytes === 'string' ? Number(bytes) : bytes;

  if (isNaN(size) || size === 0) return 'Unknown';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(size) / Math.log(k));

  return `${parseFloat((size / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
}

/**
 * 格式化日期
 * @param date 日期字符串或 Date 对象
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) return 'Invalid Date';

  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 截断文本
 * @param text 原始文本
 * @param maxLength 最大长度
 * @param suffix 后缀，默认为 "..."
 * @returns 截断后的文本
 */
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}
