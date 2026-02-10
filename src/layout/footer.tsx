import React from 'react';

const friendLinks = [
  { label: 'VirtualHotBar', href: 'https://blog.hotpe.top/' },
  { label: 'HotPE工具箱', href: 'https://www.hotpe.top/' },
  { label: 'SysRi', href: 'https://sysri.cn/' },
  { label: 'NetMount', href: 'https://www.netmount.cn/' },
  { label: 'HotPan', href: 'https://pan.hotpe.top/' },
];

export const FooterContent: React.FC = () => {
  return (
    <div className="footer-content panel">
      <div className="friend-links">
        <p><strong>友 情 链 接</strong></p>
        <p>
          {friendLinks.map((item, index) => (
            <React.Fragment key={item.href}>
              <a href={item.href} target="_blank" className="class-link" rel="noopener noreferrer">
                {item.label}
              </a>
              {index < friendLinks.length - 1 && ' | '}
            </React.Fragment>
          ))}
        </p>
      </div>

      <div className="copyright">
        © 2019-Present
        {' '}
        <a href="https://blog.hotpe.top/" target="_blank" className="class-link" rel="noopener noreferrer">
          VirtualHotBar
        </a>
      </div>
    </div>
  );
};
