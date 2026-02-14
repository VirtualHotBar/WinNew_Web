import React, { useEffect, useState } from 'react';
import { Layout, Menu, Link as TLink, Tooltip } from 'tdesign-react';
import { LaptopIcon, ModeDarkIcon, ModeLightIcon } from 'tdesign-icons-react';
import 'tdesign-react/es/style/index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
  useLocation,
} from 'react-router-dom';

import '../global/main.css';

import { Home } from '../page/home/home';
import { Donation } from '../page/donation/donation';
import { About } from '../page/about/about';
import { FooterContent } from '../layout/footer';
import type { RouterItem } from '../types/layout';
import { useRouterSEO, type SEOConfig } from '../hooks/useSEO';
import { pages } from '../pages.config';
import {
  getThemeMode,
  setThemeMode,
  subscribeThemeModeChange,
  type ThemeMode,
} from '../global/index';

const { Header, Content, Footer } = Layout;
const { HeadMenu, MenuItem } = Menu;

const THEME_MODE_ICON: Record<ThemeMode, React.ReactNode> = {
  auto: <LaptopIcon />,
  dark: <ModeDarkIcon />,
  light: <ModeLightIcon />,
};

const THEME_MODE_LABEL: Record<ThemeMode, string> = {
  auto: '自动',
  dark: '深色',
  light: '浅色',
};

const routers: RouterItem[] = [
  {
    word: '首页',
    title: 'WinNew - 从微软服务器获取最新的原版Windows镜像',
    path: '/',
    component: <Home />,
  },
  {
    word: '捐赠',
    title: 'WinNew - 捐赠',
    path: '/donation',
    component: <Donation />,
  },
  {
    word: '关于',
    title: 'WinNew - 关于',
    path: '/about',
    component: <About />,
  },
];

// SEO 配置映射
const seoConfigs: Record<string, SEOConfig> = {
  index: {
    title: 'WinNew - 从微软服务器获取最新的原版Windows镜像',
    description: '获取最新的原版Windows镜像，从微软官方服务器下载，原汁原味无修改。',
    url: 'https://winnew.cn/',
    keywords: 'Windows镜像,Win10,Win11,微软官方,纯净下载',
  },
  donation: {
    title: 'WinNew - 捐赠',
    description: 'WinNew为非盈利项目。如果你觉得项目不错请考虑捐赠，以维持项目的持续维护。',
    url: 'https://winnew.cn/donation',
    keywords: 'WinNew捐赠,支持项目,开源贡献',
  },
  about: {
    title: 'WinNew - 关于',
    description: 'WinNew是一个获取原版Windows镜像的网站，镜像来自于Windows更新服务器，提供直链下载。原汁原味，纯净无修改！',
    url: 'https://winnew.cn/about',
    keywords: 'WinNew关于,项目介绍,Windows镜像下载',
  },
};

export function Layout_() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

function AppLayout() {
  const location = useLocation();
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getThemeMode());

  useEffect(() => subscribeThemeModeChange(setThemeModeState), []);

  const handleThemeModeToggle = () => {
    const nextMode: ThemeMode =
      themeMode === 'auto' ? 'dark' : themeMode === 'dark' ? 'light' : 'auto';
    setThemeMode(nextMode);
  };

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="container">
          <HeadMenu
            value={location.pathname}
            theme={themeMode === 'dark' ? 'dark' : 'light'}
            logo={<RouterLink className="brand-logo" to="/">WinNew</RouterLink>}
            className="main-menu"
          >
            <div className="menu-spacer" />
            <div className="theme-mode-control">
              <Tooltip
                content={`当前：${THEME_MODE_LABEL[themeMode]}（点击切换）`}
                placement="bottom"
                showArrow
              >
                <TLink
                  className="theme-mode-link"
                  theme="default"
                  hover="color"
                  underline={false}
                  onClick={handleThemeModeToggle}
                >
                  {THEME_MODE_ICON[themeMode]}
                </TLink>
              </Tooltip>
            </div>
            {routers.map((item) => (
              <MenuItem key={item.path} value={item.path}>
                <RouterLink to={item.path}>{item.word}</RouterLink>
              </MenuItem>
            ))}
          </HeadMenu>
        </div>
      </Header>
      <Content className="app-content">
        <div className="container">
          <PageRouter />
        </div>
      </Content>
      <Footer className="app-footer">
        <div className="container">
          <FooterContent />
        </div>
      </Footer>
    </Layout>
  );
}

function PageRouter() {
  // 使用 SEO Hook 自动管理路由级别的 meta 标签
  useRouterSEO(seoConfigs);

  return (
    <Routes>
      {routers.map((item) => (
        <Route path={item.path} key={item.path} element={item.component} />
      ))}
    </Routes>
  );
}
