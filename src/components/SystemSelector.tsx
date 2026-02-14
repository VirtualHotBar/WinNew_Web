/**
 * SystemSelector Component
 * 系统筛选器组件，管理所有下拉选择
 * 优化版本：更好的联动逻辑和用户体验
 */

import React, { useMemo, useCallback } from 'react';
import { Select, Loading } from 'tdesign-react';
import type { VersionsOption, EditionAndLanguage } from '../types/api';

interface SystemSelectorProps {
  versionsOption?: VersionsOption;
  editionAndLanguage?: EditionAndLanguage;
  isLoadingOptions?: boolean;
  systemCode: string;
  version: string;
  language: string;
  edition: string;
  architecture: 'all' | 'x64' | 'x86' | 'arm64';
  onSystemCodeChange: (value: string) => void;
  onVersionChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onEditionChange: (value: string) => void;
  onArchitectureChange: (value: 'all' | 'x64' | 'x86' | 'arm64') => void;
}

/**
 * 系统筛选器组件
 */
export const SystemSelector: React.FC<SystemSelectorProps> = ({
  versionsOption,
  editionAndLanguage,
  isLoadingOptions = false,
  systemCode,
  version,
  language,
  edition,
  architecture,
  onSystemCodeChange,
  onVersionChange,
  onLanguageChange,
  onEditionChange,
  onArchitectureChange,
}) => {
  // 记忆化版本选项
  const versionOptions = useMemo(() => {
    if (!systemCode || !versionsOption) return [];
    return versionsOption.Versions[systemCode] || [];
  }, [systemCode, versionsOption]);

  // 计算禁用状态
  const isVersionDisabled = !systemCode;
  const isLanguageDisabled = !editionAndLanguage?.Language.length || !version;
  const isEditionDisabled = !language || !editionAndLanguage?.Edition.length || !version;

  // 处理系统代码变化
  const handleSystemCodeChange = useCallback((value: unknown) => {
    onSystemCodeChange(String(value || ''));
  }, [onSystemCodeChange]);

  // 处理版本变化
  const handleVersionChange = useCallback((value: unknown) => {
    onVersionChange(String(value || ''));
  }, [onVersionChange]);

  // 处理语言变化
  const handleLanguageChange = useCallback((value: unknown) => {
    onLanguageChange(String(value || ''));
  }, [onLanguageChange]);

  // 处理版本变化
  const handleEditionChange = useCallback((value: unknown) => {
    onEditionChange(String(value || ''));
  }, [onEditionChange]);

  const handleArchitectureChange = useCallback((value: unknown) => {
    const selected = String(value || 'all') as 'all' | 'x64' | 'x86' | 'arm64';
    onArchitectureChange(selected);
  }, [onArchitectureChange]);

  const architectureOptions = useMemo(() => ([
    { label: '全部架构', value: 'all' },
    { label: 'x64', value: 'x64' },
    { label: 'x86', value: 'x86' },
    { label: 'arm64', value: 'arm64' },
  ]), []);

  return (
    <Loading loading={isLoadingOptions} size="small">
      <div className="selector-grid">
        <Select
          value={systemCode}
          prefixIcon={<>系统:</>}
          options={versionsOption?.SystemCodes}
          placeholder="选择系统"
          clearable
          onChange={handleSystemCodeChange}
        />
        <Select
          prefixIcon={<>版本号:</>}
          value={version}
          options={versionOptions}
          disabled={isVersionDisabled}
          placeholder={isVersionDisabled ? '请先选择系统' : '选择版本'}
          clearable
          onChange={handleVersionChange}
        />
        <Select
          value={language}
          prefixIcon={<>语言:</>}
          disabled={isLanguageDisabled}
          options={editionAndLanguage?.Language}
          placeholder={isLanguageDisabled ? '请先选择版本号' : '选择语言'}
          clearable
          onChange={handleLanguageChange}
        />
        <Select
          value={edition}
          prefixIcon={<>版本:</>}
          disabled={isEditionDisabled}
          options={editionAndLanguage?.Edition}
          placeholder={isEditionDisabled ? '请先选择语言' : '选择版本'}
          clearable
          onChange={handleEditionChange}
        />
        <Select
          value={architecture}
          prefixIcon={<>架构:</>}
          options={architectureOptions}
          placeholder="选择架构"
          clearable={false}
          onChange={handleArchitectureChange}
        />
      </div>
    </Loading>
  );
};

export default SystemSelector;
