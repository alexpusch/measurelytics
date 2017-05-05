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
      histnorm: 'probability',
      name: date,
      marker: {
        color: '#3f51b5',
      },
      nbinx: 100,
      opacity: 0.15 + (index * (0.85 / historyLength)),
    };
  })

  const layout = {
    bargap: 0.05,
    bargroupgap: 0.2,
    // barmode: "overlay",
    title: "Sampled Results",
    xaxis: {title: "Event duration (ms)"},
    yaxis: {title: "% of events"}
  };

  Plotly.newPlot(plotEl, plotDefinitions, layout);

  return plotEl;
}

function createPlotEl() {
  const plotEl = document.createElement('div');
  plotEl.setAttribute('width', '300px');
  plotEl.setAttribute('height', '300px');

  return plotEl;
}

export default renderHistograms;
