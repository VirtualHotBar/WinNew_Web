/**
 * WinNew API Service
 * 集中管理所有 API 调用，统一错误处理
 */

import { config } from './config';
import type {
  WinFileInfo,
  VersionsOption,
  EditionAndLanguage,
} from '../types/api';

// API 基础 URL
const API_BASE = config.apiHost;

// API 端点配置 - 使用新版 Bun API
const ENDPOINTS = {
  GET_FILE_LIST: '/winnew/file-list',
  GET_VERSION_OPTIONS: '/winnew/options/version',
  GET_EDITION_OPTIONS: '/winnew/options/edition',
  GET_LANGUAGE_OPTIONS: '/winnew/options/language',
} as const;

// 请求超时时间 (毫秒)
const REQUEST_TIMEOUT = 30000; // 30秒

// 默认查询参数
const DEFAULT_PARAMS = {
  SYSTEM_CODE: '11',
  VERSION: 'latest',
  LANGUAGE_CODE: 'zh-cn',
  ARCHITECTURE: 'x64',
  EDITION: 'consumer',
} as const;

function normalizeWinFileInfo(file: WinFileInfo): WinFileInfo {
  return {
    ...file,
    Sha1: file.Sha1 || '',
    Sha256: file.Sha256 || '',
  };
}

/**
 * API 错误类
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * 构建查询字符串
 */
function buildQueryString(params: Record<string, string | undefined>): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      searchParams.append(key, value);
    }
  }
  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

/**
 * 处理 API 响应
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status
    );
  }

  const data = await response.json();

  // 处理统一响应格式
  if (data && typeof data === 'object') {
    if (data.state === 'error') {
      throw new ApiError(
        data.message || 'Unknown error',
        response.status,
        data.code
      );
    }
    // 如果有 data 字段，返回 data，否则返回整个对象
    if ('data' in data) {
      return data.data as T;
    }
  }

  return data as T;
}

/**
 * 获取文件列表
 */
export async function fetchWinInfos(
  systemCode: string = DEFAULT_PARAMS.SYSTEM_CODE,
  version: string = '',
  languageCode: string = '',
  architecture: string = '',
  edition: string = '',
  signal?: AbortSignal
): Promise<WinFileInfo[]> {
  const queryString = buildQueryString({
    SystemCode: systemCode,
    Version: version,
    LanguageCode: languageCode,
    Architecture: architecture,
    Edition: edition,
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  // 如果传入的 signal 被取消，同时取消 timeout
  if (signal) {
    signal.addEventListener('abort', () => clearTimeout(timeoutId));
  }

  try {
    const response = await fetch(`${API_BASE}${ENDPOINTS.GET_FILE_LIST}${queryString}`, {
      signal: signal || controller.signal,
    });
    clearTimeout(timeoutId);
    const files = await handleResponse<WinFileInfo[]>(response);
    return files.map(normalizeWinFileInfo);
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * 获取版本选项
 */
export async function fetchVersionOptions(signal?: AbortSignal): Promise<VersionsOption> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  if (signal) {
    signal.addEventListener('abort', () => clearTimeout(timeoutId));
  }

  try {
    const response = await fetch(`${API_BASE}${ENDPOINTS.GET_VERSION_OPTIONS}`, {
      signal: signal || controller.signal,
    });
    clearTimeout(timeoutId);
    return handleResponse<VersionsOption>(response);
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * 获取版本和语言选项
 */
export async function fetchEditionAndLanguageOptions(
  systemCode: string,
  version: string,
  languageCode: string,
  architecture: string,
  signal?: AbortSignal
): Promise<EditionAndLanguage> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  if (signal) {
    signal.addEventListener('abort', () => clearTimeout(timeoutId));
  }

  try {
    const finalSignal = signal || controller.signal;
    const [editionResponse, languageResponse] = await Promise.all([
      fetch(
        `${API_BASE}${ENDPOINTS.GET_EDITION_OPTIONS}${buildQueryString({
          SystemCode: systemCode,
          Version: version,
          LanguageCode: languageCode,
          Architecture: architecture,
        })}`,
        { signal: finalSignal }
      ),
      fetch(
        `${API_BASE}${ENDPOINTS.GET_LANGUAGE_OPTIONS}${buildQueryString({
          SystemCode: systemCode,
          Version: version,
          Architecture: architecture,
        })}`,
        { signal: finalSignal }
      ),
    ]);

    clearTimeout(timeoutId);

    const [editionData, languageData] = await Promise.all([
      handleResponse<{ Edition: EditionAndLanguage['Edition'] }>(editionResponse),
      handleResponse<{ Language: EditionAndLanguage['Language'] }>(languageResponse),
    ]);

    return {
      Edition: editionData.Edition || [],
      Language: languageData.Language || [],
    };
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * 批量获取最新版本信息（用于首页展示）
 */
export async function fetchLatestWinInfos(): Promise<WinFileInfo[]> {
  const [latestInfos11, latestInfos10] = await Promise.all([
    fetchWinInfos('11', 'latest', 'zh-cn', 'x64', 'consumer'),
    fetchWinInfos('10', 'latest', 'zh-cn', 'x64', 'consumer'),
  ]);

  const latest11 = latestInfos11[0];
  const latest10 = latestInfos10[0];

  return [latest11, latest10].filter((item): item is WinFileInfo => Boolean(item));
}

/**
 * 复制到剪贴板
 */
export async function copyToClipboard(content: string): Promise<void> {
  await navigator.clipboard.writeText(content);
}

/**
 * 验证 URL 安全性
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    // 只允许 http 和 https 协议
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
