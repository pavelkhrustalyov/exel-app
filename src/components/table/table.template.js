const CODES = {
  A: 65,
  Z: 90,
};

const createCell = (_, index) => {
  return `<div class="cell" contenteditable data-col="${index}"></div>`;
};

const createCol = (col, index) => {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
};
export const createRow = (index, content) => {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index || ''}
        ${index ? '<div data-resize="row" class="row-resize"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
};

export const createTable = (rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1;

  const rows = [];

  const cols = Array.from({length: colsCount})
    .map((_, index) => CODES.A + index)
    .map((el) => String.fromCharCode(el))
    .map(createCol)
    .join('');

  rows.push(createRow(null, cols));

  const cells = Array.from({length: colsCount})
    .map(createCell)
    .join('');

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
};
