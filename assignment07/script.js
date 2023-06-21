(() => {
  'use strict';

  const kintoneEvents = [
    'app.record.create.show',
    'app.record.create.change.日付',
    'app.record.create.change.サイボウズ製品',
    'app.record.create.change.管理番号',
    'app.record.edit.show',
    'app.record.edit.change.日付',
    'app.record.edit.change.サイボウズ製品',
    'app.record.edit.change.管理番号',
  ];

  kintone.events.on(kintoneEvents, (event) => {
    const records = event.record;
    const date = dateFns.format(new Date(records.日付.value), 'YYYYMMDD');

    const product =
      records.サイボウズ製品.value === 'kintone'
        ? 'KN'
        : records.サイボウズ製品.value === 'Garoon'
        ? 'GR'
        : records.サイボウズ製品.value === 'サイボウズ Office'
        ? 'OF'
        : records.サイボウズ製品.value === 'Mailwise'
        ? 'MW'
        : '';

    const ctrlName = `${date}-${product}-${records.管理番号.value}`;

    records.重複禁止項目_文字列.value = ctrlName;
    records.重複禁止項目_文字列.disabled = true;

    return event;
  });
})();