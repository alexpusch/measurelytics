import Measurements from './measurements';
import ReportUI from './report_ui';
import History from './history';

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

    const history = History.get();
    ReportUI.show(history);
  }
}

export default Measurelytics;
