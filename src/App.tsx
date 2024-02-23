import React from "react";
import ReactDOM from 'react-dom/client';
import 'tdesign-react/es/style/index.css'; // 少量公共样式

import './global/main.css'
import './global/index'

import { Layout_ } from "./layout/layout";

// 在你的入口文件中渲染App组件
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><Layout_/></React.StrictMode>);