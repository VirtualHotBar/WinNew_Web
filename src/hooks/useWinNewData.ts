/**
 * useWinNewData Hook
 * 数据获取和状态管理的自定义 Hook
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { MessagePlugin } from 'tdesign-react';
import {
  fetchLatestWinInfos,
  fetchVersionOptions,
  fetchEditionAndLanguageOptions,
  fetchWinInfos,
  copyToClipboard,
} from '../services/api';
import type { WinFileInfo, VersionsOption, EditionAndLanguage } from '../types/api';

interface UseWinNewDataReturn {
  // 数据
  latestFiles: WinFileInfo[];
  versionsOption?: VersionsOption;
  editionAndLanguage?: EditionAndLanguage;
  filteredFiles: WinFileInfo[];

  // 加载状态
  isLoadingLatest: boolean;
  isLoadingFiltered: boolean;

  // 错误状态
  error: string | null;

  // 操作
  refreshLatest: () => Promise<void>;
  refreshFiltered: (params: {
    systemCode: string;
    version: string;
    language: string;
    edition: string;
    architecture: 'all' | 'x64' | 'x86' | 'arm64';
  }) => Promise<void>;
  loadEditionAndLanguage: (
    systemCode: string,
    version: string,
    language: string,
    architecture: 'all' | 'x64' | 'x86' | 'arm64'
  ) => Promise<void>;
  handleDownload: (url: string) => void;
  handleCopy: (url: string) => Promise<void>;
}

/**
 * WinNew 数据管理 Hook
 */
export function useWinNewData(): UseWinNewDataReturn {
  // 数据状态
  const [latestFiles, setLatestFiles] = useState<WinFileInfo[]>([]);
  const [versionsOption, setVersionsOption] = useState<VersionsOption>();
  const [editionAndLanguage, setEditionAndLanguage] = useState<EditionAndLanguage>();
  const [filteredFiles, setFilteredFiles] = useState<WinFileInfo[]>([]);

  // 加载状态
  const [isLoadingLatest, setIsLoadingLatest] = useState(false);
  const [isLoadingFiltered, setIsLoadingFiltered] = useState(false);

  // 错误状态
  const [error, setError] = useState<string | null>(null);

  // 用于取消过时的请求
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * 加载最新文件信息
   */
  const refreshLatest = useCallback(async () => {
    if (isLoadingLatest || latestFiles.length > 0) return;

    setIsLoadingLatest(true);
    setError(null);

    try {
      const files = await fetchLatestWinInfos();
      setLatestFiles(files);
    } catch (err) {
      const message = err instanceof Error ? err.message : '加载失败';
      setError(message);
      MessagePlugin.error(`加载最新版本失败: ${message}`, 3000);
    } finally {
      setIsLoadingLatest(false);
    }
  }, [isLoadingLatest, latestFiles.length]);

  /**
   * 加载版本选项
   */
  useEffect(() => {
    let isMounted = true;

    fetchVersionOptions()
      .then((data) => {
        if (isMounted) {
          setVersionsOption(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to load version options:', err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * 加载版本和语言选项
   */
  const loadEditionAndLanguage = useCallback(
    async (
      systemCode: string,
      version: string,
      language: string,
      architecture: 'all' | 'x64' | 'x86' | 'arm64'
    ) => {
      if (!systemCode || !version) {
        setEditionAndLanguage({ Language: [], Edition: [] });
        return;
      }

      try {
        const data = await fetchEditionAndLanguageOptions(
          systemCode,
          version,
          language,
          architecture
        );
        setEditionAndLanguage(data);
      } catch (err) {
        console.error('Failed to load edition and language options:', err);
        setEditionAndLanguage({ Language: [], Edition: [] });
      }
    },
    []
  );

  /**
   * 加载筛选后的文件列表
   */
  const refreshFiltered = useCallback(
    async (params: {
      systemCode: string;
      version: string;
      language: string;
      edition: string;
      architecture: 'all' | 'x64' | 'x86' | 'arm64';
    }) => {
      const { systemCode, version, language, edition, architecture } = params;

      // 查询必须包含系统 + 版本 + 语言
      if (!systemCode || !version || !language) {
        setFilteredFiles([]);
        return;
      }

      // 取消之前的请求
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setIsLoadingFiltered(true);
      setError(null);

      try {
        const files = await fetchWinInfos(
          systemCode,
          version,
          language,
          architecture,
          edition,
          abortController.signal
        );

        // 检查请求是否被取消
        if (abortController.signal.aborted) return;

        setFilteredFiles(files);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;

        const message = err instanceof Error ? err.message : '加载失败';
        setError(message);
        MessagePlugin.error(`加载文件列表失败: ${message}`, 3000);
        setFilteredFiles([]);
      } finally {
        setIsLoadingFiltered(false);
      }
    },
    []
  );

  /**
   * 处理下载
   */
  const handleDownload = useCallback((url: string) => {
    // 验证 URL 安全性
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        MessagePlugin.error('无效的下载链接', 3000);
        return;
      }
      window.open(url, '_blank'); // 使用 _blank 在新标签页打开
    } catch {
      MessagePlugin.error('打开下载链接失败', 3000);
    }
  }, []);

  /**
   * 处理复制
   */
  const handleCopy = useCallback(async (url: string) => {
    try {
      await copyToClipboard(url);
      MessagePlugin.success('复制成功', 2000);
    } catch {
      MessagePlugin.error('复制失败', 2000);
    }
  }, []);

  // 清理函数
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    latestFiles,
    versionsOption,
    editionAndLanguage,
    filteredFiles,
    isLoadingLatest,
    isLoadingFiltered,
    error,
    refreshLatest,
    refreshFiltered,
    loadEditionAndLanguage,
    handleDownload,
    handleCopy,
  };
}
