/**
 * SEO 管理 Hook
 * 动态更新页面 meta 标签、结构化数据，支持搜索引擎优化
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOConfig {
  title: string;
  description: string;
  url: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
}

export interface StructuredData {
  '@context': 'https://schema.org';
  '@type': 'WebSite' | 'WebPage' | 'Organization';
  name?: string;
  url?: string;
  description?: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

/**
 * SEO Hook - 自动管理页面的 meta 标签和结构化数据
 */
export function useSEO(config: SEOConfig) {
  useEffect(() => {
    // 更新页面标题
    document.title = config.title;

    // 更新标准 meta 标签
    updateMetaTag('name', 'description', config.description);
    updateMetaTag('name', 'keywords', config.keywords || config.title);

    // 更新 Open Graph 标签
    updateMetaTag('property', 'og:title', config.title);
    updateMetaTag('property', 'og:description', config.description);
    updateMetaTag('property', 'og:url', config.url);
    updateMetaTag('property', 'og:type', config.type || 'website');
    if (config.image) {
      updateMetaTag('property', 'og:image', config.image);
    }

    // 更新 Twitter Card 标签
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', config.title);
    updateMetaTag('name', 'twitter:description', config.description);
    if (config.image) {
      updateMetaTag('name', 'twitter:image', config.image);
    }

    // 更新结构化数据
    updateStructuredData(config);

    // 清理函数（可选：如果需要恢复默认 meta 标签）
    return () => {
      // 可以在这里恢复默认的 meta 标签
    };
  }, [config.title, config.description, config.url, config.keywords, config.image, config.type]);
}

/**
 * 更新或创建 meta 标签
 */
function updateMetaTag(
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string
) {
  const meta = document.querySelector(
    `meta[${attributeName}="${attributeValue}"]`
  );

  if (meta) {
    meta.setAttribute('content', content);
  } else {
    const newMeta = document.createElement('meta');
    newMeta.setAttribute(attributeName, attributeValue);
    newMeta.setAttribute('content', content);
    document.head.appendChild(newMeta);
  }
}

/**
 * 更新 JSON-LD 结构化数据
 */
function updateStructuredData(config: SEOConfig) {
  // 移除旧的结构化数据
  const oldScript = document.getElementById('structured-data');
  if (oldScript) {
    oldScript.remove();
  }

  // 创建新的结构化数据
  const structuredData: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WinNew',
    url: config.url,
    description: config.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${config.url}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const script = document.createElement('script');
  script.id = 'structured-data';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

/**
 * 路由级别的 SEO Hook
 * 根据当前路由自动应用对应的 SEO 配置
 */
export function useRouterSEO(pages: Record<string, SEOConfig>) {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.slice(1) || 'index';
    const config = pages[path];

    if (config) {
      // 使用内部的 SEO 更新逻辑
      document.title = config.title;
      updateMetaTag('name', 'description', config.description);
      updateMetaTag('property', 'og:title', config.title);
      updateMetaTag('property', 'og:description', config.description);
      updateMetaTag('property', 'og:url', config.url);
      updateMetaTag('name', 'twitter:title', config.title);
      updateMetaTag('name', 'twitter:description', config.description);
      updateStructuredData(config);
    }
  }, [location.pathname]);
}
