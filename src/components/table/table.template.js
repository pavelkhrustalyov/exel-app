const CODES = {
  A: 65,
  Z: 90,
};

const createCell = () => {
  return `<div class="cell" contenteditable></div>`;
};

export const createCol = (el) => {
  return `<div class="column">${el}</div>`;
};

export const createRow = (index = '', content) => {
  return `
    <div class="row">
      <div class="row-info">${index || ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
};

export const createTable = (rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1;

  const rows = [];

  const cols = Array.from({length: colsCount})
  .map((_, index) => CODES.A + index)
  .map((col) => String.fromCharCode(col))
  .map(createCol)
  .join('');

  rows.push(createRow('', cols));

  const cells = Array.from({length: colsCount})
  .map(createCell)
  .join('');

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
};
