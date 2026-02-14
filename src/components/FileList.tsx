/**
 * FileList Component
 * 文件列表组件，支持空状态、加载状态和搜索过滤
 */

import React, { useState, useMemo, useCallback } from 'react';
import { Link, List, Space } from 'tdesign-react';
import { SearchFilter } from './SearchFilter';
import { formatFileSize } from '../utils/format';
import type { WinFileInfo, EditionAndLanguage } from '../types/api';

interface FileListProps {
  files: WinFileInfo[];
  editionAndLanguage?: EditionAndLanguage;
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

  const languageLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    (editionAndLanguage?.Language || []).forEach((item) => {
      const display = item.label_cn || item.label;
      map.set(item.value.toLowerCase(), display);
      map.set(item.label.toLowerCase(), display);
    });
    return map;
  }, [editionAndLanguage?.Language]);

  const editionLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    (editionAndLanguage?.Edition || []).forEach((item) => {
      const display = item.label_cn || item.label;
      map.set(item.value.toLowerCase(), display);
      map.set(item.label.toLowerCase(), display);
    });
    return map;
  }, [editionAndLanguage?.Edition]);

  const renderRows = useMemo(() => {
    return filteredFiles.map((info, index) => (
      <List.ListItem className="file-list-row" key={`${info.FileName}-${index}`}>
        <div className="file-list-main">
          <div className="file-list-title">
            {`Windows ${info.SystemCode} ${info.VerCode} (${info.BuildVer})`}
          </div>
          <div className="file-list-meta">
            <span>{languageLabelMap.get((info.LanguageCode || info.Language).toLowerCase()) || info.Language}</span>
            <span>{editionLabelMap.get(info.Edition.toLowerCase()) || info.Edition}</span>
            <span>{info.Architecture}</span>
            <span>{formatFileSize(info.Size)}</span>
            <span>SHA: {info.Sha256 || info.Sha1 || '-'}</span>
          </div>
        </div>
        <Space className="file-list-actions" size="small">
          <Link theme="primary" hover="color" onClick={() => onDownload(info.FilePath)}>
            下载
          </Link>
          <Link theme="primary" hover="color" onClick={() => onCopy(info.FilePath)}>
            复制直链
          </Link>
        </Space>
      </List.ListItem>
    ));
  }, [editionLabelMap, filteredFiles, languageLabelMap, onCopy, onDownload]);

  if (files.length === 0) {
    return <div className="file-empty">{emptyContent}</div>;
  }

  return (
    <div>
      {enableSearch && files.length > 1 && (
        <SearchFilter
          files={files}
          onFilterChange={handleFilterChange}
          placeholder="搜索版本号、内部版本或SHA1/SHA256..."
        />
      )}
      {filteredFiles.length === 0 ? (
        <div className="file-empty">
          没有找到匹配的文件
        </div>
      ) : (
        <List className="file-list-wrap">{renderRows}</List>
      )}
    </div>
  );
};

export default FileList;
