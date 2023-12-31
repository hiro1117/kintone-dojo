(() => {
  'use strict';

  const params = {
    app: kintone.app.getId(),
  };

  const getAction5Label = async () => {
    const resp = await kintone.api(`/k/v1/app/form/fields.json`, 'GET', params);
    const options = resp.properties.Table.fields.Action5.options;
    const orderedOptionLabel = [];

    for (const element of Object.keys(options)) {
      const index = options[element].index;
      orderedOptionLabel[index] = element;
    }
    return orderedOptionLabel;
  };

  const insertTable = (event, action5Array) => {
    const tableArray = event.record.Table.value;
    action5Array.forEach((elem) => {
      const clonedTableArrayElem = structuredClone(tableArray[0]);
      clonedTableArrayElem.value.Action5.value = elem;
      tableArray.push(clonedTableArrayElem);
    });
    tableArray.shift();
  };


  kintone.events.on('app.record.create.show', async (event) => {
    const action5Array = await getAction5Label();
    insertTable(event, action5Array);
    return event;
  });
})();
