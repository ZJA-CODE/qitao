/**
 * 工单齐套管理系统 - 公共工具函数
 */

// ============================
// 工具函数
// ============================

/**
 * 生成配置编码
 * 格式：YY+MM+00001（五位流水）
 */
function generateConfigCode() {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const sequence = String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0');
  return `${year}${month}${sequence}`;
}

/**
 * 格式化日期
 * @param {Date|string} date - 日期
 * @param {string} format - 格式 YYYY-MM-DD
 */
function formatDate(date, format = 'YYYY-MM-DD') {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return format.replace('YYYY', year).replace('MM', month).replace('DD', day);
}

/**
 * 格式化日期时间
 * @param {Date|string} date - 日期
 */
function formatDateTime(date) {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 数字格式化（千分位）
 * @param {number} num - 数字
 * @param {number} decimals - 小数位数
 */
function formatNumber(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num)) return '';
  const n = parseFloat(num);
  return n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 判断是否为负数
 * @param {number} value - 值
 */
function isNegative(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num < 0;
}

/**
 * 计算齐套数
 * @param {number} unIssuedQty - 未发料数量
 * @param {number} unitUsage - 单位用量
 * @param {number} yieldRate - 产出率
 * @param {number} shortageQty - 工单缺料数量
 */
function calculateKitQty(unIssuedQty, unitUsage, yieldRate, shortageQty = 0) {
  const qty = parseFloat(unIssuedQty) || 0;
  const usage = parseFloat(unitUsage) || 1;
  const rate = parseFloat(yieldRate) || 1;
  
  if (shortageQty >= 0) {
    // 工单缺料数量 >= 0，正常计算
    return (qty / usage) * rate;
  } else {
    // 工单缺料数量 < 0，部分可承诺
    const shortage = parseFloat(shortageQty) || 0;
    const committedQty = qty + shortage;
    if (committedQty <= 0) return 0;
    return (committedQty / usage) * rate;
  }
}

/**
 * 计算工单优先级排序
 * @param {Array} workOrders - 工单列表
 * @returns {Array} 排序后的工单列表
 */
function sortByWorkOrderPriority(workOrders) {
  return [...workOrders].sort((a, b) => {
    // 优先级排序：HIGH > MEDIUM > LOW
    const priorityMap = { 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3, 'NULL': 4, null: 4, undefined: 4 };
    const priorityA = priorityMap[a.workOrderPriority] || 4;
    const priorityB = priorityMap[b.workOrderPriority] || 4;
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // 优先级相同时，按起始MRP日期排序
    const dateA = new Date(a.requiredMaterialDate || '9999-12-31');
    const dateB = new Date(b.requiredMaterialDate || '9999-12-31');
    return dateA - dateB;
  });
}

/**
 * 计算可用库存缺料数
 * @param {Array} items - 排序后的物料需求列表
 * @param {number} configInventoryQty - 配置库存数量
 */
function calculateAvailableStockShortage(items, configInventoryQty) {
  let remainingQty = parseFloat(configInventoryQty) || 0;
  
  return items.map(item => {
    const unIssuedQty = parseFloat(item.unIssuedQty) || 0;
    remainingQty = remainingQty - unIssuedQty;
    item.availableStockShortageQty = remainingQty;
    return item;
  });
}

/**
 * 判断是否齐套
 * @param {number} shortageQty - 缺料数量
 */
function isKitComplete(shortageQty) {
  const qty = parseFloat(shortageQty);
  return !isNaN(qty) && qty >= 0;
}

/**
 * 生成序号
 * @param {number} index - 索引
 */
function generateSeqNo(index) {
  return String(index + 1).padStart(4, '0');
}

/**
 * 深拷贝对象
 * @param {Object} obj - 对象
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 防抖函数
 * @param {Function} func - 函数
 * @param {number} wait - 等待时间
 */
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 节流函数
 * @param {Function} func - 函数
 * @param {number} limit - 限制时间
 */
function throttle(func, limit = 300) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * 本地存储操作
 */
const storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage set error:', e);
    }
  },
  
  get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.error('Storage get error:', e);
      return defaultValue;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Storage remove error:', e);
    }
  },
  
  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Storage clear error:', e);
    }
  }
};

/**
 * 获取查询参数
 * @param {string} name - 参数名
 */
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

/**
 * 设置查询参数
 * @param {Object} params - 参数对象
 */
function setQueryParams(params) {
  const url = new URL(window.location);
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
      url.searchParams.set(key, params[key]);
    } else {
      url.searchParams.delete(key);
    }
  });
  window.history.pushState({}, '', url);
}

// ============================
// UI 组件相关
// ============================

/**
 * 显示加载状态
 * @param {HTMLElement} container - 容器
 */
function showLoading(container) {
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.id = 'global-loading';
  loading.innerHTML = '<div class="spinner"></div>';
  container.appendChild(loading);
}

/**
 * 隐藏加载状态
 */
function hideLoading() {
  const loading = document.getElementById('global-loading');
  if (loading) {
    loading.remove();
  }
}

/**
 * 显示空状态
 * @param {HTMLElement} container - 容器
 * @param {string} message - 提示消息
 */
