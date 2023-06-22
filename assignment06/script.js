(() => {
  'use strict';
  const action5Array = ['あくなき探求', '不屈の心体', '理想への共感', '心を動かす', '知識を増やす', '公明正大']; 

  kintone.events.on('app.record.create.show', (event) => {
    const tableArray = event.record.Table.value;
    action5Array.forEach((elem) => {
      let clonedTableArrayElem = structuredClone(tableArray[0]);
      clonedTableArrayElem.value.Action5.value = elem;
      tableArray.push(clonedTableArrayElem);
    });
    tableArray.shift();
    return event;
  }); 

})();