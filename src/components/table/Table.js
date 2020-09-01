import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['input'],
    });
  }

  onInput(event) {
    console.log('onInput table ', event.target.textContent.trim());
  }

  onClick(event) {
    console.log('onClick');
  }

  toHTML() {
    return createTable(40);
  }
}