function showEmptyState(container, message = '暂无数据') {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">📭</div>
      <div class="empty-state-text">${message}</div>
    </div>
  `;
}

/**
 * 显示消息提示
 * @param {string} message - 消息
 * @param {string} type - 类型 success/error/warning/info
 */
function showMessage(message, type = 'info') {
  const colors = {
    success: '#52c41a',
    error: '#ff4d4f',
    warning: '#faad14',
    info: '#1890ff'
  };
  
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 24px;
    padding: 12px 24px;
    background: white;
    border-left: 4px solid ${colors[type]};
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    animation: slideInRight 0.3s ease-out;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * 确认对话框
 * @param {string} message - 消息
 * @param {Function} onConfirm - 确认回调
 */
function showConfirm(message, onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="min-width: 400px;">
      <div class="modal-header">
        <div class="modal-title">确认操作</div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      </div>
      <div class="modal-body">
        <p>${message}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-default" onclick="this.closest('.modal-overlay').remove()">取消</button>
        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove(); window._confirmCallback && window._confirmCallback()">确定</button>
      </div>
    </div>
  `;
  
  window._confirmCallback = onConfirm;
  document.body.appendChild(overlay);
}

/**
 * 打开抽屉
 * @param {string} title - 标题
 * @param {string} content - 内容
 * @param {Function} onClose - 关闭回调
 * @param {Object} options - 选项 { width, large }
 */
function openDrawer(title, content, onClose, options = {}) {
  const widthClass = options.large ? 'drawer-large' : '';
  const overlay = document.createElement('div');
  overlay.className = 'drawer-overlay';
  overlay.innerHTML = `
    <div class="drawer ${widthClass}">
      <div class="drawer-header">
        <div class="drawer-title">${title}</div>
        <button class="drawer-close" onclick="closeDrawer(this)">×</button>
      </div>
      <div class="drawer-body">${content}</div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  if (onClose) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        onClose();
      }
    });
  }
  
  return overlay;
}

/**
 * 关闭抽屉
 * @param {HTMLElement} closeBtn - 关闭按钮
 */
function closeDrawer(closeBtn) {
  const overlay = closeBtn.closest('.drawer-overlay');
  if (overlay) {
    overlay.remove();
  }
}

/**
 * 打开弹窗
 * @param {string} title - 标题
 * @param {string} content - 内容
 * @param {Function} onClose - 关闭回调
 * @param {Object} options - 选项
 */
function openModal(title, content, onClose, options = {}) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="${options.width ? `min-width: ${options.width}px` : ''}">
      <div class="modal-header">
        <div class="modal-title">${title}</div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      </div>
      <div class="modal-body">${content}</div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  if (onClose) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        onClose();
      }
    });
  }
  
  return overlay;
}

/**
 * 关闭弹窗
 * @param {HTMLElement} closeBtn - 关闭按钮
 */
function closeModal(closeBtn) {
  const overlay = closeBtn.closest('.modal-overlay');
  if (overlay) {
    overlay.remove();
  }
}

// ============================
// 数据验证
// ============================

/**
 * 必填验证
 * @param {string} value - 值
 */
function required(value) {
  return value !== null && value !== undefined && String(value).trim() !== '';
}

/**
 * 邮箱验证
 * @param {string} email - 邮箱
 */
function isEmail(email) {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reg.test(email);
}

/**
 * 数字验证
 * @param {string} value - 值
 */
function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * 正整数验证
 * @param {string} value - 值
 */
function isPositiveInteger(value) {
  const num = parseInt(value);
  return Number.isInteger(num) && num > 0;
}

// ============================
// 导出函数
// ============================

// 导出为 CSV
function exportToCSV(data, filename = 'export.csv') {
  if (!data || data.length === 0) {
    showMessage('没有数据可导出', 'warning');
    return;
  }
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      let cell = row[header] === null || row[header] === undefined ? '' : row[header];
      cell = String(cell).replace(/"/g, '""');
      return `"${cell}"`;
    }).join(','))
  ].join('\n');
  
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

// 导出为 Excel (简化版，使用CSV模拟)
function exportToExcel(data, filename = 'export.xlsx') {
  exportToCSV(data, filename.replace('.xlsx', '.csv'));
}

// 打印
function printPage() {
  window.print();
}

// ============================
// 公共样式类名
// ============================

const CSS_CLASS = {
  NEGATIVE: 'table-cell-negative',
  POSITIVE: 'table-cell-positive',
  LINK: 'table-cell-link',
  COMPLETE: 'status-complete',
  INCOMPLETE: 'status-incomplete'
};

// ============================
// 初始化
// ============================

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 添加动画样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});

// 暴露到全局
window.KitUtils = {
  generateConfigCode,
  formatDate,
  formatDateTime,
  formatNumber,
  isNegative,
  calculateKitQty,
  sortByWorkOrderPriority,
  calculateAvailableStockShortage,
  isKitComplete,
  generateSeqNo,
  deepClone,
  debounce,
  throttle,
  storage,
  getQueryParam,
  setQueryParams,
  showLoading,
  hideLoading,
  showEmptyState,
  showMessage,
  showConfirm,
  openDrawer,
  closeDrawer,
  openModal,
  closeModal,
  required,
  isEmail,
  isNumber,
  isPositiveInteger,
  exportToCSV,
  exportToExcel,
  printPage,
  CSS_CLASS
};