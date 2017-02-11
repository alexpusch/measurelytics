import Plotly from 'plotly.js/lib/core';
import randomColors from 'randomcolor';

import styles from './style.css';

Plotly.register([
  require('plotly.js/lib/histogram'),
  require('plotly.js/lib/box'),
]);

class ReportUI {
  static show(history) {
    const historyByEvent = getHistoryByEvent(history);

    const plots = Object.keys(historyByEvent)
      .map(eventName => [eventName, historyByEvent[eventName]])
      .map(getPlotsForEventHistory);

    const plotsContainer = createReportContainer();
    plots.forEach((plot) => plotsContainer.appendChild(plot));
  }
}

function getPlotsForEventHistory([eventName, evnetsHistory]) {
  const eventsContainer = document.createElement('div');
  eventsContainer.className = 'measurelytics-report-event';

  const titleEl = document.createElement('h2');
  titleEl.innerText = eventName;
  titleEl.className = 'measurelytics-report-event__title';
  eventsContainer.appendChild(titleEl);

  const histogramEl = getHistograms(evnetsHistory);

  eventsContainer.appendChild(histogramEl);

  return eventsContainer;
}

function getHistograms(eventsHistory) {
  const plotEl = createPlotEl();
  const historyLength = eventsHistory.length;

  const plotDefinitions = eventsHistory.map(({date, events}, index) => {
    return {
      x: events,
      type: 'histogram',
      name: date,
      marker: {
        color: '#000',
      },
      opacity: 0.3 + (index * (0.7 / historyLength)),
    };
  })

  Plotly.newPlot(plotEl, plotDefinitions);

  return plotEl;
}

function getHistoryByEvent(history) {
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

function getBoxPlots(data) {
  const plotEl = createPlotEl();
  const colors = randomColors({ count: Object.keys(data).length });
  const plotDefinitions = Object.keys(data).map((eventName, i) => {
    const events = data[eventName];

    return {
      x: events,
      type: 'box',
      name: eventName,
      marker: {
        color: colors[i],
        opacity: 0.3,
      },
    };
  });

  Plotly.newPlot(plotEl, plotDefinitions);

  return plotEl;
}

function createPlotEl() {
  const plotEl = document.createElement('div');
  plotEl.setAttribute('width', '300px');
  plotEl.setAttribute('height', '300px');

  return plotEl;
}

function createReportContainer() {
  const reportContainer = document.createElement('div');
  reportContainer.className = 'measurelytics-report';

  const plotsContainer = document.createElement('div');
  plotsContainer.className = 'measurelytics-report__plots';

  reportContainer.appendChild(plotsContainer);

  document.body.appendChild(reportContainer);

  return plotsContainer;
}

export default ReportUI;
