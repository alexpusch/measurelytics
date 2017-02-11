class Measurements {
  constructor() {
    this.data = {};
  }

  start(eventName) {
    let events = this.data[eventName];

    if (!events) {
      events = [];
      this.data[eventName] = events;
    }

    const newEvent = [now()];

    events.push(newEvent);
  }

  end(eventName) {
    const events = this.data[eventName];

    if (!events) {
      throw new Error(`Trying to end event ${eventName} before it was started`);
    }
    const currentEvent = events[events.length - 1];

    currentEvent[1] = now();
  }

  getData() {
    return tranformEventsMapToDiffs(this.data);
  }
}

function now() {
  return window.performance.now();
}

function tranformEventsMapToDiffs(data) {
  const result = {};

  Object.keys(data).forEach((eventName) => {
    const events = data[eventName];
    result[eventName] = transformEventsToDiffs(events);
  });

  return result;
}

function transformEventsToDiffs(events) {
  return events.map(event => event[1] - event[0]);
}

export default Measurements;
