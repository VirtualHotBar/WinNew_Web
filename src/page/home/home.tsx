import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Collapse, Descriptions, Divider, Link, MessagePlugin, Row, Select, Space, Tag } from 'tdesign-react';
import DescriptionsItem from 'tdesign-react/es/descriptions/DescriptionsItem';
import { config } from '../../services/config';
import { VersionsOption, WinFileInfo, EditionAndLanguage } from '../../type/home';
import CollapsePanel from 'tdesign-react/es/collapse/CollapsePanel';

async function fetchWinInfos(systemCode: string, version: string = '', languageCode: string = '', edition: string = ''): Promise<WinFileInfo[]> {
  let url = config.apiHost + '/API/WinNew/getFileList.php?SystemCode=' + systemCode
  if (version != '') {
    url += '&Version=' + version
  } if (languageCode != '') {
    url += '&LanguageCode=' + languageCode
  } if (edition != '') {
    url += '&Edition=' + edition
  }

  const response = await fetch(url);
  return response.json()
}

async function copyToClip(content: string) {
  await navigator.clipboard.writeText(content)
  MessagePlugin.success('复制成功', 2 * 1000);
}

export function Home() {
  // 在这里可以定义状态或使用useEffect等React Hooks
  const [latestWinInfos, setLatestWinInfos] = useState(Array<WinFileInfo>);

  useEffect(() => {
    async function fetchData() {
      const latestInfos11 = await fetchWinInfos('11');
      const latestInfos10 = await fetchWinInfos('10');
      setLatestWinInfos([...latestInfos11, ...latestInfos10]);
    }
    if (latestWinInfos.length == 0) {
      fetchData();
    }
  }, []);

  return (
    <div >

      <div style={{ textAlign: 'center' }}>
        <br />
        <img src="/favicon.ico" width={'105px'} />
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.0rem', marginTop: '0.8rem' }}>WinNew</h1>
        <span style={{ color: 'var(--td-text-color-placeholder)', fontSize: '1.1rem' }}>从微软服务器获取最新的原版Windows镜像</span>
      </div>
      <Divider style={{ marginTop: '2.5rem' }} />
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.7rem' }}>最新</h2>
        <Row gutter={16}>
          {
            latestWinInfos.map((info: WinFileInfo, index) => {
              return (
                <Col style={{ width: '50%' }} key={index}>
                  <Card title={'Windows ' + info.SystemCode + ' ' + info.VerCode + ' 专业版'} /* subtitle={info.version} */ actions={<span style={{ color: 'var(--td-text-color-primary)' }}>{info.PushTime}</span>} bordered hoverShadow style={{}}
                    footer={
                      <Row align="middle" justify="center">
                        <Col flex="auto" >
                          <Button onClick={() => { window.open(info.FilePath, '_self') }}>立即下载</Button>
                        </Col>

                        <Col flex="auto">
                          <Button onClick={() => { copyToClip(info.FilePath) }}>复制直链</Button>
                        </Col>
                      </Row>
                    }>

                    <Row align="middle" justify="center">
                      <Col flex="auto" >
                        <span>内部版本<br /><strong>{info.BuildVer}</strong></span>
                      </Col>
                      <Col flex="auto" >
                        <span >大小<br /><strong>{(Number(info.Size) / 1024 / 1024 / 1024).toFixed(2)}GB</strong></span>
                      </Col>
                      <Col flex="auto" >
                        <span >语言<br /><strong>简体中文</strong></span>
                      </Col>
                      <Col flex="auto" >
                        <span >架构<br /><strong>{info.Architecture}</strong></span>
                      </Col>
                    </Row>
                    <br />
                    {/* <Divider /> */}
                    <span>SHA1<br /><strong>{info.Sha1}</strong></span>

                  </Card>
                </Col>
              )
            })
          }
        </Row>
      </div>
      <AllSystem />
      <Divider style={{ marginTop: '3rem' }} />
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.7rem' }}>补充</h2>
        <Collapse
          expandIcon
          expandIconPlacement="left"
          expandOnRowClick
          style={{ marginBottom: '3rem', textAlign: 'left' }}
        >
          <CollapsePanel header="微软官方页面" >
            <Link theme="primary" href='https://www.microsoft.com/zh-cn/software-download/windows11' target='_blank' >下载 Windows 11</Link>
            <br />
            <Link theme="primary" href='https://www.microsoft.com/zh-cn/software-download/windows10' target='_blank'>下载 Windows 10</Link>
          </CollapsePanel>
          <CollapsePanel header="第三方原版系统站点">
          <Link theme="primary" href='https://down.hotpe.top/OS/' target='_blank' >站长搜集的原版系统</Link>
            <br />
            <Link theme="primary" href='https://next.itellyou.cn/' target='_blank' >MSDN, 我告诉你</Link>
            <br />
            <Link theme="primary" href='https://uupdump.net/?lang=zh-cn' target='_blank' >UUP dump</Link>
            (<Link theme="primary" href='https://www.uupdump.cn/' target='_blank' >CN</Link>)
            <br />
            <Link theme="primary" href='https://massgrave.dev/genuine-installation-media' target='_blank' >MAS</Link>
            <br />
            <Link theme="primary" href='https://hellowindows.cn/' target='_blank' >HelloWindows</Link>
            <br />
            <Link theme="primary" href='https://msdn.sjjzm.com/' target='_blank' >山己几子木</Link>
            <br />
            <Link theme="primary" href='https://www.xitongku.com/' target='_blank' >系统库</Link>
            <br />
            注：以上站点不保证可用性、安全性、质量，请自行判断。
          </CollapsePanel>
          <CollapsePanel header="第三方修改版系统站点">
            <Link theme="primary" href='http://bbs.wuyou.net/forum.php?mod=forumdisplay&fid=90' target='_blank' >无忧启动</Link>
            <br />
            <Link theme="primary" href='https://www.puresys.net/%e7%b3%bb%e7%bb%9f%e4%b8%8b%e8%bd%bd' target='_blank' >Puresys</Link>
            <br />
            <Link theme="primary" href='https://www.newxitong.com/' target='_blank' >吻妻</Link>
            <br />
            <Link theme="primary" href='https://lvsexitong.com/' target='_blank' >绿色系统</Link>
            <br />
            <Link theme="primary" href='https://www.aichunjing.com/' target='_blank' >爱纯净</Link>
            <br />
            <Link theme="primary" href='https://www.winos.me/' target='_blank' >WINOS</Link>(下载需登录)
            <br />
            <Link theme="primary" href='https://www.pc528.net/' target='_blank' >不忘初心</Link>(下载需付费)
            <br />
            <Link theme="primary" href='https://yyczxt.com/' target='_blank' >又要重装</Link>(<Link theme="primary" href='https://www.ghxi.com/category/all/system' target='_blank' >by果核剥壳</Link>、有付费项)
            <br />
            注：以上站点不保证可用性、安全性、质量，请自行判断。
          </CollapsePanel>
        </Collapse>
      </div>
    </div>
  );
}







