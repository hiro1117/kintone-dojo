(() => {
  'use strict';

  const submitEvents = [
    'app.record.create.submit', 
    'app.record.edit.submit',
  ];

  const params = {
    app: kintone.api.getId(),
    fields: '重複禁止項目',
  };

  // REST APIでレコードの重複禁止項目を配列で取得
  const getRestrictedStrs = async () => {
    const resp = await kintone.api(kintone.api.url(`/k/v1/records.json`, true), 'GET', params);
    const recordsArray = resp.records;
    const recordValuesArray = [];
    
    recordsArray.forEach(element => {
      const recordValue = element['重複禁止項目'].value;
      recordValuesArray.push(recordValue);
    });
    return recordValuesArray;
  };
  
  // 生成された重複禁止項目とレコードの重複禁止項目を比較
  const compareUniqueStrWithRecords = (recordArray) => {

  };
  
  // 指定したイベントによって、重複禁止処理を実行
  kintone.events.on(submitEvents, async (event) => {
    
    const restrictedValuesArray = await getRestrictedStrs();
    console.log(restrictedValuesArray);
    const isuser = window.confirm('g')
    if (isuser) console.log('gg')
    else console.log('ggg')
    const isUniqueStrExist = compareUniqueStrWithRecords(restrictedValuesArray)

    return event;
  })





})();