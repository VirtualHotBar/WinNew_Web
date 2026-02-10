/**
 * Home Page
 * 优化后的首页组件
 */

import React, { useEffect, useCallback, useState } from 'react';
import { Collapse, Link, Space } from 'tdesign-react';

import { FileCard } from '../../components/FileCard';
import { FileList } from '../../components/FileList';
import { SystemSelector } from '../../components/SystemSelector';
import { SkeletonCard } from '../../components/SkeletonCard';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useWinNewData } from '../../hooks/useWinNewData';
import type { FilterState, WinFileInfo, VersionsOption, EditionAndLanguage } from '../../types/api';

// 外部链接配置
const EXTERNAL_LINKS = {
  official: [
    { label: '下载 Windows 11', url: 'https://www.microsoft.com/zh-cn/software-download/windows11' },
    { label: '下载 Windows 10', url: 'https://www.microsoft.com/zh-cn/software-download/windows10' },
  ],
  thirdPartyOriginal: [
    { label: '站长搜集的原版系统', url: 'https://down.hotpe.top/OS/' },
    { label: 'MSDN, 我告诉你', url: 'https://next.itellyou.cn/' },
    { label: 'UUP dump', url: 'https://uupdump.net/?lang=zh-cn', mirror: 'https://www.uupdump.cn/' },
    { label: 'MAS', url: 'https://massgrave.dev/genuine-installation-media' },
    { label: 'HelloWindows', url: 'https://hellowindows.cn/' },
    { label: '山己几子木', url: 'https://msdn.sjjzm.com/' },
    { label: '系统库', url: 'https://www.xitongku.com/' },
  ],
  thirdPartyModified: [
    { label: '无忧启动', url: 'http://bbs.wuyou.net/forum.php?mod=forumdisplay&fid=90' },
    { label: 'Puresys', url: 'https://www.puresys.net/%e7%b3%bb%e7%bb%9f%e4%b8%8b%e8%bd%bd' },
    { label: '吻妻', url: 'https://www.newxitong.com/' },
    { label: '绿色系统', url: 'https://lvsexitong.com/' },
    { label: '爱纯净', url: 'https://www.aichunjing.com/' },
    { label: 'WINOS', url: 'https://www.winos.me/', note: '下载需登录' },
    { label: '不忘初心', url: 'https://www.pc528.net/', note: '下载需付费' },
    { label: '又要重装', url: 'https://yyczxt.com/', note: 'by果核剥壳、有付费项' },
  ],
};

// 页面标题组件
const PageHeader: React.FC = () => (
  <div className="page-hero panel">
    <img src="/favicon.ico" width="96" alt="WinNew Logo" />
    <h1>
      WinNew
    </h1>
    <span className="page-subtitle">
      从微软服务器获取最新的原版Windows镜像
    </span>
  </div>
);

// 最新版本区域 Props
interface LatestSectionProps {
  latestFiles: WinFileInfo[];
  isLoading: boolean;
  onRefresh: () => Promise<void>;
  onDownload: (url: string) => void;
  onCopy: (url: string) => void;
}

// 最新版本区域
const LatestSection: React.FC<LatestSectionProps> = ({
  latestFiles,
  isLoading,
  onRefresh,
  onDownload,
  onCopy,
}) => {
  // 只在首次挂载时刷新
  useEffect(() => {
    if (latestFiles.length === 0 && !isLoading) {
      onRefresh();
    }
  }, []); // 空依赖数组，只执行一次

  return (
    <section className="panel section-panel">
      <h2 className="section-title">最新</h2>
      {isLoading ? (
        <div className="latest-grid">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="latest-grid">
          {latestFiles.map((info) => (
            <div key={`${info.SystemCode}-${info.BuildVer}`}>
              <FileCard
                info={info}
                editionLabel="专业版"
                languageLabel="简体中文"
                onDownload={onDownload}
                onCopy={onCopy}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// 所有版本区域 Props
interface AllSystemSectionProps {
  versionsOption?: VersionsOption;
  editionAndLanguage?: EditionAndLanguage;
  filteredFiles: WinFileInfo[];
  isLoading: boolean;
  isLoadingOptions?: boolean;
  onLoadEditionAndLanguage: (systemCode: string, version: string) => Promise<void>;
  onFilterChange: (filters: FilterState) => void;
  onDownload: (url: string) => void;
  onCopy: (url: string) => void;
}

// 所有版本区域
const AllSystemSection: React.FC<AllSystemSectionProps> = ({
  versionsOption,
  editionAndLanguage,
  filteredFiles,
  isLoading,
  isLoadingOptions,
  onLoadEditionAndLanguage,
  onFilterChange,
  onDownload,
  onCopy,
}) => {
  const [filters, setFilters] = React.useState<FilterState>({
    systemCode: '',
    version: '',
    language: '',
    edition: '',
  });

  // 当版本变化时加载版本和语言选项
  useEffect(() => {
    if (filters.version) {
      onLoadEditionAndLanguage(filters.systemCode, filters.version);
    }
  }, [filters.version, filters.systemCode, onLoadEditionAndLanguage]);

  // 当筛选条件变化时通知父组件
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // 处理系统代码变化
  const handleSystemCodeChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      systemCode: value,
      version: '',
      language: '',
      edition: '',
    }));
  }, []);

  // 处理版本变化
  const handleVersionChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      version: value,
      language: '',
      edition: '',
    }));
  }, []);

  // 处理语言变化
  const handleLanguageChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      language: value,
    }));
  }, []);

  // 处理版本变化
  const handleEditionChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      edition: value,
    }));
  }, []);

  return (
    <section className="panel section-panel">
      <h2 className="section-title">所有</h2>
      <div className="all-system-layout">
        <div className="all-system-left">
          <h3 className="all-system-subtitle">筛选选项</h3>
          <SystemSelector
            versionsOption={versionsOption}
            editionAndLanguage={editionAndLanguage}
            isLoadingOptions={isLoadingOptions}
            systemCode={filters.systemCode}
            version={filters.version}
            language={filters.language}
            edition={filters.edition}
            onSystemCodeChange={handleSystemCodeChange}
            onVersionChange={handleVersionChange}
            onLanguageChange={handleLanguageChange}
            onEditionChange={handleEditionChange}
          />
        </div>

        <div className="all-system-right files-area">
          <h3 className="all-system-subtitle">查询结果</h3>
          {isLoading ? (
            <Space direction="vertical" style={{ width: '100%' }}>
              <SkeletonCard />
            </Space>
          ) : (
            <FileList
              files={filteredFiles}
              editionAndLanguage={editionAndLanguage}
              selectedLanguage={filters.language}
              emptyContent={<strong>请选择筛选选项</strong>}
              onDownload={onDownload}
              onCopy={onCopy}
            />
          )}
        </div>
      </div>
    </section>
  );
};

