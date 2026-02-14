/**
 * SearchFilter Component
 * 搜索过滤组件，支持按文件名、版本号、SHA1/SHA256搜索
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Input, Space, Tag } from 'tdesign-react';
import { SearchIcon } from 'tdesign-icons-react';
import type { WinFileInfo } from '../types/api';

interface SearchFilterProps {
  files: WinFileInfo[];
  onFilterChange: (filteredFiles: WinFileInfo[]) => void;
  placeholder?: string;
}

type SearchField = 'all' | 'filename' | 'version' | 'sha1' | 'sha256' | 'build';

const SEARCH_FIELDS: { value: SearchField; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'filename', label: '文件名' },
  { value: 'version', label: '版本号' },
  { value: 'build', label: '内部版本' },
  { value: 'sha1', label: 'SHA1' },
  { value: 'sha256', label: 'SHA256' },
];

/**
 * 搜索过滤组件
 */
export const SearchFilter: React.FC<SearchFilterProps> = ({
  files,
  onFilterChange,
  placeholder = '搜索文件...',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState<SearchField>('all');

  /**
   * 执行搜索过滤
   */
  const performSearch = useCallback((
    term: string,
    field: SearchField,
    sourceFiles: WinFileInfo[]
  ): WinFileInfo[] => {
    if (!term.trim()) return sourceFiles;

    const lowerTerm = term.toLowerCase().trim();

    return sourceFiles.filter((file) => {
      switch (field) {
        case 'filename':
          return file.FileName.toLowerCase().includes(lowerTerm);
        case 'version':
          return file.VerCode.toLowerCase().includes(lowerTerm);
        case 'build':
          return file.BuildVer.toLowerCase().includes(lowerTerm);
        case 'sha1':
          return file.Sha1.toLowerCase().includes(lowerTerm);
        case 'sha256':
          return file.Sha256.toLowerCase().includes(lowerTerm);
        case 'all':
        default:
          return (
            file.FileName.toLowerCase().includes(lowerTerm) ||
            file.VerCode.toLowerCase().includes(lowerTerm) ||
            file.BuildVer.toLowerCase().includes(lowerTerm) ||
            file.Sha1.toLowerCase().includes(lowerTerm) ||
            file.Sha256.toLowerCase().includes(lowerTerm) ||
            file.Edition.toLowerCase().includes(lowerTerm)
          );
      }
    });
  }, []);

  /**
   * 过滤后的文件列表
   */
  const filteredFiles = useMemo(() => {
    return performSearch(searchTerm, searchField, files);
  }, [searchTerm, searchField, files, performSearch]);

  /**
   * 通知父组件过滤结果变化
   */
  React.useEffect(() => {
    onFilterChange(filteredFiles);
  }, [filteredFiles, onFilterChange]);

  /**
   * 处理搜索输入变化
   */
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  /**
   * 清空搜索
   */
  const handleClear = useCallback(() => {
    setSearchTerm('');
  }, []);

  /**
   * 处理字段切换
   */
  const handleFieldChange = useCallback((field: SearchField) => {
    setSearchField(field);
  }, []);

  return (
    <div className="filter-bar">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          value={searchTerm}
          placeholder={placeholder}
          prefixIcon={<SearchIcon />}
          clearable
          onChange={handleSearchChange}
          onClear={handleClear}
          suffix={
            files.length > 0 && (
              <span className="filter-count">
                {filteredFiles.length}/{files.length}
              </span>
            )
          }
        />

        <div className="filter-tags">
          <span className="filter-tags-label">
            搜索范围:
          </span>
          {SEARCH_FIELDS.map((field) => (
            <Tag
              key={field.value}
              theme={searchField === field.value ? 'primary' : 'default'}
              variant={searchField === field.value ? 'light' : 'outline'}
              style={{ cursor: 'pointer', userSelect: 'none' }}
              onClick={() => handleFieldChange(field.value)}
            >
              {field.label}
            </Tag>
          ))}
        </div>
      </Space>
    </div>
  );
};

export default SearchFilter;
