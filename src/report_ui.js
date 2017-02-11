import Plotly from 'plotly.js/lib/core';
import randomColors from 'randomcolor';

import styles from './style.css';

Plotly.register([
  require('plotly.js/lib/histogram'),
  require('plotly.js/lib/box'),
]);

class ReportUI {
  static show(data) {
    const plotsContainer = createReportContainer();

    const histogram = getHistograms(data);
    const boxPlots = getBoxPlots(data);

    plotsContainer.appendChild(histogram);
    plotsContainer.appendChild(boxPlots);
  }
}

function getHistograms(data) {
  const plotEl = createPlotEl();
  const colors = randomColors({ count: Object.keys(data).length });

  const plotDefinitions = Object.keys(data).map((eventName, i) => {
    const events = data[eventName];

    return {
      x: events,
      type: 'histogram',
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

  return reportContainer;
}

export default ReportUI;
