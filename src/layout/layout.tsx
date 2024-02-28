
import { useState, useEffect } from 'react'
import { Layout } from 'tdesign-react';
import 'tdesign-react/es/style/index.css'; // 少量公共样式

import { Menu, MessagePlugin, Button } from 'tdesign-react';
const { HeadMenu, MenuItem } = Menu;
import {
  BrowserRouter as Router,
  Routes, // 替代了Switch
  Route,
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import '../global/main.css'

import { Home } from '../page/home/home';
import { Donation } from '../page/donation/donation';
import { About } from '../page/about/about';
import { FooterContent } from '../layout/footer';

const { Header, Content, Footer } = Layout;

interface Routers {
  word: string;
  title: string;
  path: string;
  component: JSX.Element;
}



const routers: Array<Routers> = [
  {
    word: '首页',
    title: 'WinNew - 从微软服务器获取最新的Windows镜像',
    path: '/',
    component: <Home />,
  }, {
    word: '捐赠',
    title: 'WinNew - 捐赠',
    path: '/donation',
    component: <Donation />,
  }, {
    word: '关于',
    title: 'WinNew - 关于',
    path: '/about',
    component: <About />,
  },
]


export function Layout_() {



  const headerStyle = {
    boxShadow: '0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)',
  };

  const contentWrapperStyle = {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    justifyContent: 'center',
  };


  return (
    <Router>
      <Layout style={{ width: '100%', background: 'var(--td-bg-color-container)' }}>
        <Header style={headerStyle}><HeadMenu
          value={'-'}
          theme="light"
          logo={<strong style={{ fontSize: '20px' }} onClick={() => { window.location.href = '/' }} >WinNew</strong>}
          style={{
            ...contentWrapperStyle,
            justifyContent: 'center'
          }}
        >
          <div style={{ width: '100%' }}></div>
          {routers.map((item) => (
            <MenuItem key={item.path}>
              <Link to={item.path}>{item.word}</Link>
            </MenuItem>
          ))}
        </HeadMenu></Header>
        <Content style={{ padding: '10px', marginTop: '4px' }}>
          <div style={
            contentWrapperStyle
          }>

            <PageRouter></PageRouter>

          </div>

        </Content>


        <Footer style={{  background: 'var(--td-bg-color-page)', textAlign: 'center' }}>
          <FooterContent></FooterContent>
        </Footer>

      </Layout>
    </Router>


  )
}

function PageRouter() {
  const location = useLocation();

  useEffect(() => {
    routers.forEach((item) => {
      if (location.pathname === item.path) {
        document.title = item.title;
      }
    });
  }, [location]);

  return (
    <Routes>
      {
        routers.map((item) => {
          return <Route path={item.path} key={item.path} element={item.component} />
        })
      }
    </Routes>
  )
}