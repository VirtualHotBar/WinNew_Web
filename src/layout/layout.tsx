

import { Layout, Menu } from 'tdesign-react';
import 'tdesign-react/es/style/index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import '../global/main.css';

import { Home } from '../page/home/home';
import { Donation } from '../page/donation/donation';
import { About } from '../page/about/about';
import { FooterContent } from '../layout/footer';
import type { RouterItem } from '../types/layout';
import { useRouterSEO, type SEOConfig } from '../hooks/useSEO';
import { pages } from '../pages.config';

const { Header, Content, Footer } = Layout;
const { HeadMenu, MenuItem } = Menu;



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


const headerStyle = {
  boxShadow: '0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)',
};

const contentWrapperStyle = {
  maxWidth: '1200px',
  width: '100%',
  margin: '0 auto',
  justifyContent: 'center',
};

export function Layout_() {
  return (
    <Router>
      <Layout style={{ width: '100%', background: 'var(--td-bg-color-container)' }}>
        <Header style={headerStyle}>
          <HeadMenu
            value="-"
            theme="light"
            logo={
              <strong
                style={{ fontSize: '20px', cursor: 'pointer' }}
                onClick={() => { window.location.href = '/'; }}
              >
                WinNew
              </strong>
            }
            style={contentWrapperStyle}
          >
            <div style={{ width: '100%' }}></div>
            {routers.map((item) => (
              <MenuItem key={item.path}>
                <Link to={item.path}>{item.word}</Link>
              </MenuItem>
            ))}
          </HeadMenu>
        </Header>
        <Content style={{ padding: '10px', marginTop: '4px' }}>
          <div style={contentWrapperStyle}>
            <PageRouter />
          </div>
        </Content>
        <Footer style={{ background: 'var(--td-bg-color-page)', textAlign: 'center' }}>
          <FooterContent />
        </Footer>
      </Layout>
    </Router>
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