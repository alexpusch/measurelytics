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

class History {
  static store(data) {
    console.log('data', data)
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
    window.localStorage.setItem('measurelytics-history', serializedHistory);
  }

  static get() {
    const serializedHistory = window.localStorage.getItem('measurelytics-history');

    if (!serializedHistory) {
      return [];
    } else {
      return JSON.parse(serializedHistory);
    }
  }
}

export default History;

