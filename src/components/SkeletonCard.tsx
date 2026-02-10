/**
 * SkeletonCard Component
 * 文件卡片骨架屏
 */

import React from 'react';
import { Card, Skeleton, Row, Col } from 'tdesign-react';

export const SkeletonCard: React.FC = () => {
  return (
    <Card bordered>
      <Skeleton animation="gradient" theme="text" />
      <div style={{ marginTop: '16px' }}>
        <Row gutter={16}>
          <Col flex="auto">
            <Skeleton animation="gradient" theme="text" style={{ height: '40px' }} />
          </Col>
          <Col flex="auto">
            <Skeleton animation="gradient" theme="text" style={{ height: '40px' }} />
          </Col>
          <Col flex="auto">
            <Skeleton animation="gradient" theme="text" style={{ height: '40px' }} />
          </Col>
          <Col flex="auto">
            <Skeleton animation="gradient" theme="text" style={{ height: '40px' }} />
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: '16px' }}>
        <Skeleton animation="gradient" theme="text" style={{ height: '60px' }} />
      </div>
    </Card>
  );
};

export default SkeletonCard;
