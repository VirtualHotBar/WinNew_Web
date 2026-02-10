/**
 * Layout Types
 */

import type { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export interface HeaderProps {
  title?: string;
}

export interface RouterItem {
  word: string;
  title: string;
  path: string;
  component: JSX.Element;
}
