import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeLogic} from '@/components/table/resizeLogic';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeLogic(this.$root, event);
    }
  }

  toHTML() {
    return createTable(20);
  }
}
