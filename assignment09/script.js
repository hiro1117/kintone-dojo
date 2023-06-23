(() => {
  'use strict';

  

  // REST APIでレコードの重複禁止項目を配列で取得
  const getRestrictedStrs = async () => {
    const recordsArray = resp.records;
    const recordValuesArray = [];
    
    recordsArray.forEach(element => {
      const recordValue = element['重複禁止項目'].value;
      recordValuesArray.push(recordValue);
    });
    return recordValuesArray;
  };
  
  
  // 指定したイベントによって、重複禁止処理を実行
  kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], async (event) => {
    const fieldsRestrictedId =  event.record.重複禁止項目.value;
    console.log('query');
    
    const params = {
      app: kintone.api.getId(),
      fields: '重複禁止項目',
      query: `重複禁止項目 = ${fieldsRestrictedId}`
    };

    console.log(params.query);
    const resp = await kintone.api(kintone.api.url(`/k/v1/records.json`, true), 'GET', params);

    console.log(fieldsRestrictedId);
    const restrictedValuesArray = await getRestrictedStrs();

    return event;
  })





})();