
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

//import { Home } from '../page/home/home';
/* import { About } from '../page/about/about'; */
//import NProgress from "nprogress";
//import "nprogress/nprogress.css";

//NProgress.start();

//import { Header_ } from '../layout/header';
import '../global/main.css'


const { Header, Content, Footer } = Layout;

const Home = () => <h2>首页</h2>;
const About = () => <h2>关于</h2>;
const Users = () => <h2></h2>;
const NoMatch = () => <h2>404 Not Found</h2>;



export function Layout_() {
  //const goTo = useNavigate();

  return (
    <Router>
      <Layout style={{ width: '100%',background: 'var(--td-bg-color-container)' }}>

        <Header style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)' }}><HeadMenu
          value={'-'}
          theme="light"
          logo={<strong style={{ fontSize: '20px' }}>WinNew</strong>}
          style={{
            maxWidth: '1300px',
            width: '100%',
            margin: '0 auto',
            justifyContent: 'center'
          }}
        >
          <div style={{ width: '100%' }}></div>
          <MenuItem >
            <Link to="/">首页</Link>
            <input type="checkbox" />
          </MenuItem>
          <MenuItem  >
            <Link to="/donation">捐赠</Link>
          </MenuItem>
          <MenuItem  >
            <Link to="/about">关于</Link>
          </MenuItem>
        </HeadMenu></Header>
        <Content style={{padding: '10px',marginTop: '4px'}}>
          <div style={
            {
             maxWidth: '1300px',
              width: '100%',
              margin: '0 auto',
              justifyContent: 'center',
             
            }
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/donation" element={<Users />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>

        </Content>


        <Footer style={{ width: '100%'  , background:'var(--td-bg-color-page)',textAlign: 'center' }}>Copyright @ 2023-Present StudyProject. All Rights Reserved</Footer>

      </Layout>
    </Router>


  )
}
