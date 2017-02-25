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

    const reportContainer = getReportContainer();
    const plotsContainer = getPlotsContainer();
    reportContainer.appendChild(plotsContainer);

    const closeButton = getCloseButton(function() {
      reportContainer.parentElement.removeChild(reportContainer);
    });

    plotsContainer.appendChild(closeButton);

    plots.forEach((plot) => plotsContainer.appendChild(plot));

    document.body.appendChild(reportContainer);
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

function getReportContainer() {
  const reportContainerEl = document.createElement('div');
  reportContainerEl.classList.add('measurelytics-report');

  return reportContainerEl;
}

function getPlotsContainer() {
  const plotsContainerEl = document.createElement('div');
  plotsContainerEl.classList.add('measurelytics-report__plots');

  return plotsContainerEl;
}

function getCloseButton(onClose) {
  const closeButtonEl = document.createElement('div');
  closeButtonEl.innerText = '×';
  closeButtonEl.classList.add('measurelytics-report__close-button');
  closeButtonEl.addEventListener('click', onClose);

  return closeButtonEl;
}

export default ReportUI;