function AllSystem() {
  const defaultFileListContent = <><strong>请选择上面的筛选选项</strong></>

  const [versionsOption, setVersionsOption] = useState<VersionsOption>();
  const [editionAndLanguageOption, setEditionAndLanguageOption] = useState<EditionAndLanguage>();
  const [fileListContent, setFileListContent] = useState(defaultFileListContent);

  const [systemCode, setSystemCode] = useState('');
  const [version, setVersion] = useState('');
  const [language, setLanguage] = useState('');
  const [edition, setEdition] = useState('');

  async function fetchVersionOption(): Promise<VersionsOption> {
    const response = await fetch(config.apiHost + '/API/WinNew/getOption/version.php');
    return response.json()
  }

  async function fetchEditionAndLanguageOption(): Promise<EditionAndLanguage> {
    const response = await fetch(config.apiHost + '/API/WinNew/getOption/editionAndLanguage.php?SystemCode=' + systemCode + '&Version=' + version);
    return response.json()
  }

  useEffect(() => {
    async function fetchData() {
      setVersionsOption(await fetchVersionOption())
    }
    if (versionsOption == undefined) {
      fetchData();
    }


  }, []);

  //搜索逻辑
  useEffect(() => {
    let didCancel = false; // 取消标志

    async function fetchAndSetFileListContent() {
      if (systemCode != '' && version != '' && language != '' && edition != '') {
        let fetchedInfos = await fetchWinInfos(systemCode, version, language, edition);
        setFileListContent(<>
          {fetchedInfos.map((info: WinFileInfo, index) => {
            return (

              <Card
                key={index}
                title={'Windows ' + info.SystemCode + ' ' + info.VerCode + ' ' + (editionAndLanguageOption?.Edition.find(item => item.value === edition)?.label || '')}
                actions={<span style={{ color: 'var(--td-text-color-primary)' }}>{info.PushTime}</span>}
                bordered
                hoverShadow
                style={{ margin: '0 auto', maxWidth: '450px' }}
                footer={
                  <Row align="middle" justify="center">
                    <Col flex="auto" >
                      <Button onClick={() => { window.open(info.FilePath, '_self') }}>立即下载</Button>
                    </Col>

                    <Col flex="auto">
                      <Button onClick={() => { copyToClip(info.FilePath) }}>复制直链</Button>
                    </Col>
                  </Row>
                }>

                <Row align="middle" justify="center">
                  <Col flex="auto" >
                    <span>内部版本<br /><strong>{info.BuildVer}</strong></span>
                  </Col>
                  <Col flex="auto" >
                    <span >大小<br /><strong>{(Number(info.Size) / 1024 / 1024 / 1024).toFixed(2)}GB</strong></span>
                  </Col>
                  <Col flex="auto" >
                    <span >语言<br /><strong>{editionAndLanguageOption?.Language.find(item => item.value === language)?.label || ''}</strong></span>
                  </Col>
                  <Col flex="auto" >
                    <span >架构<br /><strong>{info.Architecture}</strong></span>
                  </Col>
                </Row>
                <br />
                {/* <Divider /> */}
                <span>SHA1<br /><strong>{info.Sha1}</strong></span>

              </Card>

            )
          })}</>);
      } else {
        setFileListContent(defaultFileListContent);
      }
    }

    if (systemCode || version || language || edition) {
      fetchAndSetFileListContent();
    }

    // 清理函数中取消后续的异步操作
    return () => {
      didCancel = true;
    };

  }, [systemCode, version, language, edition]);

  //请求语言和版本
  useEffect(() => {
    if (version != '') {
      (async () => {
        const fetchedData = await fetchEditionAndLanguageOption();
        setEditionAndLanguageOption(fetchedData);
      })();
    }
  }, [version]);

  return (
    <div>
      <Divider style={{ marginTop: '5.5rem' }} />
      <div style={{ textAlign: 'center', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.7rem' }}>所有</h2>
        <Space>
          <Select
            value={systemCode}
            prefixIcon={<>系统:</>}
            options={
              versionsOption?.SystemCodes
            }
            onChange={(value) => {
              if (value.toString() != systemCode) {
                setSystemCode(value.toString());
                setVersion('')
                setEditionAndLanguageOption({
                  Language: [],
                  Edition: []
                })
                setLanguage('')
              }
            }}
          ></Select>
          <Select
            prefixIcon={<>版本号:</>}
            value={version}
            options={versionsOption?.Versions[systemCode]}
            disabled={systemCode == ''}
            onChange={async (value) => {
              if (value.toString() != version) {
                setLanguage('');
                setEdition('');
                setVersion(value.toString());
              }
            }}
          ></Select>
          <Select
            value={language}
            prefixIcon={<>语言:</>}
            disabled={editionAndLanguageOption?.Language.length == 0 || systemCode == ''}
            options={editionAndLanguageOption?.Language}
            onChange={
              (value) => {
                if (value.toString() != language) {
                  setLanguage(value.toString());
                }
              }
            }

          ></Select>
          <Select
            value={edition}
            prefixIcon={<>版本:</>}
            disabled={editionAndLanguageOption?.Edition.length == 0 || systemCode == ''}
            options={editionAndLanguageOption?.Edition}
            onChange={
              (value) => {
                if (value.toString() != edition) {
                  setEdition(value.toString());
                }
              }
            }

          ></Select>
        </Space>

        <div style={{ marginTop: '3rem', marginBottom: '8rem' }}>
          {fileListContent}
        </div>

      </div>
    </div>
  )
}
