/*! 自定义列穿梭框组件 v2.0 - 支持拖拽排序 */
(function() {
    // Inject CSS
    var styleId = 'column-transfer-style';
    if (!document.getElementById(styleId)) {
        var s = document.createElement('style');
        s.id = styleId;
        s.textContent = [
            '.transfer-container{display:flex;gap:16px;height:400px;align-items:stretch}',
            '.transfer-panel{flex:1;display:flex;flex-direction:column;border:1px solid #e8e8e8;border-radius:8px;overflow:hidden;background:#fafbfc;min-width:260px;max-width:400px}',
            '.transfer-header{padding:10px 14px;background:#f5f7fa;border-bottom:1px solid #e8e8e8;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}',
            '.transfer-title{font-size:13px;font-weight:600;color:#333}',
            '.transfer-tools{display:flex;gap:4px}',
            '.transfer-list{flex:1;overflow-y:auto;overflow-x:hidden;padding:0;min-height:0}',
            '.transfer-list-selected{background:#fff}',
            '.transfer-item{display:flex;align-items:center;padding:8px 12px;cursor:pointer;font-size:13px;border-bottom:1px solid #f5f5f5;transition:background 0.15s;width:100%}',
            '.transfer-item:hover{background:#e6f4ff}',
            '.transfer-item input[type="checkbox"]{width:14px;height:14px;margin-right:8px;accent-color:#1677ff}',
            '.transfer-item-selected{display:flex;align-items:center;padding:8px 10px;border-bottom:1px solid #f0f0f0;font-size:13px;background:#e6f4ff;margin:1px 2px;border-radius:4px;cursor:move;user-select:none}',
            '.transfer-item-selected:hover{background:#d4e8ff}',
            '.transfer-item-selected.dragging{opacity:0.4;background:#ffe7d6;border:2px dashed #1677ff}',
            '.transfer-item-selected.drag-over{border-top:2px solid #1677ff}',
            '.transfer-item-inner{flex:1;display:flex;align-items:center}',
            '.transfer-item-inner input[type="checkbox"]{width:14px;height:14px;margin-right:8px;accent-color:#1677ff}',
            '.drag-handle{cursor:grab;color:#bbb;font-size:14px;padding:0 6px;user-select:none;flex-shrink:0}',
            '.drag-handle:active{cursor:grabbing}',
            '.cfg-tag{font-size:10px;padding:1px 6px;border-radius:8px;margin-left:4px;flex-shrink:0}',
            '.tag-fixed{background:#52c41a;color:#fff}',
            '.transfer-empty{text-align:center;color:#bbb;font-size:12px;padding:60px 0}',
            '.transfer-buttons{display:flex;flex-direction:column;gap:10px;justify-content:center;align-self:center;padding:0 8px}',
            '.transfer-buttons .btn-sm{width:40px;height:34px;padding:0;font-size:16px;font-weight:600}',
            '.btn-xs{padding:3px 10px;font-size:12px;height:24px;border:1px solid #d9d9d9;background:#fff;border-radius:4px;cursor:pointer}',
            '.btn-xs:hover{border-color:#1677ff;color:#1677ff}'
        ].join('');
        document.head.appendChild(s);
    }

    var _fieldDefs = [];
    var _defaultDefs = [];
    var _availableList = [];
    var _selectedList = [];
    var _onApply = null;
    var _onReset = null;
    var _onSave = null;
    var _draggedItem = null;

    function deepClone(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    function init(fieldDefs, onApply, onReset, onSave) {
        _fieldDefs = deepClone(fieldDefs);
        _defaultDefs = deepClone(fieldDefs);
        _onApply = onApply;
        _onReset = onReset;
        _onSave = onSave;
        refreshLists();
    }

    function refreshLists() {
        _availableList = [];
        _selectedList = [];
        _fieldDefs.forEach(function(f, i) {
            var item = Object.assign({}, f, {_idx: i});
            if (f.visible) {
                _selectedList.push(item);
            } else {
                _availableList.push(item);
            }
        });
    }

    function render() {
        var modal = document.getElementById('columnModal');
        if (!modal) return;
        modal.style.width = '850px';
        modal.innerHTML = buildModalHtml();
        initDragEvents();
    }

    function buildModalHtml() {
        var h = '';
        h += '<div class="modal-header"><h3>自定义列显示</h3><button class="modal-close" onclick="ColumnConfigTransfer.close()">×</button></div>';
        h += '<div class="modal-body">';
        h += '<div class="transfer-container">';

        // Left panel: Available columns
        h += '<div class="transfer-panel">';
        h += '<div class="transfer-header">';
        h += '<span class="transfer-title">可用列 (' + _availableList.length + ')</span>';
        h += '<div class="transfer-tools">';
        h += '<button class="btn btn-xs" onclick="ColumnConfigTransfer.selectAllAvailable()">全选</button>';
        h += '<button class="btn btn-xs" onclick="ColumnConfigTransfer.clearAllAvailable()">清空</button>';
        h += '</div></div>';
        h += '<div class="transfer-list" id="availList">';
        if (_availableList.length === 0) {
            h += '<div class="transfer-empty">暂无可用列</div>';
        } else {
            _availableList.forEach(function(f) {
                h += '<label class="transfer-item"><input type="checkbox" class="avail-cb" data-idx="' + f._idx + '"><span>' + f.name + '</span></label>';
            });
        }
        h += '</div></div>';

        // Middle: Buttons
        h += '<div class="transfer-buttons">';
        h += '<button class="btn btn-sm" onclick="ColumnConfigTransfer.moveToRight()" title="移动到已选">▶</button>';
        h += '<button class="btn btn-sm" onclick="ColumnConfigTransfer.moveToRightAll()" title="全部移到已选">»</button>';
        h += '<button class="btn btn-sm" onclick="ColumnConfigTransfer.moveToLeft()" title="移动到可用">◀</button>';
        h += '<button class="btn btn-sm" onclick="ColumnConfigTransfer.moveToLeftAll()" title="全部移到可用">«</button>';
        h += '</div>';

        // Right panel: Selected columns
        h += '<div class="transfer-panel">';
        h += '<div class="transfer-header">';
        h += '<span class="transfer-title">已选列 (' + _selectedList.length + ')</span>';
        h += '<div class="transfer-tools">';
        h += '<button class="btn btn-xs" onclick="ColumnConfigTransfer.selectAllSelected()">全选</button>';
        h += '<button class="btn btn-xs" onclick="ColumnConfigTransfer.clearAllSelected()">清空</button>';
        h += '</div></div>';
        h += '<div class="transfer-list transfer-list-selected" id="selectedList">';
        if (_selectedList.length === 0) {
            h += '<div class="transfer-empty">暂无已选列</div>';
        } else {
            _selectedList.forEach(function(f, idx) {
                var fixedTag = f.systemFixed ? '<span class="cfg-tag tag-fixed">固定</span>' : '';
                h += '<div class="transfer-item-selected" draggable="true" data-idx="' + f._idx + '" data-order="' + idx + '">';
                h += '<span class="drag-handle" title="拖拽排序">☰</span>';
                h += '<label class="transfer-item-inner"><input type="checkbox" class="sel-cb" data-idx="' + f._idx + '" checked><span>' + f.name + '</span></label>';
                h += fixedTag;
                h += '</div>';
            });
        }
        h += '</div></div>';

        h += '</div></div>';

        // Footer
        h += '<div class="modal-footer">';
        h += '<button class="btn btn-sm" onclick="ColumnConfigTransfer.doReset()">↺ 恢复默认</button>';
        h += '<div class="footer-actions">';
        h += '<button class="btn btn-sm" onclick="ColumnConfigTransfer.close()">取消</button>';
        h += '<button class="btn btn-sm" onclick="ColumnConfigTransfer.doApply()">应用</button>';
        h += '<button class="btn btn-primary btn-sm" onclick="ColumnConfigTransfer.doSave()">保存配置</button>';
        h += '</div></div>';

        return h;
    }

    // Initialize drag and drop events
    function initDragEvents() {
        var selectedList = document.getElementById('selectedList');
        if (!selectedList) return;

        var items = selectedList.querySelectorAll('.transfer-item-selected');
        items.forEach(function(item) {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
            item.addEventListener('dragover', handleDragOver);
            item.addEventListener('dragenter', handleDragEnter);
            item.addEventListener('dragleave', handleDragLeave);
            item.addEventListener('drop', handleDrop);
        });
    }

    function handleDragStart(e) {
        _draggedItem = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.dataset.idx);
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        document.querySelectorAll('.transfer-item-selected').forEach(function(item) {
            item.classList.remove('drag-over');
        });
        _draggedItem = null;
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDragEnter(e) {
        e.preventDefault();
        if (this !== _draggedItem) {
            this.classList.add('drag-over');
        }
    }

    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (this === _draggedItem) return;
        
        var draggedIdx = parseInt(_draggedItem.dataset.idx);
        var targetOrder = parseInt(this.dataset.order);
        var draggedOrder = parseInt(_draggedItem.dataset.order);

        // Reorder _selectedList based on drag operation
        var movedItem = _selectedList.splice(draggedOrder, 1)[0];
        _selectedList.splice(targetOrder, 0, movedItem);

        // Update _fieldDefs based on new order
        updateFieldDefsOrder();

        // Re-render
        render();
        _showToast('列顺序已调整');
    }

    function updateFieldDefsOrder() {
        // Create ordered list of field definitions
        var newOrder = [];
        _selectedList.forEach(function(item) {
            newOrder.push(_fieldDefs[item._idx]);
        });

        // Update visible flags based on new order
        _fieldDefs.forEach(function(f) {
            f.visible = false;
        });
        newOrder.forEach(function(f) {
            f.visible = true;
        });

        // Sort fieldDefs to match new order
        var visibleFields = newOrder.filter(function(f) { return f.visible; });
        var hiddenFields = _fieldDefs.filter(function(f) { return !f.visible; });
        _fieldDefs = visibleFields.concat(hiddenFields);
    }

    // --- Actions ---

    function selectAllAvailable() {
        var cbs = document.querySelectorAll('.avail-cb');
        for (var i = 0; i < cbs.length; i++) cbs[i].checked = true;
    }
    function clearAllAvailable() {
        var cbs = document.querySelectorAll('.avail-cb');
        for (var i = 0; i < cbs.length; i++) cbs[i].checked = false;
    }
    function selectAllSelected() {
        var cbs = document.querySelectorAll('.sel-cb');
        for (var i = 0; i < cbs.length; i++) cbs[i].checked = true;
    }
    function clearAllSelected() {
        var cbs = document.querySelectorAll('.sel-cb');
        for (var i = 0; i < cbs.length; i++) cbs[i].checked = false;
    }

    function moveToRight() {
        var moved = false;
        var cbs = document.querySelectorAll('.avail-cb:checked');
        for (var i = cbs.length - 1; i >= 0; i--) {
            (function(cb) {
                var idx = parseInt(cb.dataset.idx);
                var found = false;
                for (var j = 0; j < _availableList.length; j++) {
                    if (_availableList[j]._idx === idx) {
                        _selectedList.push(_availableList[j]);
                        _availableList.splice(j, 1);
                        _fieldDefs[idx].visible = true;
                        found = true;
                        moved = true;
                        break;
                    }
                }
            })(cbs[i]);
        }
        if (moved) {
            updateFieldDefsOrder();
            render();
        }
    }

    function moveToRightAll() {
        if (_availableList.length === 0) return;
        for (var i = 0; i < _availableList.length; i++) {
            _selectedList.push(_availableList[i]);
            _fieldDefs[_availableList[i]._idx].visible = true;
        }
        _availableList = [];
        updateFieldDefsOrder();
        render();
    }

    function moveToLeft() {
        var moved = false;
        var cbs = document.querySelectorAll('.sel-cb:checked');
        for (var i = cbs.length - 1; i >= 0; i--) {
            (function(cb) {
                var idx = parseInt(cb.dataset.idx);
                for (var j = 0; j < _selectedList.length; j++) {
                    if (_selectedList[j]._idx === idx && !_selectedList[j].systemFixed) {
                        _availableList.push(_selectedList[j]);
                        _selectedList.splice(j, 1);
                        _fieldDefs[idx].visible = false;
                        moved = true;
                        break;
                    }
                }
            })(cbs[i]);
        }
        if (moved) {
            updateFieldDefsOrder();
            render();
        }
    }

    function moveToLeftAll() {
        var kept = [];
        for (var i = 0; i < _selectedList.length; i++) {
            if (_selectedList[i].systemFixed) {
                kept.push(_selectedList[i]);
            } else {
                _availableList.push(_selectedList[i]);
                _fieldDefs[_selectedList[i]._idx].visible = false;
            }
        }
        _selectedList = kept;
        updateFieldDefsOrder();
        render();
    }

    function doApply() {
        if (_onApply) _onApply(_fieldDefs);
        close();
        _showToast('列配置已应用');
    }

    function doReset() {
        _fieldDefs = deepClone(_defaultDefs);
        if (_onReset) _onReset();
        refreshLists();
        render();
        _showToast('已恢复默认列配置');
    }

    function doSave() {
        _defaultDefs = deepClone(_fieldDefs);
        if (_onSave) _onSave(_fieldDefs);
        close();
        _showToast('配置已保存');
    }

    function close() {
        document.getElementById('columnModal').classList.remove('show');
        document.getElementById('colOverlay').classList.remove('show');
    }

    function open() {
        refreshLists();
        render();
        document.getElementById('columnModal').classList.add('show');
        document.getElementById('colOverlay').classList.add('show');
    }

    function _showToast(m) {
        var t = document.getElementById('toast');
        if (!t) return;
        var msgEl = t.querySelector('.toast-message');
        var iconEl = t.querySelector('.toast-icon');
        if (msgEl) msgEl.textContent = m;
        if (iconEl) iconEl.textContent = '✓';
        t.className = 'toast success show';
        setTimeout(function(){ t.classList.remove('show'); }, 2500);
    }

    // Expose globally
    window.ColumnConfigTransfer = {
        init: init,
        open: open,
        close: close,
        selectAllAvailable: selectAllAvailable,
        clearAllAvailable: clearAllAvailable,
        selectAllSelected: selectAllSelected,
        clearAllSelected: clearAllSelected,
        moveToRight: moveToRight,
        moveToRightAll: moveToRightAll,
        moveToLeft: moveToLeft,
        moveToLeftAll: moveToLeftAll,
        doApply: doApply,
        doReset: doReset,
        doSave: doSave
    };
})();