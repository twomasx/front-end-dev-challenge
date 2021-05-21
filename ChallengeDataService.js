class ChallengeDataColumn {
  constructor(name, values) {
    this._name = name;
    this._values = values;
  }

  get name() {
    return this._name;
  }

  get values() {
    return this._values;
  }
}

class ChallengeDataSet {
  constructor(name, xColumn, yColumn) {
    this._name = name;
    this._xColumn = xColumn;
    this._yColumn = yColumn;
  }

  get name() {
    return this._name;
  }

  get xColumn() {
    return this._xColumn;
  }

  get yColumn() {
    return this._yColumn;
  }
}

const delay = async (ms) => {
  return new Promise((accept) => {
    setTimeout(accept, ms);
  });
}

export class ChallengeDataService {

  /*
   Fetch a dataset.
   This function is intended to simulate an asynchronous operation and provide
   the caller with the requested dataset.
   * @param {string} which dataset to retrieve: 'small', 'medium', 'large'
   *
   * @returns Promise<ChallengeDataSet>
  */
  async getDataSet(which) {
    let count = 0;

    if (which === 'small') {
      count = 10;
    } else if (which === 'medium') {
      count = 100;
    } else if (which === 'large') {
      count = 1000;
     } else {
      throw new Error('Invalid argument passed to getDataSet');
    }

    let x = 0;
    const xValues = [];
    const yValues = [];
    for (let i = 0; i < count; ++i) {
      xValues.push(x);
      yValues.push(Math.sin(x));
      x += 2*Math.PI/count;
    }

    const xColumn = new ChallengeDataColumn('x', xValues);
    const yColumn = new ChallengeDataColumn('y', yValues);

    // simulte this taking time
    await delay(Math.random() * 500);

    return new ChallengeDataSet(`DataSet-${which}`, xColumn, yColumn);
  }
}
