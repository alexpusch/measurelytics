
function pivotHistoryByEvent(history) {
  // {
  //   eventName: [{
  //     date: ...
  //     events: [...]
  //   }]
  // }

  return history.reduce((result, value) => {
    const { date, data } = value;

    Object.keys(data).forEach((eventName) => {
      const events = data[eventName];
      const eventsEntires = result[eventName] || [];

      eventsEntires.push({ date, events });
      result[eventName] = eventsEntires;
    });

    return result;
  }, {});
}

export default pivotHistoryByEvent;
