/**
 * WinNew API Types
 * 完整的类型定义
 */

// 系统文件信息
export interface WinFileInfo {
  FileName: string;
  LanguageCode: string;
  Language: string;
  Edition: string;
  Architecture: 'x64' | 'x86' | 'arm64';
  Size: string;
  Sha1: string;
  Sha256: string;
  FilePath: string;
  Architecture_Loc: string;
  Edition_Loc: string;
  PushTime: string;
  BuildVer: string;
  VerCode: string;
  SystemCode: '11' | '10';
}

// 选项基础类型
export interface SelectOption {
  label: string;
  value: string;
  label_cn?: string;
}

// 系统代码选项
export interface SystemCodeOption extends SelectOption {
  label: string;
  value: '11' | '10';
}

// 版本选项
export interface VersionOption extends SelectOption {
  label: string;
  value: string;
}

// 版本选项响应
export interface VersionsOption {
  SystemCodes: SystemCodeOption[];
  Versions: {
    [systemCode: string]: VersionOption[];
  };
}

// 语言选项
export interface LanguageOption extends SelectOption {
  label_cn?: string;
}

// 版本选项
export interface EditionOption extends SelectOption {
  label_cn?: string;
}

// 语言和版本组合选项
export interface EditionAndLanguage {
  Language: LanguageOption[];
  Edition: EditionOption[];
}

// API 响应包装
export interface ApiResponse<T> {
  state: 'success' | 'error';
  data?: T;
  message?: string;
  code?: string;
}

// 筛选状态
export interface FilterState {
  systemCode: string;
  version: string;
  language: string;
  edition: string;
  architecture: 'all' | 'x64' | 'x86' | 'arm64';
}

// 文件卡片 Props
export interface FileCardProps {
  info: WinFileInfo;
  editionLabel?: string;
  onDownload: (url: string) => void;
  onCopy: (url: string) => void;
}

// 文件列表 Props
export interface FileListProps {
  files: WinFileInfo[];
  editionAndLanguage?: EditionAndLanguage;
  selectedLanguage?: string;
  onDownload: (url: string) => void;
  onCopy: (url: string) => void;
}
