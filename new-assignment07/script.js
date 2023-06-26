(() => {
  'use strict';

  const triggerEvents = [
    'app.record.create.show', 
    'app.record.create.change.日付', 
    'app.record.create.change.サイボウズ製品', 
    'app.record.create.change.管理番号', 
    'app.record.edit.show',
    'app.record.edit.change.日付', 
    'app.record.edit.change.サイボウズ製品', 
    'app.record.edit.change.管理番号', 
  ];
  
  const convertProductID = (product) => {
    if(product === 'kintone') return 'KN'
    else if(product === 'Garoon') return 'GN' 
    else if(product === 'サイボウズ Office') return 'OF' 
    else if(product === 'Mailwise') return 'MW' 
  };

  const convertDate = (date) => {
    return dateFns.format(date, 'YYYYMMDD');
  };

  const formatText = (date, id="", uniqueNum="") => {
    return `${date}-${id}-${uniqueNum}`;
  };

  const createUniqueId = (event) => {
    const date = event.record.日付.value;
    const product = event.record.サイボウズ製品.value;
    const uniqueNum = event.record.管理番号.value;
    const formatedDate = convertDate(date);
    const productID = convertProductID(product);
    const uniqueString = formatText(formatedDate, productID, uniqueNum);
    return uniqueString;
  };

  kintone.events.on(triggerEvents, (event) => {
    event.record.重複禁止項目_文字列.value = createUniqueId(event);
    return event;
  });
})();