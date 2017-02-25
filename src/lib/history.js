// [
//   {
//     date: ....
//     data: {
//       e1: [...]
//       e2: [...]
//     }
//   }
// ]

const HISTORY_LENGTH = 6;
const LOCAL_STORAGE_KEY = 'measurelytics-history';

class History {
  static store(data) {
    let history = this.get();

    const entry = {
      date: new Date(),
      data,
    };

    history.push(entry);

    if (history.length > HISTORY_LENGTH) {
      history = history.slice(1);
    }

    const serializedHistory = JSON.stringify(history);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, serializedHistory);
  }

  static get() {
    const serializedHistory = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!serializedHistory) {
      return [];
    } else {
      return JSON.parse(serializedHistory);
    }
  }

  static clear() {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}

export default History;

