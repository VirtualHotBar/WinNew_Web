/**
 * ErrorBoundary Component
 * 错误边界组件
 */

import React, { Component, type ReactNode } from 'react';
import { Alert, Button } from 'tdesign-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Alert
            theme="error"
            title="组件加载失败"
            message={this.state.error?.message || '未知错误'}
            closeable={false}
          />
          <Button
            style={{ marginTop: '16px' }}
            onClick={this.handleReset}
          >
            重试
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
