/**
 * 工单齐套管理系统 - 页签管理器
 * 极简风格，支持多页签切换，所有页面共享同一页签栏
 */

const TabManager = {
    MAX_TABS: 10,
    STORAGE_KEY: 'kit_tabs',
    ACTIVE_KEY: 'kit_active_tab',

    // 屏幕名称映射
    SCREEN_MAP: {
        'index.html': '首页',
        'C1-config-rules.html': 'C1 齐套规则配置',
        'C2-priority.html': 'C2 优先级维护',
        'C3-responsible-party.html': 'C3 责任方配置',
        'M1-kit-details.html': 'M1 工单齐套明细',
        'M2-wo-details.html': 'M2 工单详情',
        'M3-material-details.html': 'M3 物料缺料汇总',
        'T1-po-report.html': 'T1 PO交期报表',
        'T2-pr-info.html': 'T2 PR信息表',
    },

    // 获取当前文件名
    getCurrentFileName() {
        return window.location.pathname.split('/').pop() || 'index.html';
    },

    // 获取当前屏幕标题
    getCurrentTitle() {
        return this.SCREEN_MAP[this.getCurrentFileName()] || this.getCurrentFileName();
    },

    // 获取当前页面相对路径
    getCurrentPath() {
        const filename = this.getCurrentFileName();
        return this.SCREEN_MAP[filename] ? filename : '';
    },

    // 获取页签列表
    getTabs() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    },

    // 保存页签列表
    saveTabs(tabs) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tabs));
    },

    // 获取当前活跃页签
    getCurrentTabId() {
        return sessionStorage.getItem(this.ACTIVE_KEY) || '';
    },

    // 设置当前活跃页签
    setCurrentTabId(id) {
        sessionStorage.setItem(this.ACTIVE_KEY, id);
    },

    // 根据文件名获取页签
    getTabByFile(filename) {
        return this.getTabs().find(t => t.file === filename);
    },

    // 打开页签
    openTab(title) {
        const filename = this.getCurrentFileName();
        const tabs = this.getTabs();

        // 检查是否已打开
        const existing = tabs.find(t => t.file === filename);
        if (existing) {
            this.setCurrentTabId(existing.id);
            this.render();
            return existing.id;
        }

        // 超过上限，关闭最早的页签
        if (tabs.length >= this.MAX_TABS) {
            tabs.shift();
        }

        const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        const tab = { id, file: filename, title: title || this.getCurrentTitle() };
        tabs.push(tab);
        this.saveTabs(tabs);
        this.setCurrentTabId(id);

        // 如果页签栏不存在，注入
        if (!document.querySelector('.tab-bar')) {
            this.injectTabBar();
        }
        this.render();
        return id;
    },

    // 关闭页签
    closeTab(id, e) {
        if (e) e.stopPropagation();
        let tabs = this.getTabs();
        const currentId = this.getCurrentTabId();
        const idx = tabs.findIndex(t => t.id === id);

        if (idx === -1) return;
        tabs.splice(idx, 1);
        this.saveTabs(tabs);

        // 如果关闭的是当前页签，切换到相邻页签
        if (currentId === id) {
            if (tabs.length > 0) {
                const newActive = tabs[Math.min(idx, tabs.length - 1)];
                this.setCurrentTabId(newActive.id);
                this.render();
                this.navigateTo(newActive);
            } else {
                this.setCurrentTabId('');
                this.render();
                window.location.href = '../../index.html';
            }
        } else {
            this.render();
        }
    },

    // 切换到页签
    switchTab(id) {
        const tabs = this.getTabs();
        const tab = tabs.find(t => t.id === id);
        if (tab) {
            this.setCurrentTabId(id);
            this.render();
            this.navigateTo(tab);
        }
    },

    // 跳转到页签对应页面
    navigateTo(tab) {
        const currentFile = this.getCurrentFileName();
        if (tab.file !== currentFile) {
            // 构建相对路径
            const path = this._resolvePath(tab.file);
            window.location.href = path;
        }
    },

    // 解析路径
    _resolvePath(targetFile) {
        const current = this.getCurrentFileName();
        if (targetFile === 'index.html' && current !== 'index.html') {
            return '../../index.html';
        }
        if (current === 'index.html' && targetFile !== 'index.html') {
            return 'src/pages/' + this._getPageDir(targetFile) + '/' + targetFile;
        }
        // 同目录
        if (this._getPageDir(current) === this._getPageDir(targetFile)) {
            return targetFile;
        }
        // 跨目录
        return '../' + this._getPageDir(targetFile) + '/' + targetFile;
    },

    _getPageDir(filename) {
        if (['C1-config-rules.html', 'C2-priority.html', 'C3-responsible-party.html'].includes(filename)) return 'config';
        if (['M1-kit-details.html', 'M2-wo-details.html', 'M3-material-details.html'].includes(filename)) return 'business';
        if (['T1-po-report.html', 'T2-pr-info.html'].includes(filename)) return 'supply';
        return '';
    },

    // 注入页签栏CSS
    injectTabBar() {
        const header = document.querySelector('.app-header');
        if (!header) return;

        const tabBar = document.createElement('div');
        tabBar.className = 'tab-bar';
        header.appendChild(tabBar);
    },

    // 渲染页签栏
    render() {
        const tabBar = document.querySelector('.tab-bar');
        if (!tabBar) return;

        const tabs = this.getTabs();
        const currentId = this.getCurrentTabId();

        tabBar.innerHTML = tabs.map(tab => {
            const isActive = tab.id === currentId;
            return `
                <div class="tab-item ${isActive ? 'active' : ''}" onclick="TabManager.switchTab('${tab.id}')">
                    <span class="tab-title">${tab.title}</span>
                    ${tabs.length > 1 ? `<span class="tab-close" onclick="TabManager.closeTab('${tab.id}', event)">×</span>` : ''}
                </div>
            `;
        }).join('');
    },

    // 初始化（页面加载时调用）
    init() {
        const title = this.getCurrentTitle();
        this.openTab(title);
    }
};

// 添加页签栏全局样式（所有页面共享）
(function() {
    const style = document.createElement('style');
    style.textContent = `
        .tab-bar {
            display: flex;
            align-items: center;
            gap: 4px;
            margin-left: 16px;
            overflow-x: auto;
            flex: 1;
            padding: 4px 0;
        }
        .tab-bar::-webkit-scrollbar { height: 0; }
        .tab-item {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 5px 12px;
            border-radius: 14px;
            font-size: 12px;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s;
            background: rgba(66, 133, 244, 0.08);
            color: #888;
            border: 1px solid transparent;
        }
        .tab-item:hover {
            background: rgba(66, 133, 244, 0.15);
            color: #4285f4;
        }
        .tab-item.active {
            background: #4285f4;
            color: #fff;
            border-color: #4285f4;
        }
        .tab-close {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            line-height: 1;
            opacity: 0.6;
            transition: all 0.15s;
            cursor: pointer;
        }
        .tab-close:hover {
            opacity: 1;
            background: rgba(0,0,0,0.15);
        }
        .tab-item.active .tab-close {
            opacity: 0.8;
        }
        .tab-item.active .tab-close:hover {
            opacity: 1;
            background: rgba(255,255,255,0.2);
        }
    `;
    document.head.appendChild(style);
})();