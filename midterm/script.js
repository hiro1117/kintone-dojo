// ここに処理を記載する
'use strict'

// API variables
const BASE_URL = "https://54o76ppvn8.execute-api.ap-northeast-1.amazonaws.com/prod/bb-dojo";
const ID = "dojo";

// API呼び出し
const getAPIData = async() => {
  const response = await fetch(`${BASE_URL}?id=${ID}`);
  return response.json();
};


//
// 表のコンテンツ追加処理
//

// tableの要素追加
const buildTable = (tableData) => {
  tableData.forEach(rowData => {
    addRow(rowData);
  });
};

// 表にrowを追加
const addRow = (rowData) => {
  const tableElement = document.getElementById('dataTable');
  const rowCount = tableElement.rows.length;
  const row = tableElement.insertRow(rowCount);
  
  // 各<td>要素を<tr>要素に追加
  const dateCell = row.insertCell(0);
  const categoryCell = row.insertCell(1);
  const contentCell = row.insertCell(2);

  // contentCellに<a> hrefを追加
  const urlElement = document.createElement('a');

  // 各<td>要素にテキストコンテンツを追加
  dateCell.textContent = rowData.day.value;
  categoryCell.textContent = rowData.category.value;
  contentCell.textContent = rowData.content.value;
};

//
// 表のコンテンツ表示処理
//

// 表の項目並び替え
const sortContents = () => {
  const sortOptionElement = document.getElementById('sort-option');
  
};



getAPIData().then((data) => {
  console.log(data)
  buildTable(data);
});