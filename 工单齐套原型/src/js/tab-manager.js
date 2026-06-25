/**
 * 工单齐套管理系统 - 页签管理器
 * 极简风格，支持多页签切换，所有页面共享同一页签栏
 * 新增：全局导航页签（记录已访问页面，支持快捷跳转）
 */

const TabManager = {
    MAX_TABS: 10,
    STORAGE_KEY: 'kit_tabs',
    ACTIVE_KEY: 'kit_active_tab',
    NAV_KEY: 'kit_nav_tabs',

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

    // 所有可跳转的页面列表
    ALL_PAGES: [
        { file: 'index.html', title: '首页', icon: '\u{1F3E0}' },
        { file: 'C1-config-rules.html', title: 'C1 齐套规则配置', icon: '\u{1F4CB}', dir: 'config' },
        { file: 'C2-priority.html', title: 'C2 优先级维护', icon: '\u{1F522}', dir: 'config' },
        { file: 'C3-responsible-party.html', title: 'C3 责任方配置', icon: '\u{1F465}', dir: 'config' },
        { file: 'M1-kit-details.html', title: 'M1 工单齐套明细', icon: '\u{1F4CA}', dir: 'business' },
        { file: 'M2-wo-details.html', title: 'M2 工单详情', icon: '\u{1F4C4}', dir: 'business' },
        { file: 'M3-material-details.html', title: 'M3 物料缺料汇总', icon: '\u{1F50D}', dir: 'business' },
        { file: 'T1-po-report.html', title: 'T1 PO交期报表', icon: '\u{1F4C4}', dir: 'supply' },
        { file: 'T2-pr-info.html', title: 'T2 PR信息表', icon: '\u{1F4CB}', dir: 'supply' },
    ],

    // ========== 基础方法 ==========

    getCurrentFileName() {
        return window.location.pathname.split('/').pop() || 'index.html';
    },

    getCurrentTitle() {
        return this.SCREEN_MAP[this.getCurrentFileName()] || this.getCurrentFileName();
    },

    getCurrentPath() {
        const filename = this.getCurrentFileName();
        return this.SCREEN_MAP[filename] ? filename : '';
    },

    _getPageDir(filename) {
        if (['C1-config-rules.html', 'C2-priority.html', 'C3-responsible-party.html'].includes(filename)) return 'config';
        if (['M1-kit-details.html', 'M2-wo-details.html', 'M3-material-details.html'].includes(filename)) return 'business';
        if (['T1-po-report.html', 'T2-pr-info.html'].includes(filename)) return 'supply';
        return '';
    },

    // ========== 全局导航页签功能 ==========

    getNavTabs() {
        try {
            const data = localStorage.getItem(this.NAV_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    },

    saveNavTabs(tabs) {
        localStorage.setItem(this.NAV_KEY, JSON.stringify(tabs));
    },

    markVisited() {
        var filename = this.getCurrentFileName();
        var navTabs = this.getNavTabs();
        var existingIdx = navTabs.findIndex(function(t) { return t.file === filename; });

        if (existingIdx === -1) {
            var pageInfo = this.ALL_PAGES.find(function(p) { return p.file === filename; });
            if (pageInfo) {
                navTabs.push({
                    file: pageInfo.file,
                    title: pageInfo.title,
                    icon: pageInfo.icon,
                    dir: pageInfo.dir || ''
                });
                this.saveNavTabs(navTabs);
            }
        }

        this.renderNavTabs();
    },

    removeNavTab(file, e) {
        if (e) e.stopPropagation();
        var navTabs = this.getNavTabs();
        navTabs = navTabs.filter(function(t) { return t.file !== file; });
        this.saveNavTabs(navTabs);
        this.renderNavTabs();
    },

    navigateToPage(file) {
        var currentFile = this.getCurrentFileName();
        if (file !== currentFile) {
            var path = this._resolveNavPath(file);
            window.location.href = path;
        }
    },

    _resolveNavPath(targetFile) {
        var current = this.getCurrentFileName();
        if (targetFile === 'index.html' && current !== 'index.html') {
            return '../../index.html';
        }
        if (current === 'index.html' && targetFile !== 'index.html') {
            var pageInfo = this.ALL_PAGES.find(function(p) { return p.file === targetFile; });
            return pageInfo ? 'src/pages/' + pageInfo.dir + '/' + targetFile : targetFile;
        }
        var currentDir = this._getPageDir(current);
        var targetDir = this._getPageDir(targetFile);
        if (currentDir === targetDir) {
            return targetFile;
        }
        return '../' + targetDir + '/' + targetFile;
    },

    renderNavTabs() {
        var self = this;
        // 移除旧的导航栏
        var old = document.querySelector('.global-nav-bar');
        if (old) old.remove();

        var navTabs = this.getNavTabs();
        if (navTabs.length === 0) return;

        var currentFile = this.getCurrentFileName();

        var nav = document.createElement('div');
        nav.className = 'global-nav-bar';
        nav.innerHTML = '<div class="global-nav-tabs">' +
            navTabs.map(function(tab) {
                var isActive = tab.file === currentFile;
                return '<div class="nav-tab ' + (isActive ? 'nav-tab-active' : '') + '" onclick="TabManager.navigateToPage(\'' + tab.file + '\")">' +
                    '<span class="nav-tab-icon">' + tab.icon + '</span>' +
                    '<span class="nav-tab-title">' + tab.title + '</span>' +
                    (navTabs.length > 1 ? '<span class="nav-tab-close" onclick="TabManager.removeNavTab(\'' + tab.file + '\', event)">&times;</span>' : '') +
                '</div>';
            }).join('') +
        '</div>';

        // 插入到 stat-bar 之前
        var container = document.querySelector('.page-container');
        if (container) {
            var statBar = container.querySelector('.stat-bar');
            var toolbar = container.querySelector('.unified-toolbar');
            if (statBar) {
                container.insertBefore(nav, statBar);
            } else if (toolbar) {
                container.insertBefore(nav, toolbar);
            } else {
                container.insertBefore(nav, container.firstChild);
            }
        }

        // 注入样式
        var styleEl = document.getElementById('global-nav-style');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'global-nav-style';
            document.head.appendChild(styleEl);
        }
        styleEl.textContent =
            '.global-nav-bar{width:100%;overflow-x:auto;overflow-y:hidden;background:linear-gradient(135deg,#f8f9ff 0%,#eef2ff 100%);border-bottom:1px solid #e0e6ff;padding:0 16px}' +
            '.global-nav-tabs{display:flex;align-items:center;gap:4px;padding:6px 0;white-space:nowrap}' +
            '.global-nav-bar::-webkit-scrollbar{height:0}' +
            '.nav-tab{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:6px;font-size:12px;cursor:pointer;transition:all .2s;background:rgba(255,255,255,.7);color:#666;border:1px solid #e8e8e8;margin-right:2px;flex-shrink:0}' +
            '.nav-tab:hover{background:#fff;color:#4285f4;border-color:#c8d8ff;box-shadow:0 1px 3px rgba(66,133,244,.1)}' +
            '.nav-tab-active{background:linear-gradient(135deg,#4285f4,#667eea)!important;color:#fff!important;border-color:#4285f4!important;box-shadow:0 2px 6px rgba(66,133,244,.3)!important}' +
            '.nav-tab-icon{font-size:13px;line-height:1}' +
            '.nav-tab-title{font-weight:500}' +
            '.nav-tab-close{width:15px;height:15px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:12px;line-height:1;opacity:.5;transition:all .15s;margin-left:2px}' +
            '.nav-tab-close:hover{opacity:1;background:rgba(0,0,0,.12)}' +
            '.nav-tab-active .nav-tab-close{opacity:.7;color:#fff}' +
            '.nav-tab-active .nav-tab-close:hover{opacity:1;background:rgba(255,255,255,.25)}';
    },

    // ========== 原有页签功能 ==========

    getTabs() {
        try {
            var data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    },

    saveTabs(tabs) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tabs));
    },

    getCurrentTabId() {
        return sessionStorage.getItem(this.ACTIVE_KEY) || '';
    },

    setCurrentTabId(id) {
        sessionStorage.setItem(this.ACTIVE_KEY, id);
    },

    getTabByFile(filename) {
        return this.getTabs().find(function(t) { return t.file === filename; });
    },

    openTab(title) {
        var filename = this.getCurrentFileName();
        var tabs = this.getTabs();
        var existing = tabs.find(function(t) { return t.file === filename; });
        if (existing) {
            this.setCurrentTabId(existing.id);
            this.render();
            return existing.id;
        }
        if (tabs.length >= this.MAX_TABS) {
            tabs.shift();
        }
        var id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        var tab = { id: id, file: filename, title: title || this.getCurrentTitle() };
        tabs.push(tab);
        this.saveTabs(tabs);
        this.setCurrentTabId(id);
        if (!document.querySelector('.tab-bar')) {
            this.injectTabBar();
        }
        this.render();
        return id;
    },

    closeTab(id, e) {
        if (e) e.stopPropagation();
        var tabs = this.getTabs();
        var currentId = this.getCurrentTabId();
        var idx = tabs.findIndex(function(t) { return t.id === id; });
        if (idx === -1) return;
        tabs.splice(idx, 1);
        this.saveTabs(tabs);
        if (currentId === id) {
            if (tabs.length > 0) {
                var newActive = tabs[Math.min(idx, tabs.length - 1)];
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

    switchTab(id) {
        var tabs = this.getTabs();
        var tab = tabs.find(function(t) { return t.id === id; });
        if (tab) {
            this.setCurrentTabId(id);
            this.render();
            this.navigateTo(tab);
        }
    },

    navigateTo(tab) {
        var currentFile = this.getCurrentFileName();
        if (tab.file !== currentFile) {
            var path = this._resolvePath(tab.file);
            window.location.href = path;
        }
    },

    _resolvePath(targetFile) {
        var current = this.getCurrentFileName();
        if (targetFile === 'index.html' && current !== 'index.html') {
            return '../../index.html';
        }
        if (current === 'index.html' && targetFile !== 'index.html') {
            return 'src/pages/' + this._getPageDir(targetFile) + '/' + targetFile;
        }
        if (this._getPageDir(current) === this._getPageDir(targetFile)) {
            return targetFile;
        }
        return '../' + this._getPageDir(targetFile) + '/' + targetFile;
    },

    injectTabBar() {
        var header = document.querySelector('.app-header');
        if (!header) return;
        var tabBar = document.createElement('div');
        tabBar.className = 'tab-bar';
        header.appendChild(tabBar);
    },

    render() {
        var tabBar = document.querySelector('.tab-bar');
        if (!tabBar) return;
        var tabs = this.getTabs();
        var currentId = this.getCurrentTabId();
        tabBar.innerHTML = tabs.map(function(tab) {
            var isActive = tab.id === currentId;
            return '<div class="tab-item ' + (isActive ? 'active' : '') + '" onclick="TabManager.switchTab(\'' + tab.id + '\")">' +
                '<span class="tab-title">' + tab.title + '</span>' +
                (tabs.length > 1 ? '<span class="tab-close" onclick="TabManager.closeTab(\'' + tab.id + '\', event)">&times;</span>' : '') +
            '</div>';
        }).join('');
    },

    // 初始化（页面加载时调用）
    init() {
        var title = this.getCurrentTitle();
        this.markVisited();
        this.openTab(title);
    }
};

// 添加页签栏全局样式（所有页面共享）
(function() {
    var style = document.createElement('style');
    style.textContent =
        '.tab-bar{display:flex;align-items:center;gap:4px;margin-left:16px;overflow-x:auto;flex:1;padding:4px 0}' +
        '.tab-bar::-webkit-scrollbar{height:0}' +
        '.tab-item{display:flex;align-items:center;gap:6px;padding:5px 12px;border-radius:14px;font-size:12px;cursor:pointer;white-space:nowrap;transition:all .2s;background:rgba(66,133,244,.08);color:#888;border:1px solid transparent}' +
        '.tab-item:hover{background:rgba(66,133,244,.15);color:#4285f4}' +
        '.tab-item.active{background:#4285f4;color:#fff;border-color:#4285f4}' +
        '.tab-close{width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;line-height:1;opacity:.6;transition:all .15s;cursor:pointer}' +
        '.tab-close:hover{opacity:1;background:rgba(0,0,0,.15)}' +
        '.tab-item.active .tab-close{opacity:.8}' +
        '.tab-item.active .tab-close:hover{opacity:1;background:rgba(255,255,255,.2)}';
    document.head.appendChild(style);
})();