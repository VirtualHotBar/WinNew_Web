
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
  useNavigate
} from "react-router-dom";

import '../global/main.css'

import { Home } from '../page/home/home';
import { Donation } from '../page/donation/donation';
import { About } from '../page/about/about';
import { FooterContent } from '../layout/footer';

const { Header, Content, Footer } = Layout;

interface Routers{
  title: string;
  path: string;
  component: JSX.Element;
}



const routers:Array<Routers> = [
  {
    title: 'WinNew - 获取Winows最新版本',
    path: '/',
    component: <Home />,
  },  {
    title: 'WinNew - 捐赠',
    path: '/donation',
    component: <Donation />,
  },  {
    title: 'WinNew - 关于',
    path: '/about',
    component:<About />,
  },
]

// 封装一层 专门负责显示页面标题
const DomTitle = ({item}: { item: Routers }) => {
  document.title = item.title;
  return item.component 
}

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

          <MenuItem  >
            <Link to="/">首页</Link>
          </MenuItem>
          <MenuItem  >
            <Link to="/donation">捐赠</Link>
          </MenuItem>
          <MenuItem  >
            <Link to="/about">关于</Link>
          </MenuItem>
        </HeadMenu></Header>
        <Content style={{ padding: '10px', marginTop: '4px' }}>
          <div style={
            contentWrapperStyle
          }>

            <Routes>
            {
              routers.map((item) => {
                return <Route path={item.path} key={item.path} element={<DomTitle item={item} />} />
              })
            }
            </Routes>
          </div>

        </Content>


        <Footer style={{ width: '100%', background: 'var(--td-bg-color-page)', textAlign: 'center' }}>
        <FooterContent></FooterContent>
        </Footer>

      </Layout>
    </Router>


  )
}
