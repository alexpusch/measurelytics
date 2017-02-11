import Measurements from './measurements.js';
import ReportUI from './report_ui.js';

const measurements = new Measurements();

class Measurelytics {
  static start() {
    return measurements.start(...arguments);
  }

  static end() {
    return measurements.end(...arguments);
  }

  static showReport() {
    ReportUI.show(measurements.getData());
  }
}

export default Measurelytics;
