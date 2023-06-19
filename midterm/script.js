// ここに処理を記載する
'use strict'

const BASE_URL = "https://54o76ppvn8.execute-api.ap-northeast-1.amazonaws.com/prod/bb-dojo";
const MAX_LENGTH = 30;

// ELement取得
const tableElement = document.getElementById('table-body');
const sortOptionElement = document.getElementById('sort-option');
const limitOptionElement = document.getElementById('contents-limit-option');


// API呼び出し
const getAPIData = async(paramLimit) => {
  const response = await fetch(`${BASE_URL}?id=dojo&query=${paramLimit ? `limit `+paramLimit : ""}`);
  if (!response.ok) throw new Error(`${response.status}: ${await response.text()}`);
  return response.json();
};


//
// 表のコンテンツ関連処理
//

// tableを初期化して要素追加＆変更する関数
const buildTable = (tableData) => {
  // table bodyの子要素削除
  removeAllChildElems(tableElement);
  tableData.forEach(rowData => {
    addRow(rowData);
  });
};

// table bodyを初期化する関数
const removeAllChildElems = (parent) => {
  while(parent.lastChild){
    parent.removeChild(parent.lastChild);
  }
};

// 表にrowを追加する関数
const addRow = (rowData) => {
  const rowCount = tableElement.rows.length;
  const row = tableElement.insertRow(rowCount);
  
  // 各<td>要素を<tr>要素に追加
  const dateCell = row.insertCell(0);
  const categoryCell = row.insertCell(1);
  const contentCell = row.insertCell(2);
  
  // contentCellに<a> hrefを追加
  const linkElement = document.createElement('a');
  const targetValue = rowData['target'].value;
  linkElement.href = rowData.url.value
  contentCell.appendChild(linkElement);
  
  // 各要素に属性を追加
  linkElement.setAttribute('target', targetValue);
  categoryCell.setAttribute('id', rowData.label.value)
  
  // 各<td>要素にテキストコンテンツを追加
  dateCell.textContent = rowData.day.value;
  categoryCell.textContent = rowData.category.value;
  linkElement.textContent = truncateTitle(rowData.content.value);
};

// 表のコンテンツ文字数を制限する関数
const truncateTitle = (text) => {
  return text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}...` : text; 
};

//
// 表のコンテンツ表示処理
//

// 表の項目並び替えをする関数
const sortContents = (tableData, sortPref="latest") => {
  tableData.sort(function(a,b){
    if (sortPref === "latest") return new Date(b.day.value) - new Date(a.day.value);
    else if (sortPref === "oldest") return new Date(a.day.value) - new Date(b.day.value);
  });
};

//
// 表示オプション変更時の処理
//
sortOptionElement.addEventListener("change", async() => {
  const newsArray = await getAPIData();
  const sortPref = sortOptionElement.value;
  sortContents(newsArray, sortPref); 
  buildTable(newsArray);    
});

limitOptionElement.addEventListener("change", async() => {
  const limitOptionValue = limitOptionElement.value;
  const newsArray = await getAPIData(limitOptionValue);
  sortContents(newsArray);
  buildTable(newsArray);
});


//
// Webサイト読み込み時のapi取得＆コンテンツ表示の処理
//
getAPIData().then((newsArray) => {
  sortContents(newsArray);
  buildTable(newsArray);
})
.catch(err => {
  throw new Error(err);
});