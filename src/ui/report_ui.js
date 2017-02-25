import Plotly from 'plotly.js/lib/core';
import randomColors from 'randomcolor';

import styles from './style.css';

import renderHistogram from './plots/render_histogram.js';
import renderBoxPlots from './plots/render_box_plots.js';

Plotly.register([
  require('plotly.js/lib/histogram'),
  require('plotly.js/lib/box'),
]);

const PLOT_TYPES = {
  histogram: {
    renderer: renderHistogram,
    displayName: 'Histogram',
  },
  boxPlots: {
    renderer: renderBoxPlots,
    displayName: 'Box Plots',
  },
};

const DEFAULT_PLOT_TYEP = 'histogram';

class ReportUI {
  static show(historyByEvent) {
    const plots = Object.keys(historyByEvent)
      .map(eventName => [eventName, historyByEvent[eventName]])
      .map(getPlotsForEventType);

    const plotsContainer = createReportContainer();
    plots.forEach((plot) => plotsContainer.appendChild(plot));
  }
}

function getPlotsForEventType([eventName, eventsHistory]) {
  const eventContainer = document.createElement('div');
  eventContainer.className = 'measurelytics-report-event';

  const titleEl = document.createElement('h2');
  titleEl.innerText = eventName;
  titleEl.className = 'measurelytics-report-event__title';
  eventContainer.appendChild(titleEl);

  const plotContainerEl = document.createElement('div');
  eventContainer.appendChild(plotContainerEl);

  const deafultPlotRenderer = PLOT_TYPES[DEFAULT_PLOT_TYEP].renderer;
  const deafultPlotEl = deafultPlotRenderer(eventsHistory);

  plotContainerEl.appendChild(deafultPlotEl);

  const menu = getMenu(changePlot.bind(null, eventsHistory, plotContainerEl));
  eventContainer.appendChild(menu);

  return eventContainer;
}

function changePlot(data, plotContainerEl, plotType) {
  const plotGetter = PLOT_TYPES[plotType].renderer;
  const plotEl = plotGetter(data);

  plotContainerEl.removeChild(plotContainerEl.firstChild);
  plotContainerEl.appendChild(plotEl);
}

function getMenu(onPlotChange) {
  const menuEl = document.createElement('select');
  menuEl.classList.add('measurelytics-plot-menu');

  Object.keys(PLOT_TYPES).reduce((menuEl, plotType) => {
    const menuItemEl = document.createElement('option');
    menuItemEl.innerText = PLOT_TYPES[plotType].displayName;
    menuItemEl.value = plotType;
    menuItemEl.classList.add('measurelytics-plot-menu__item');


    menuEl.appendChild(menuItemEl);

    return menuEl;
  }, menuEl);

  menuEl.addEventListener('change', (e) => onPlotChange(e.target.value));

  return menuEl;
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
