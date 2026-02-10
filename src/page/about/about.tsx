import React from 'react';

export function About() {
  return (
    <section className="about-page panel">
      <h1>关于</h1>
      <p>
        WinNew 是一个获取原版 Windows 镜像的网站，镜像来自 Windows 更新服务器，提供直链下载。
        <strong> 原汁原味，纯净无修改。</strong>
      </p>
      <p>
        实现方式：定时获取
        {' '}
        <a className="class-link" rel="noopener noreferrer" target="_blank" href="https://go.microsoft.com/fwlink/?linkid=2156295">
          Windows 媒体创建工具（Media Creation Tool）
        </a>
        {' '}
        的系统列表，所以与微软官方
        {' '}
        <a className="class-link" rel="noopener noreferrer" target="_blank" href="https://www.microsoft.com/zh-cn/software-download/windows11">
          Windows 11
        </a>
        {' / '}
        <a className="class-link" rel="noopener noreferrer" target="_blank" href="https://www.microsoft.com/zh-cn/software-download/windows10">
          Windows 10
        </a>
        {' '}
        下载页面获取到的镜像版本保持同步。
      </p>
    </section>
  );
}
