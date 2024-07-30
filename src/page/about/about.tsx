import React from 'react'

export function About() {
  return (
    <div style={{marginTop:'5rem',textAlign:'center',marginBottom:'5rem'}}>
      <h1>关于</h1>
      <br />
      <p style={{}}>
      WinNew是一个获取原版Windows镜像的网站， 镜像来自于Windows更新服务器，提供直链下载。<strong>原汁原味，纯净无修改！</strong>
      <br />
      <br />
      
      <p>实现：定时获取<a className="class-link" rel="noopener"  target="_blank" href="https://go.microsoft.com/fwlink/?linkid=2156295">Windows媒体创建工具(Media Creation Tool)</a>的系统列表，所以与微软官方提供的<a className="class-link" rel="noopener"  target="_blank" href="https://www.microsoft.com/zh-cn/software-download/windows11">Windows11</a>/<a className="class-link" rel="noopener"  target="_blank" href="https://www.microsoft.com/zh-cn/software-download/windows10">10</a>下载页面获取到的镜像版本保持同步。</p>
      </p>

    </div>
  )
}