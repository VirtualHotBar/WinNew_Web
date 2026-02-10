/**
 * Version Utilities
 * 版本号比较和排序工具
 */

/**
 * 解析语义化版本号
 * 支持格式：24H2, 23H2, 19045, 10.0.19045
 * 返回用于比较的数值，越大表示版本越新
 */
export function parseVersion(version: string): number {
  // 处理 YYHX 格式 (如 24H2)
  const hMatch = version.match(/^(\d{2})H(\d)$/);
  if (hMatch) {
    const year = parseInt(hMatch[1], 10);
    const half = parseInt(hMatch[2], 10);
    return year * 10 + half;
  }

  // 处理纯数字版本号
  const numMatch = version.match(/^(\d+)$/);
  if (numMatch) {
    return parseInt(numMatch[1], 10);
  }

  // 处理点分版本号 (如 10.0.19045)
  const semverMatch = version.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (semverMatch) {
    const major = parseInt(semverMatch[1], 10);
    const minor = parseInt(semverMatch[2], 10);
    const patch = parseInt(semverMatch[3], 10);
    return major * 1000000 + minor * 1000 + patch;
  }

  return 0;
}

/**
 * 比较两个版本号
 * @returns 正数表示 a > b, 负数表示 a < b, 0 表示相等
 */
export function compareVersions(a: string, b: string): number {
  return parseVersion(a) - parseVersion(b);
}

/**
 * 检查版本 a 是否比版本 b 新
 */
export function isNewerVersion(a: string, b: string): boolean {
  return compareVersions(a, b) > 0;
}

/**
 * 排序版本列表（降序，最新的在前）
 */
export function sortVersionsDesc(
  versions: Array<{ label: string; value: string }>
): Array<{ label: string; value: string }> {
  return [...versions].sort((a, b) => {
    // 从 label 中提取版本号进行比较
    // 格式通常是 "VerCode(BuildVer)"
    const verA = a.label.split('(')[0];
    const verB = b.label.split('(')[0];
    return compareVersions(verB, verA);
  });
}
