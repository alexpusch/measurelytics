import Plotly from 'plotly.js/lib/core';

Plotly.register([
  require('plotly.js/lib/histogram'),
]);

function renderHistograms(eventsHistory) {
  const plotEl = createPlotEl();
  const historyLength = eventsHistory.length;

  const plotDefinitions = eventsHistory.map(({ date, events }, index) => {
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

function createPlotEl() {
  const plotEl = document.createElement('div');
  plotEl.setAttribute('width', '300px');
  plotEl.setAttribute('height', '300px');

  return plotEl;
}

export default renderHistograms;
