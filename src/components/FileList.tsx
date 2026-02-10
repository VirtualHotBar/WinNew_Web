/**
 * FileList Component
 * 文件列表组件，支持空状态、加载状态和搜索过滤
 */

import React, { useState, useMemo, useCallback } from 'react';
import { FileCard } from './FileCard';
import { SearchFilter } from './SearchFilter';
import type { WinFileInfo, EditionAndLanguage } from '../types/api';

interface FileListProps {
  files: WinFileInfo[];
  editionAndLanguage?: EditionAndLanguage;
  selectedLanguage?: string;
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
  editionAndLanguage,
  selectedLanguage,
  emptyContent,
  enableSearch = true,
  onDownload,
  onCopy,
}) => {
  const [filteredFiles, setFilteredFiles] = useState<WinFileInfo[]>(files);

  // 当外部 files 变化时更新过滤列表
  React.useEffect(() => {
    setFilteredFiles(files);
  }, [files]);

  /**
   * 处理过滤结果变化
   */
  const handleFilterChange = useCallback((newFilteredFiles: WinFileInfo[]) => {
    setFilteredFiles(newFilteredFiles);
  }, []);

  /**
   * 渲染文件卡片
   */
  const renderFileCards = useMemo(() => {
    return filteredFiles.map((info, index) => {
      // 查找版本和语言的显示标签
      const editionLabel = editionAndLanguage?.Edition.find(
        (item) => item.value === info.Edition
      )?.label_cn;

      const languageLabel = selectedLanguage
        ? editionAndLanguage?.Language.find((item) => item.value === selectedLanguage)?.label_cn
        : info.Language;

      return (
        <FileCard
          key={`${info.FileName}-${index}`}
          info={info}
          editionLabel={editionLabel}
          languageLabel={languageLabel}
          onDownload={onDownload}
          onCopy={onCopy}
        />
      );
    });
  }, [filteredFiles, editionAndLanguage, selectedLanguage, onDownload, onCopy]);

  if (files.length === 0) {
    return <>{emptyContent}</>;
  }

  return (
    <div>
      {enableSearch && files.length > 1 && (
        <SearchFilter
          files={files}
          onFilterChange={handleFilterChange}
          placeholder="搜索文件名、版本号、内部版本或SHA1..."
        />
      )}
      {filteredFiles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--td-text-color-placeholder)' }}>
          没有找到匹配的文件
        </div>
      ) : (
        renderFileCards
      )}
    </div>
  );
};

export default FileList;
