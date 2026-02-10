/**
 * FileCard Component
 * 可复用的文件卡片组件
 */

import React, { useMemo } from 'react';
import { Card, Button, Row, Col } from 'tdesign-react';
import { formatFileSize } from '../utils/format';
import type { WinFileInfo } from '../types/api';

interface FileCardProps {
  info: WinFileInfo;
  editionLabel?: string;
  languageLabel?: string;
  showTitle?: boolean;
  onDownload: (url: string) => void;
  onCopy: (url: string) => void;
}

/**
 * 文件卡片组件
 */
export const FileCard: React.FC<FileCardProps> = ({
  info,
  editionLabel,
  languageLabel,
  showTitle = true,
  onDownload,
  onCopy,
}) => {
  const title = useMemo(() => {
    if (!showTitle) return undefined;
    return `Windows ${info.SystemCode} ${info.VerCode} ${editionLabel || info.Edition}`;
  }, [info, editionLabel, showTitle]);

  return (
    <Card
      title={title}
      actions={<span style={{ color: 'var(--td-text-color-primary)' }}>{info.PushTime}</span>}
      bordered
      hoverShadow
      footer={
        <Row align="middle" justify="center">
          <Col flex="auto">
            <Button onClick={() => onDownload(info.FilePath)}>立即下载</Button>
          </Col>
          <Col flex="auto">
            <Button onClick={() => onCopy(info.FilePath)}>复制直链</Button>
          </Col>
        </Row>
      }
    >
      <Row align="middle" justify="center">
        <Col flex="auto">
          <span>
            内部版本<br /><strong>{info.BuildVer}</strong>
          </span>
        </Col>
        <Col flex="auto">
          <span>
            大小<br /><strong>{formatFileSize(info.Size)}</strong>
          </span>
        </Col>
        <Col flex="auto">
          <span>
            语言<br /><strong>{languageLabel || info.Language}</strong>
          </span>
        </Col>
        <Col flex="auto">
          <span>
            架构<br /><strong>{info.Architecture}</strong>
          </span>
        </Col>
      </Row>
      <br />
      <span>
        SHA1<br /><strong>{info.Sha1}</strong>
      </span>
    </Card>
  );
};

export default FileCard;
