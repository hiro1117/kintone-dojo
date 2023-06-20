(() => {
  'use strict';
  // Change the expected order date
  // when "proposing place" field value changes at record add screen.
  //Plan A -> 1 week later, Plan B -> 1 month later
  kintone.events.on('app.record.create.change.proposingPlan', (event) => {
    console.log(event);
    const plan = event.record.proposingPlan.value;
    const today = dayjs();
    let addedDate = '';

    if (plan === 'Aプラン') addedDate = today.add(1, 'week').format('YYYY-MM-DD')
    else if (plan === 'Bプラン') addedDate = today.add(1, 'month').format('YYYY-MM-DD')
    else if (plan === 'Cプラン') addedDate = today.add(1, 'year').format('YYYY-MM-DD')
    event.record.orderDate.value = addedDate;
    return event;
  }); 

})();