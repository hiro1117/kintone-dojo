(() => {
  'use strict';

  const submitEvents = [
    'app.record.create.submit', 
    'app.record.edit.submit',
  ];
  
  kintone.events.on(submitEvents, async (event) => {
    // JS APIで重複禁止項目の値を取得
    const recordValue = event.record.重複禁止項目.value;
     
    // 重複禁止項目の値を含めたparamを用意
    const params = {
      "app": kintone.app.getId(),
      "query": `重複禁止項目 = "${recordValue}"`,
      "totalCount": true
    };

    // REST APIをparamを使って叩く（param = '重複項目 = "20230612-KN-1" ）
    const resp = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', params);
    
    if (Number(resp.totalCount) === 0) return event;
    else return window.confirm('レコードが重複しています。このまま保存しますか？') ? event : false;
  })
})();