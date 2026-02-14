/**
 * FileList Component
 * 文件列表组件，支持空状态、加载状态和搜索过滤
 */

import React, { useState, useMemo, useCallback } from 'react';
import { Button, Space } from 'tdesign-react';
import { SearchFilter } from './SearchFilter';
import { formatFileSize } from '../utils/format';
import type { WinFileInfo } from '../types/api';

interface FileListProps {
  files: WinFileInfo[];
  emptyContent?: React.ReactNode;
  enableSearch?: boolean;
  onDownload: (url: string) => void;
  onCopy: (url: string) => void;
}

/**
 * 文件列表组件
 */
export const FileList: React.FC<FileListProps> = ({
  files,
  emptyContent,
  enableSearch = true,
  onDownload,
  onCopy,
}) => {
  const [filteredFiles, setFilteredFiles] = useState<WinFileInfo[]>(files);
  const [scrollTop, setScrollTop] = useState(0);

  const ROW_HEIGHT = 86;
  const CONTAINER_HEIGHT = 520;
  const OVERSCAN = 6;

  // 当外部 files 变化时更新过滤列表
  React.useEffect(() => {
    setFilteredFiles(files);
    setScrollTop(0);
  }, [files]);

  /**
   * 处理过滤结果变化
   */
  const handleFilterChange = useCallback((newFilteredFiles: WinFileInfo[]) => {
    setFilteredFiles(newFilteredFiles);
  }, []);

  const visibleRange = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
    const visibleCount = Math.ceil(CONTAINER_HEIGHT / ROW_HEIGHT) + OVERSCAN * 2;
    const end = Math.min(filteredFiles.length, start + visibleCount);
    return { start, end };
  }, [filteredFiles.length, scrollTop]);

  const visibleRows = useMemo(() => {
    return filteredFiles.slice(visibleRange.start, visibleRange.end).map((info, offset) => {
      const index = visibleRange.start + offset;
      const top = index * ROW_HEIGHT;
      return (
        <div className="file-list-row file-list-row-virtual" style={{ top }} key={`${info.FileName}-${index}`}>
          <div className="file-list-main">
            <div className="file-list-name">{info.FileName}</div>
            <div className="file-list-meta">
              <span>{info.VerCode} ({info.BuildVer})</span>
              <span>{info.Language}</span>
              <span>{info.Edition}</span>
              <span>{info.Architecture}</span>
              <span>{formatFileSize(info.Size)}</span>
            </div>
          </div>
          <Space className="file-list-actions" size="small">
            <Button theme="primary" size="small" onClick={() => onDownload(info.FilePath)}>
              下载
            </Button>
            <Button variant="outline" size="small" onClick={() => onCopy(info.FilePath)}>
              复制直链
            </Button>
          </Space>
        </div>
      );
    });
  }, [filteredFiles, onCopy, onDownload, visibleRange]);

  const totalHeight = filteredFiles.length * ROW_HEIGHT;

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  const renderRows = useMemo(() => {
    return filteredFiles.map((info, index) => (
      <div className="file-list-row" key={`${info.FileName}-${index}`}>
        <div className="file-list-main">
          <div className="file-list-name">{info.FileName}</div>
          <div className="file-list-meta">
            <span>{info.VerCode} ({info.BuildVer})</span>
            <span>{info.Language}</span>
            <span>{info.Edition}</span>
            <span>{info.Architecture}</span>
            <span>{formatFileSize(info.Size)}</span>
          </div>
        </div>
        <Space className="file-list-actions" size="small">
          <Button theme="primary" size="small" onClick={() => onDownload(info.FilePath)}>
            下载
          </Button>
          <Button variant="outline" size="small" onClick={() => onCopy(info.FilePath)}>
            复制直链
          </Button>
        </Space>
      </div>
    ));
  }, [filteredFiles, onCopy, onDownload]);

  if (files.length === 0) {
    return <>{emptyContent}</>;
  }

  return (
    <div>
      {enableSearch && files.length > 1 && (
        <SearchFilter
          files={files}
          onFilterChange={handleFilterChange}
          placeholder="搜索文件名、版本号、内部版本或SHA1/SHA256..."
        />
      )}
      {filteredFiles.length === 0 ? (
        <div className="file-empty">
          没有找到匹配的文件
        </div>
      ) : (
        filteredFiles.length <= 30 ? (
          <div className="file-list-wrap">{renderRows}</div>
        ) : (
          <div className="file-list-virtual" style={{ height: CONTAINER_HEIGHT }} onScroll={handleScroll}>
            <div className="file-list-virtual-inner" style={{ height: totalHeight }}>
              {visibleRows}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default FileList;
