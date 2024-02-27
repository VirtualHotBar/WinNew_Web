import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Descriptions, Divider, Row, Tag } from 'tdesign-react';
import DescriptionsItem from 'tdesign-react/es/descriptions/DescriptionsItem';


interface LatestInfo {
  title: string;
  version: string;
  buildCode: string;
  date: string;
  size: string;
  url: string;
  edition: string
}

async function fetchLatestWinInfos(systemCode: string): Promise<LatestInfo[]> {
  const response = await fetch('https://api.hotpe.top/API/Microsoft/Windows/getFileList.php?SystemCode=' + systemCode);
  const data = await response.json();
  return data.map((item: any) => ({
    title: 'Windows '+systemCode,
    version: item.VerCode,
    buildCode: item.BuildVer,
    date: item.PushTime,
    size: item.Size,
    url: item.FilePath,
    edition: item.Edition || item.Edition_Loc,
  }));
}
let saveLatestWinInfos

export function Home() {
  // 在这里可以定义状态或使用useEffect等React Hooks
  const [latestWinInfos, setLatestWinInfos] = useState(Array<LatestInfo>);

  useEffect(() => {

    async function fetchData() {
      const latestInfos11 = await fetchLatestWinInfos('11');
      const latestInfos10 = await fetchLatestWinInfos('10');
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
        <span style={{ color: 'var(--td-text-color-placeholder)', fontSize: '1.1rem' }}>获取最新的Windows镜像</span>
      </div>
      <Divider style={{ marginTop: '2.5rem' }} />
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.7rem' }}>最新</h2>
        <Row gutter={16}>
          {
            latestWinInfos.map((info: LatestInfo, index) => {
              return (
                <Col style={{ width: '50%' }} key={index}>
                  <Card title={info.title + ' ' + info.version} /* subtitle={info.version} */ actions={<span style={{ color: 'var(--td-text-color-primary)' }}>{info.date}</span>} bordered hoverShadow style={{}}>
                    {/*                     <div style={{ display: 'flex'}}>
                      <span style={{ }}>内部版本:{info.buildCode}</span>
                      
                    </div> */}
                    <Button onClick={() => { window.open(info.url, '_self') }}>下载</Button>
                  </Card>
                </Col>
              )
            })
          }
        </Row>







      </div>
    </div>
  );
}