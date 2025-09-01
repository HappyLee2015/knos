
/**
 * 🚀 BlockSuite-like 编辑器封装函数
 * 使用方式：createBlocksuiteEditor('#container', options)
 */

// ===== 样式注入 =====
function injectStyles() {
    if (document.getElementById('blocksuite-styles')) return;
    
    const styles = `
        <style id="blocksuite-styles">
            :root {
                --primary-color: #3b82f6;
                --secondary-color: #64748b;
                --background-color: #ffffff;
                --surface-color: #f8fafc;
                --border-color: #e2e8f0;
                --text-color: #1e293b;
                --text-secondary: #64748b;
                --success-color: #10b981;
                --warning-color: #f59e0b;
                --error-color: #ef4444;
                --border-radius: 8px;
                --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
                --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            }

            .blocksuite-editor {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: var(--text-color);
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 5vh;
                padding: 5px;
            }

            .editor-container {
                max-width: 800px;
                margin: 0 auto;
                background: var(--background-color);
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-lg);
                overflow: hidden;
            }

            .editor-header {
                background: var(--surface-color);
                padding: 5px;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .editor-title {
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--text-color);
            }

            .editor-toolbar {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }

            .toolbar-btn {
                padding: 8px 12px;
                border: 1px solid var(--border-color);
                background: var(--background-color);
                border-radius: var(--border-radius);
                cursor: pointer;
                font-size: 0.875rem;
                transition: all 0.2s;
            }

            .toolbar-btn:hover {
                background: var(--surface-color);
                border-color: var(--primary-color);
            }

            .editor-content {
                padding: 20px;
                min-height: 400px;
            }

            .editor-stats {
                padding: 15px 20px;
                background: var(--surface-color);
                border-top: 1px solid var(--border-color);
                display: flex;
                gap: 20px;
                font-size: 0.875rem;
                color: var(--text-secondary);
            }

            /* 块级元素样式 */
            .block {
                position: relative;
                padding: 12px;
                margin: 8px 0;
                border-radius: var(--border-radius);
                transition: all 0.2s;
                cursor: pointer;
            }

            .block:hover {
                background: var(--surface-color);
            }

            .block.selected {
                background: var(--surface-color);
                box-shadow: 0 0 0 2px var(--primary-color);
            }

            .block.dragging {
                opacity: 0.5;
            }

            .block-handle {
                position: absolute;
                left: -20px;
                top: 50%;
                transform: translateY(-50%);
                cursor: grab;
                color: var(--text-secondary);
                font-size: 12px;
            }

            .block-handle:active {
                cursor: grabbing;
            }

            /* 文本块样式 */
            .text-block {
                padding: 8px 12px;
                border: none;
                outline: none;
                width: 100%;
                font-size: 1rem;
                line-height: 1.6;
                background: transparent;
                resize: vertical;
                min-height: 24px;
            }

            .heading-1 {
                font-size: 2rem;
                font-weight: 700;
                line-height: 1.3;
            }

            .heading-2 {
                font-size: 1.5rem;
                font-weight: 600;
                line-height: 1.4;
            }

            .heading-3 {
                font-size: 1.25rem;
                font-weight: 600;
                line-height: 1.5;
            }

            .bullet-list, .numbered-list {
                padding-left: 20px;
            }

            .bullet-list li, .numbered-list li {
                margin: 4px 0;
            }

            .quote-block {
                border-left: 4px solid var(--primary-color);
                padding-left: 16px;
                font-style: italic;
                color: var(--text-secondary);
            }

            .code-block {
                background: #1e293b;
                color: #e2e8f0;
                padding: 16px;
                border-radius: var(--border-radius);
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                font-size: 0.875rem;
                overflow-x: auto;
            }

            /* 表格样式 */
            .data-table {
                width: 100%;
                border-collapse: collapse;
                margin: 8px 0;
            }

            .data-table th, .data-table td {
                border: 1px solid var(--border-color);
                padding: 8px 12px;
                text-align: left;
            }

            .data-table th {
                background: var(--surface-color);
                font-weight: 600;
            }

            .table-controls {
                display: flex;
                gap: 4px;
                margin: 8px 0;
            }

            .table-btn {
                padding: 4px 8px;
                font-size: 0.75rem;
                border: 1px solid var(--border-color);
                background: var(--background-color);
                border-radius: 4px;
                cursor: pointer;
            }

            .table-btn:hover {
                background: var(--surface-color);
            }

            /* 看板样式 */
            .kanban-board {
                display: flex;
                gap: 16px;
                overflow-x: auto;
                padding: 8px 0;
            }

            .kanban-column {
                min-width: 200px;
                background: var(--surface-color);
                border-radius: var(--border-radius);
                padding: 12px;
            }

            .kanban-column-header {
                font-weight: 600;
                margin-bottom: 12px;
                color: var(--text-color);
            }

            .kanban-card {
                background: var(--background-color);
                border: 1px solid var(--border-color);
                border-radius: 4px;
                padding: 8px 12px;
                margin: 4px 0;
                cursor: pointer;
            }

            .kanban-card:hover {
                box-shadow: var(--shadow-sm);
            }

            .divider {
                height: 2px;
                background: var(--border-color);
                margin: 16px 0;
                border-radius: 1px;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// ===== 块类型定义 =====
class BaseBlock {
    constructor(type, content) {
        this.type = type;
        this.content = content;
        this.element = null;
    }

    render() {
        throw new Error('render method must be implemented');
    }

    getData() {
        return this.content;
    }

    setData(data) {
        this.content = data;
        if (this.element) {
            this.updateElement();
        }
    }

    updateElement() {
        // Override in subclasses
    }
}

class ParagraphBlock extends BaseBlock {
    constructor(content = '') {
        super('paragraph', content);
    }

    render() {
        const div = document.createElement('div');
        div.className = 'block';
        div.setAttribute('data-type', 'paragraph');
        
        const textarea = document.createElement('textarea');
        textarea.className = 'text-block';
        textarea.value = this.content;
        textarea.placeholder = '输入文本...';
        
        textarea.addEventListener('input', (e) => {
            this.content = e.target.value;
            this.onUpdate?.();
        });
        
        div.innerHTML = '<div class="block-handle">⋮⋮</div>';
        div.appendChild(textarea);
        this.element = div;
        return div;
    }

    updateElement() {
        const textarea = this.element.querySelector('.text-block');
        if (textarea) textarea.value = this.content;
    }
}

class HeadingBlock extends BaseBlock {
    constructor(level = 1, content = '') {
        super('heading', { level, content });
    }

    render() {
        const div = document.createElement('div');
        div.className = 'block';
        div.setAttribute('data-type', 'heading');
        
        const textarea = document.createElement('textarea');
        textarea.className = `text-block heading-${this.content.level}`;
        textarea.value = this.content.content;
        textarea.placeholder = `标题 ${this.content.level}...`;
        
        textarea.addEventListener('input', (e) => {
            this.content.content = e.target.value;
            this.onUpdate?.();
        });
        
        div.innerHTML = '<div class="block-handle">⋮⋮</div>';
        div.appendChild(textarea);
        this.element = div;
        return div;
    }

    updateElement() {
        const textarea = this.element.querySelector('.text-block');
        if (textarea) textarea.value = this.content.content;
    }
}

class ListBlock extends BaseBlock {
    constructor(type = 'bullet', items = ['']) {
        super('list', { type, items });
    }

    render() {
        const div = document.createElement('div');
        div.className = 'block';
        div.setAttribute('data-type', 'list');
        
        const list = document.createElement(this.content.type === 'bullet' ? 'ul' : 'ol');
        list.className = this.content.type === 'bullet' ? 'bullet-list' : 'numbered-list';
        
        this.content.items.forEach((item, index) => {
            const li = document.createElement('li');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = item;
            input.style.border = 'none';
            input.style.background = 'transparent';
            input.style.outline = 'none';
            input.style.width = '100%';
            
            input.addEventListener('input', (e) => {
                this.content.items[index] = e.target.value;
                this.onUpdate?.();
            });
            
            li.appendChild(input);
            list.appendChild(li);
        });
        
        div.innerHTML = '<div class="block-handle">⋮⋮</div>';
        div.appendChild(list);
        this.element = div;
        return div;
    }

    updateElement() {
        // 简单实现，实际应该更新所有li
    }
}

class QuoteBlock extends BaseBlock {
    constructor(content = '') {
        super('quote', content);
    }

    render() {
        const div = document.createElement('div');
        div.className = 'block';
        div.setAttribute('data-type', 'quote');
        
        const textarea = document.createElement('textarea');
        textarea.className = 'text-block quote-block';
        textarea.value = this.content;
        textarea.placeholder = '引用文本...';
        
        textarea.addEventListener('input', (e) => {
            this.content = e.target.value;
            this.onUpdate?.();
        });
        
        div.innerHTML = '<div class="block-handle">⋮⋮</div>';
        div.appendChild(textarea);
        this.element = div;
        return div;
    }

    updateElement() {
        const textarea = this.element.querySelector('.text-block');
        if (textarea) textarea.value = this.content;
    }
}

class CodeBlock extends BaseBlock {
    constructor(content = '') {
        super('code', content);
    }

    render() {
        const div = document.createElement('div');
        div.className = 'block';
        div.setAttribute('data-type', 'code');
        
        const pre = document.createElement('pre');
        pre.className = 'code-content';
        pre.contentEditable = true;
        pre.textContent = this.content;
        
        pre.addEventListener('input', (e) => {
            this.content = e.target.textContent;
            this.onUpdate?.();
        });
        
        div.appendChild(pre);
        this.element = div;
        return div;
    }

    updateElement() {
        const pre = this.element.querySelector('.code-content');
        if (pre) pre.textContent = this.content;
    }
}

class DividerBlock extends BaseBlock {
    constructor() {
        super('divider', null);
    }

    render() {
        const div = document.createElement('div');
        div.className = 'block';
        div.setAttribute('data-type', 'divider');
        
        const hr = document.createElement('div');
        hr.className = 'divider';
        
        div.appendChild(hr);
        this.element = div;
        return div;
    }
}

class TableBlock extends BaseBlock {
    constructor(rows = 2, cols = 2, data = null) {
        const initialData = data || Array(rows).fill(null).map(() => Array(cols).fill(''));
        super('table', { rows, cols, data: initialData });
    }

        render() {
        const div = document.createElement('div');
        div.className = 'block';
        div.setAttribute('data-type', 'table');
        
        // 添加拖拽手柄
        const handle = document.createElement('div');
        handle.className = 'block-handle';
        handle.innerHTML = '⋮⋮';
        div.appendChild(handle);
        
        const table = document.createElement('table');
        table.className = 'data-table';
        
        const tbody = document.createElement('tbody');
        this.content.data.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');
            row.forEach((cell, colIndex) => {
                const cellElement = rowIndex === 0 ? document.createElement('th') : document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';
                input.value = cell;
                input.style.border = 'none';
                input.style.background = 'transparent';
                input.style.outline = 'none';
                input.style.width = '100%';
                
                input.addEventListener('input', (e) => {
                    this.content.data[rowIndex][colIndex] = e.target.value;
                    this.onUpdate?.();
                });
                
                cellElement.appendChild(input);
                tr.appendChild(cellElement);
            });
            tbody.appendChild(tr);
        });
        
        table.appendChild(tbody);
        
        const controls = document.createElement('div');
        controls.className = 'table-controls';
        controls.innerHTML = `
            <button class="table-btn" onclick="this.closest('.block')._tableBlock.addRow()">+ 行</button>
            <button class="table-btn" onclick="this.closest('.block')._tableBlock.addCol()">+ 列</button>
            <button class="table-btn" onclick="this.closest('.block')._tableBlock.removeRow()">- 行</button>
            <button class="table-btn" onclick="this.closest('.block')._tableBlock.removeCol()">- 列</button>
        `;
        
        div.appendChild(controls);
        div.appendChild(table);
        div._tableBlock = this;
        this.element = div;
        return div;
    }

    addRow() {
        this.content.rows++;
        this.content.data.push(Array(this.content.cols).fill(''));
        return this.renderTableHTML();
    }

    addCol() {
        this.content.cols++;
        this.content.data.forEach(row => row.push(''));
        return this.renderTableHTML();
    }

    removeRow() {
        if (this.content.rows > 1) {
            this.content.rows--;
            this.content.data.pop();
            return this.renderTableHTML();
        }
        return null;
    }

    removeCol() {
        if (this.content.cols > 1) {
            this.content.cols--;
            this.content.data.forEach(row => row.pop());
            return this.renderTableHTML();
        }
        return null;
    }

    renderTableHTML() {
        let html = '<tbody>';
        this.content.data.forEach((row, rowIndex) => {
            html += '<tr>';
            row.forEach((cell, colIndex) => {
                const tag = rowIndex === 0 ? 'th' : 'td';
                html += `<${tag}><input type="text" value="${cell}" style="border:none;background:transparent;outline:none;width:100%"></${tag}>`;
            });
            html += '</tr>';
        });
        html += '</tbody>';
        return html;
    }

    updateElement() {
        // 简化的更新逻辑
    }
}

class KanbanBlock extends BaseBlock {
    constructor(columns = ['待办', '进行中', '已完成']) {
        super('kanban', { columns, cards: {} });
        columns.forEach(col => this.content.cards[col] = []);
    }

        render() {
        const div = document.createElement('div');
        div.className = 'block';
        div.setAttribute('data-type', 'kanban');
        
        // 添加拖拽手柄
        const handle = document.createElement('div');
        handle.className = 'block-handle';
        handle.innerHTML = '⋮⋮';
        div.appendChild(handle);
        
        const board = document.createElement('div');
        board.className = 'kanban-board';
        
        this.content.columns.forEach(column => {
            const colDiv = document.createElement('div');
            colDiv.className = 'kanban-column';
            
            const header = document.createElement('div');
            header.className = 'kanban-column-header';
            header.textContent = column;
            
            const cardsContainer = document.createElement('div');
            cardsContainer.className = 'kanban-cards';
            
            (this.content.cards[column] || []).forEach(card => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'kanban-card';
                cardDiv.contentEditable = true;
                cardDiv.textContent = card;
                cardsContainer.appendChild(cardDiv);
            });
            
            const addCardBtn = document.createElement('button');
            addCardBtn.className = 'table-btn';
            addCardBtn.textContent = '+ 卡片';
            addCardBtn.onclick = () => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'kanban-card';
                cardDiv.contentEditable = true;
                cardDiv.textContent = '新卡片';
                cardsContainer.appendChild(cardDiv);
                this.content.cards[column].push('新卡片');
                this.onUpdate?.();
            };
            
            colDiv.appendChild(header);
            colDiv.appendChild(cardsContainer);
            colDiv.appendChild(addCardBtn);
            board.appendChild(colDiv);
        });
        
        div.appendChild(board);
        this.element = div;
        return div;
    }
}

// ===== 块工厂 =====
class BlockFactory {
    static create(type, content = null) {
        switch(type) {
            case 'paragraph': return new ParagraphBlock(content || '');
            case 'heading': return new HeadingBlock(content?.level || 1, content?.content || '');
            case 'list': return new ListBlock(content?.type || 'bullet', content?.items || ['']);
            case 'quote': return new QuoteBlock(content || '');
            case 'code': return new CodeBlock(content || '');
            case 'divider': return new DividerBlock();
            case 'table': return new TableBlock(content?.rows || 2, content?.cols || 2, content?.data);
            case 'kanban': return new KanbanBlock(content?.columns || ['待办', '进行中', '已完成']);
            default: return new ParagraphBlock('');
        }
    }
}

// ===== 主编辑器类 =====
class BlocksuiteEditor {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            title: options.title || '无标题文档',
            placeholder: options.placeholder || '开始输入...',
            onChange: options.onChange || null,
            toolbar : options.toolbar || true,

            ...options
        };
        
        this.blocks = [];
        this.history = [];
        this.historyIndex = -1;
        
        this.init();
    }

    init() {
        this.container.innerHTML = this.createEditorHTML();
        this.contentContainer = this.container.querySelector('.editor-content');
        this.setupEventListeners();
        
        if (this.options.initialContent) {
            this.loadContent(this.options.initialContent);
        } else {
           // this.createBlock('paragraph');
        }
        
        this.saveState();
    }

    createEditorHTML() {
        let toolbat_html = "";
        if(this.options.toolbar)
            toolbat_html =`<div class="editor-toolbar">
                            <button class="toolbar-btn" data-action="heading">标题</button>
                            <button class="toolbar-btn" data-action="list">列表</button>
                            <button class="toolbar-btn" data-action="quote">引用</button>
                            <button class="toolbar-btn" data-action="code">代码</button>
                            <button class="toolbar-btn" data-action="table">表格</button>
                            <button class="toolbar-btn" data-action="kanban">看板</button>
                            <button class="toolbar-btn" data-action="divider">分割线</button>
                            <button class="toolbar-btn" data-action="undo">撤销</button>
                            <button class="toolbar-btn" data-action="redo">重做</button>
                            <button class="toolbar-btn" data-action="export">导出</button>
                        </div>`

        return `
            <div class="blocksuite-editor">
                <div class="editor-container">
                    <div class="editor-header">
                        <div class="editor-title" contenteditable="true">${this.options.title}</div>
                        ${toolbat_html}
                    </div>
                    <div class="editor-content"></div>
                    <div class="editor-stats">
                        <span>块数: <span id="block-count">0</span></span>
                        <span>字数: <span id="word-count">0</span></span>
                        <span>字符: <span id="char-count">0</span></span>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // 拖拽功能
        this.contentContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            if (!dragging) return;
            
            const afterElement = this.getDragAfterElement(e.clientY);
            if (afterElement) {
                this.contentContainer.insertBefore(dragging, afterElement);
            } else {
                this.contentContainer.appendChild(dragging);
            }
        });

        // 键盘事件
        this.contentContainer.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'z':
                        e.preventDefault();
                        if (e.shiftKey) this.redo();
                        else this.undo();
                        break;
                    case 's':
                        e.preventDefault();
                        this.export();
                        break;
                }
            }
        });

        // 绑定编辑器实例
        this.container._editor = this;
    }

    createBlock(type, content = null) {
        const block = BlockFactory.create(type, content);
        block.onUpdate = () => {
            this.saveState();
            this.updateStats();
            this.options.onChange?.(this.getContent());
        };
        
        const element = block.render();
        element.draggable = true;
        element._blockInstance = block;
        
        element.addEventListener('dragstart', (e) => {
            e.target.classList.add('dragging');
        });
        
        element.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
            this.reorderBlocks();
        });
        
        this.contentContainer.appendChild(element);
        this.blocks.push(block);
        
        // 自动聚焦
        const input = element.querySelector('textarea, [contenteditable]');
        if (input) input.focus();
        
        this.saveState();
        this.updateStats();
    }

    reorderBlocks() {
        const newBlocks = [];
        this.contentContainer.querySelectorAll('.block').forEach(element => {
            const block = this.blocks.find(b => b.element === element);
            if (block) newBlocks.push(block);
        });
        this.blocks = newBlocks;
        this.saveState();
    }

    getDragAfterElement(y) {
        const blocks = [...this.contentContainer.querySelectorAll('.block:not(.dragging)')];
        
        return blocks.reduce((closest, block) => {
            const box = block.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: block };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    getContent() {
        return {
            title: this.container.querySelector('.editor-title').textContent,
            blocks: this.blocks.map(block => ({
                type: block.type,
                content: block.getData()
            }))
        };
    }

    loadContent(content) {
        this.container.querySelector('.editor-title').textContent = content.title || '无标题文档';
        this.contentContainer.innerHTML = '';
        this.blocks = [];
        
        content.blocks?.forEach(blockData => {
            this.createBlock(blockData.type, blockData.content);
        });
    }

    saveState() {
        const state = this.getContent();
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(JSON.stringify(state));
        this.historyIndex++;
        
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            const state = JSON.parse(this.history[this.historyIndex]);
            this.loadContent(state);
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            const state = JSON.parse(this.history[this.historyIndex]);
            this.loadContent(state);
        }
    }

    export() {
        const content = this.getContent();
        const blob = new Blob([JSON.stringify(content, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `blocksuite-doc-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    updateStats() {
        let text = '';
        let blockCount = this.blocks.length;
        
        this.blocks.forEach(block => {
            if (block.type === 'paragraph' || block.type === 'quote') {
                text += block.content + ' ';
            } else if (block.type === 'heading') {
                text += block.content.content + ' ';
            } else if (block.type === 'list') {
                text += block.content.items.join(' ') + ' ';
            } else if (block.type === 'table') {
                block.content.data.forEach(row => {
                    text += row.join(' ') + ' ';
                });
            }
        });
        
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const chars = text.length;
        
        const statsContainer = this.container.querySelector('.editor-stats');
        if (statsContainer) {
            statsContainer.querySelector('#block-count').textContent = blockCount;
            statsContainer.querySelector('#word-count').textContent = words;
            statsContainer.querySelector('#char-count').textContent = chars;
        }
    }
}

// ===== 主封装函数 =====
function createBlocksuiteEditor(selector, options = {}) {
    // 注入样式
    injectStyles();
    
    // 创建编辑器实例
    const editor = new BlocksuiteEditor(selector, options);
    
    // 返回API
    return {
        createBlock: (type, content) => editor.createBlock(type, content),
        getContent: () => editor.getContent(),
        loadContent: (content) => editor.loadContent(content),
        undo: () => editor.undo(),
        redo: () => editor.redo(),
        export: () => editor.export(),
        onChange: (callback) => { editor.options.onChange = callback; }
    };
}

// ===== 全局挂载 =====
if (typeof window !== 'undefined') {
    window.createBlocksuiteEditor = createBlocksuiteEditor;
}

// ===== 导出模块 =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = createBlocksuiteEditor;
}