// 外部链接区域
const ExternalLinksSection: React.FC = () => (
  <section className="panel section-panel">
    <h2 className="section-title">补充</h2>
    <Collapse
      defaultValue={['official', 'thirdParty-original']}
      expandIcon
      expandIconPlacement="left"
      expandOnRowClick
      style={{ textAlign: 'left' }}
    >
      <Collapse.Panel value="official" header="微软官方页面">
        {EXTERNAL_LINKS.official.map((link) => (
          <React.Fragment key={link.url}>
            <Link theme="primary" href={link.url} target="_blank">
              {link.label}
            </Link>
            <br />
          </React.Fragment>
        ))}
      </Collapse.Panel>

      <Collapse.Panel value="thirdParty-original" header="第三方原版系统站点">
        {EXTERNAL_LINKS.thirdPartyOriginal.map((link) => (
          <React.Fragment key={link.url}>
            <Link theme="primary" href={link.url} target="_blank">
              {link.label}
            </Link>
            {link.mirror && (
              <>
                (<Link theme="primary" href={link.mirror} target="_blank">
                  CN
                </Link>
                )
              </>
            )}
            <br />
          </React.Fragment>
        ))}
        <span className="links-note">注：以上站点不保证可用性、安全性、质量，请自行判断。</span>
      </Collapse.Panel>

      <Collapse.Panel value="thirdParty-modified" header="第三方修改版系统站点">
        {EXTERNAL_LINKS.thirdPartyModified.map((link) => (
          <React.Fragment key={link.url}>
            <Link theme="primary" href={link.url} target="_blank">
              {link.label}
            </Link>
            {link.note && `(${link.note})`}
            <br />
          </React.Fragment>
        ))}
        <span className="links-note">注：以上站点不保证可用性、安全性、质量，请自行判断。</span>
      </Collapse.Panel>
    </Collapse>
  </section>
);

// 首页组件
export const Home: React.FC = () => {
  const {
    latestFiles,
    versionsOption,
    editionAndLanguage,
    filteredFiles,
    isLoadingLatest,
    isLoadingFiltered,
    refreshLatest,
    refreshFiltered,
    loadEditionAndLanguage,
    handleDownload,
    handleCopy,
  } = useWinNewData();

  // 用于追踪筛选状态
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    systemCode: '',
    version: '',
    language: '',
    edition: '',
  });

  // 当筛选条件变化时加载文件列表
  useEffect(() => {
    refreshFiltered(currentFilters);
  }, [currentFilters, refreshFiltered]);

  return (
    <ErrorBoundary onReset={() => window.location.reload()}>
      <div className="home-page">
        <PageHeader />
        <LatestSection
          latestFiles={latestFiles}
          isLoading={isLoadingLatest}
          onRefresh={refreshLatest}
          onDownload={handleDownload}
          onCopy={handleCopy}
        />
        <AllSystemSection
          versionsOption={versionsOption}
          editionAndLanguage={editionAndLanguage}
          filteredFiles={filteredFiles}
          isLoading={isLoadingFiltered}
          onLoadEditionAndLanguage={loadEditionAndLanguage}
          onFilterChange={setCurrentFilters}
          onDownload={handleDownload}
          onCopy={handleCopy}
        />
        <ExternalLinksSection />
      </div>
    </ErrorBoundary>
  );
};

export default Home;
