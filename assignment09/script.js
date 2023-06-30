(() => {
  'use strict';

  const submitEvents = [
    'app.record.create.submit',
    'app.record.edit.submit',
  ];

  kintone.events.on(submitEvents, async (event) => {
    // JS APIで重複禁止項目の値を取得
    const RECORD_ID = event.recordId;
    const recordValue = event.record.重複禁止項目.value;
    const query = RECORD_ID ? `重複禁止項目 = "${recordValue}" and レコード番号 != "${RECORD_ID}"` : `重複禁止項目 = "${recordValue}"`;
    // 重複禁止項目の値を含めたparamを用意
    const params = {
      app: kintone.app.getId(),
      query: query,
      totalCount: true
    };

    // REST APIをparamを使って叩く（param = '重複項目 = "20230612-KN-1" ）
    const resp = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', params);
    if (Number(resp.totalCount) === 0) return event;
    return window.confirm('レコードが重複しています。このまま保存しますか？') ? event : false;
  });
})();