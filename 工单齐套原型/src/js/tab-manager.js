/**
 * 工单齐套管理系统 - 页签管理器
 * 功能：
 *   1. 大标题栏页签 - 记录已打开的页面，支持切换和关闭
 *   2. 固定的首页页签 - 始终显示在第一个位置，点击返回index.html
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

    _getPageDir(filename) {
        if (['C1-config-rules.html', 'C2-priority.html', 'C3-responsible-party.html'].indexOf(filename) >= 0) return 'config';
        if (['M1-kit-details.html', 'M2-wo-details.html', 'M3-material-details.html'].indexOf(filename) >= 0) return 'business';
        if (['T1-po-report.html', 'T2-pr-info.html'].indexOf(filename) >= 0) return 'supply';
        return '';
    },

    // ========== 路径解析 ==========

    _resolvePath(targetFile) {
        var current = this.getCurrentFileName();
        if (targetFile === 'index.html' && current !== 'index.html') {
            return '../../../index.html';
        }
        if (current === 'index.html' && targetFile !== 'index.html') {
            var pageInfo = this.ALL_PAGES.filter(function(p) { return p.file === targetFile; })[0];
            return pageInfo ? 'src/pages/' + pageInfo.dir + '/' + targetFile : targetFile;
        }
        var currentDir = this._getPageDir(current);
        var targetDir = this._getPageDir(targetFile);
        if (currentDir === targetDir) {
            return targetFile;
        }
        return '../' + targetDir + '/' + targetFile;
    },

    // ========== 大标题栏页签功能（历史记录） ==========

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

    openTab(title) {
        var self = this;
        var filename = this.getCurrentFileName();
        var tabs = this.getTabs();
        var existing = tabs.filter(function(t) { return t.file === filename; })[0];
        if (existing) {
            this.setCurrentTabId(existing.id);
            this.renderTabBar();
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
        this.renderTabBar();
        return id;
    },

    // 通过页签文件名直接打开并跳转页面
    openTabByFile(file) {
        var title = this.SCREEN_MAP[file] || file;
        var tabs = this.getTabs();
        var existing = tabs.filter(function(t) { return t.file === file; })[0];
        if (existing) {
            // 已存在该页签，直接切换
            this.setCurrentTabId(existing.id);
            this.renderTabBar();
            window.location.href = this._resolvePath(file);
            return;
        }
        // 不存在则新建页签并跳转
        if (tabs.length >= this.MAX_TABS) {
            tabs.shift();
        }
        var id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        var tab = { id: id, file: file, title: title };
        tabs.push(tab);
        this.saveTabs(tabs);
        this.setCurrentTabId(id);
        if (!document.querySelector('.tab-bar')) {
            this.injectTabBar();
        }
        this.renderTabBar();
        window.location.href = this._resolvePath(file);
    },

    closeTab(id, e) {
        if (e) e.stopPropagation();
        var tabs = this.getTabs();
        var currentId = this.getCurrentTabId();
        var idx = -1;
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].id === id) { idx = i; break; }
        }
        if (idx === -1) return;
        tabs.splice(idx, 1);
        this.saveTabs(tabs);
        if (currentId === id) {
            if (tabs.length > 0) {
                var newActive = tabs[Math.min(idx, tabs.length - 1)];
                this.setCurrentTabId(newActive.id);
                this.renderTabBar();
                window.location.href = this._resolvePath(newActive.file);
            } else {
                this.setCurrentTabId('');
                this.renderTabBar();
                window.location.href = '../../../index.html';
            }
        } else {
            this.renderTabBar();
        }
    },

    switchTab(id) {
        var tabs = this.getTabs();
        var tab = tabs.filter(function(t) { return t.id === id; })[0];
        if (tab) {
            this.setCurrentTabId(id);
            this.renderTabBar();
            var targetUrl = this._resolvePath(tab.file);
            console.log('[TabManager] switchTab: ' + tab.file + ' -> ' + targetUrl);
            window.location.href = targetUrl;
        } else {
            console.warn('[TabManager] switchTab: tab not found for id=' + id);
        }
    },

    injectTabBar() {
        var header = document.querySelector('.app-header');
        if (!header) return;
        var tabBar = document.createElement('div');
        tabBar.className = 'tab-bar';
        header.appendChild(tabBar);
    },

    renderTabBar() {
        var tabBar = document.querySelector('.tab-bar');
        if (!tabBar) return;
        var tabs = this.getTabs();
        var currentId = this.getCurrentTabId();
        var currentFile = this.getCurrentFileName();
        var self = this;
        tabBar.innerHTML = '';

        // ===== 固定的首页页签（始终第一个） =====
        var homeEl = document.createElement('div');
        var isOnHome = (currentFile === 'index.html');
        homeEl.className = 'tab-item' + (isOnHome ? ' active' : '');
        homeEl.setAttribute('data-tab-id', 'home');

        var homeTitle = document.createElement('span');
        homeTitle.className = 'tab-title';
        homeTitle.textContent = '\ud83c\udfe0 首页';
        homeEl.appendChild(homeTitle);

        homeEl.addEventListener('click', function() {
            window.location.href = '../../../index.html';
        });

        tabBar.appendChild(homeEl);

        // ===== 已打开的页签（跳过首页，因为已有固定首页页签） =====
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if (tab.file === 'index.html') continue;

            var isActive = tab.id === currentId;
            var tabEl = document.createElement('div');
            tabEl.className = 'tab-item' + (isActive ? ' active' : '');
            tabEl.setAttribute('data-tab-id', tab.id);

            var titleSpan = document.createElement('span');
            titleSpan.className = 'tab-title';
            titleSpan.textContent = tab.title;
            tabEl.appendChild(titleSpan);

            // 关闭按钮
            var closeSpan = document.createElement('span');
            closeSpan.className = 'tab-close';
            closeSpan.textContent = '\u00d7';
            (function(tabId, el) {
                el.addEventListener('click', function(e) {
                    e.stopPropagation();
                    self.closeTab(tabId, e);
                });
            })(tab.id, closeSpan);
            tabEl.appendChild(closeSpan);

            // 点击切换
            (function(tabId) {
                tabEl.addEventListener('click', function() {
                    self.switchTab(tabId);
                });
            })(tab.id);

            tabBar.appendChild(tabEl);
        }
    },

    // ========== 全局导航页签（替换面包屑区域） ==========

    navigateToPage(file) {
        var currentFile = this.getCurrentFileName();
        if (file !== currentFile) {
            window.location.href = this._resolvePath(file);
        }
    },

    renderNavTabs() {
        // 不再使用面包屑栏渲染导航页签（面包屑已移除）
        // 导航功能由顶部tab-bar的页签提供
    },

    // ========== 初始化 ==========

    init(navConfig) {
        var self = this;
        var title = this.getCurrentTitle();
        this.openTab(title);

        // If navConfig is provided, ensure all navigable pages are in tabs
        if (navConfig && typeof navConfig === 'object') {
            var tabs = this.getTabs();
            var currentFile = this.getCurrentFileName();

            // Add missing pages to tab list (but don't navigate)
            Object.keys(navConfig).forEach(function(pageTitle) {
                var cfg = navConfig[pageTitle];
                var file = cfg.file || cfg.url;
                // Normalize file - remove path prefixes
                var basename = file.split('/').pop();
                var existing = tabs.filter(function(t) { return t.file === basename; })[0];
                if (!existing && basename !== currentFile) {
                    var id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5) + pageTitle;
                    tabs.push({ id: id, file: basename, title: pageTitle });
                }
            });
            this.saveTabs(tabs);
        }

        this.renderNavTabs();
    },

    // Navigate to a page by title using navConfig
    navigateByTitle(title, navConfig) {
        if (navConfig && navConfig[title]) {
            var cfg = navConfig[title];
            var url = cfg.url || cfg.file;
            if (url) {
                window.location.href = url;
            }
        }
    },
};

// 确保页签样式正确（与页面CSS兼容）
(function() {
    var existing = document.getElementById('tabmanager-style');
    if (existing) return; // 避免重复注入
    var style = document.createElement('style');
    style.id = 'tabmanager-style';
    style.textContent =
        '.tab-bar{display:flex;align-items:center;gap:4px;margin-left:16px;overflow-x:auto;flex:1;padding:4px 0}' +
        '.tab-bar::-webkit-scrollbar{height:0}' +
        '.tab-item{display:flex;align-items:center;gap:6px;padding:5px 12px;border-radius:14px;font-size:12px;cursor:pointer;white-space:nowrap;transition:all .2s;background:rgba(255,255,255,.15);color:rgba(255,255,255,.7);border:1px solid transparent}' +
        '.tab-item:hover{background:rgba(255,255,255,.25);color:#fff}' +
        '.tab-item.active{background:rgba(255,255,255,.95);color:#4285f4;border-color:rgba(255,255,255,.5);font-weight:500}' +
        '.tab-close{width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;line-height:1;opacity:.6;transition:all .15s}' +
        '.tab-close:hover{opacity:1;background:rgba(0,0,0,.12)}' +
        '.tab-item.active .tab-close{opacity:.7;color:#4285f4}' +
        '.tab-item.active .tab-close:hover{opacity:1;background:rgba(66,133,244,.15)}';
    document.head.appendChild(style);
})();