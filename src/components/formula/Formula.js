import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
        ...options,
    });
  }

  onInput(event) {
    this.text = event.target.textContent.trim();
    this.$emit('formula:input', this.text);
  }

  onKeydown(event) {
      if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault();
        this.$emit('formula:done');
      }
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');
    this.$on('table:select', ($cell) => {
      this.$formula.text = $cell.text;
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }
}
