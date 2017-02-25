import Measurements from './lib/measurements';
import History from './lib/history';
import pivotHistoryByEvent from './lib/pivot_history_by_event.js';

import ReportUI from './ui/report_ui';

const measurements = new Measurements();

class Measurelytics {
  static start() {
    return measurements.start(...arguments);
  }

  static end() {
    return measurements.end(...arguments);
  }

  static showReport() {
    const data = measurements.getData();
    History.store(data);

    const historyByEvent = pivotHistoryByEvent(History.get());
    ReportUI.show(historyByEvent);
  }

  static clearHistory() {
    History.clear();
  }
}

export default Measurelytics;
