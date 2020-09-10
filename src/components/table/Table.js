import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeLogic} from '@/components/table/resizeLogic';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import {matrix, nextSelector} from '@/components/table/tableFunctions';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  onInput(event) {
    const $cell = $(event.target);
      this.$emit('table:select', $cell);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeLogic(this.$root, event);
    }
    if (event.target.dataset.type === 'cell') {
      const $cell = $(event.target);

      if (event.shiftKey) {
        const $target = $(event.target);
        const $current = this.selection.current;
        const $cells = matrix($target, $current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));

        this.selection.selectGroup($cells);
      } else {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
      }
    }
  }

  onKeydown(event) {
      const {key} = event;
      const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

      if (keys.includes(key) && !event.shiftKey) {
        event.preventDefault();
        const id = this.selection.current.id(true);
        const $next = this.$root.find(nextSelector(key, id));
        this.selection.select($next);
        $next.focus();
        this.$emit('table:select', $next);
      }
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    $cell.focus();
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    this.$on('formula:input', (text) => this.selection.current.text = text);
    this.$on('formula:done', () => this.selection.current.focus());
  }

  toHTML() {
    return createTable(20);
  }
}
