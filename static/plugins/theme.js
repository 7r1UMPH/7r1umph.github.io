document.addEventListener('DOMContentLoaded', () => {
    const styleConfig = { // 添加对象定义的变量名
        common: { // 添加 "common" 属性以包含通用样式
            '.avatar': `
                width: 200px;
                height: 200px;
            `,
            '#header h1 a': `
                margin-top: 30px;
                font-family: fantasy;
                margin-left: unset;
            `
        },
        article: {
            '.markdown-body img': `
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.78);
            `,
            '.markdown-alert': `
                border-radius: 8px;
            `,
            '.markdown-body pre': `
                background-color: rgba(243, 244, 243, 0.967);
                box-shadow: 0 10px 30px 0 rgba(222, 217, 217, 0.4);
                padding-top: 20px;
                border-radius: 8px;
            `,
            '.markdown-body code, .markdown-body tt': `
                background-color: #c9daf8;
            `,
            '.markdown-body h1': `
                display: inline-block;
                font-size: 1.3rem;
                background: rgb(239, 112, 96);
                color: #ffffff;
                padding: 3px 10px;
                border-radius: 8px;
                margin: 1.8rem 2px 0 0;
            `
        }
    }; // 添加右括号以闭合 styleConfig 对象

    // 样式生成器
    const generateCSS = (styles) => {
        return Object.entries(styles).map(([selector, rules]) => {
            return `${selector} { ${rules} }`;
        }).join('\n');
    };

    // 页面类型检测
    const getPageType = () => {
        if (currentPath === '/' || currentPath === '/index.html') return 'home';
        if (/\/post\/|link\.html|about\.html|\/page\d+\.html$/.test(currentPath)) return 'article'; // 修正正则表达式语法错误
        return null;
    };

    // 样式应用
    const applyStyles = () => {
        const pageType = getPageType();
        if (!pageType) return;

        const styles = [
            generateCSS(styleConfig.common),
            generateCSS(styleConfig[pageType])
        ];

        // 首页特殊处理
        if (pageType === 'home') {
            styles.push(`body { overflow: auto; }`);
        }

        // 创建样式标签
        const styleTag = document.createElement('style');
        styleTag.textContent = styles.join('\n');
        document.head.appendChild(styleTag);
    };

    // 背景设置
    const setBackground = () => {
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                html {
                    background: url('https://cdn.jsdelivr.net/gh/7r1UMPH/7r1UMPH.github.io@main/static/image/20250320210716585.webp')
                        no-repeat center center fixed;
                    background-size: cover;
                }
            </style>
        `);
    };

    // 执行逻辑
    applyStyles();
    setBackground();
});
