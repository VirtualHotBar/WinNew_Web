document.documentElement.removeAttribute('theme-mode');
//设置颜色模式
/*   function matchMode() {
    // detect if on dark mode
    var isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const body = document.body;
    if (isDarkMode) {
      if (!body.hasAttribute('theme-mode')) {
        // 设置暗色模式
        document.documentElement.setAttribute('theme-mode', 'dark');
      }
    }
    else {
      // 重置为浅色模式
      document.documentElement.removeAttribute('theme-mode');
    }
  }

  matchMode()

  //监听颜色模式
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  mql.addListener(matchMode);  */