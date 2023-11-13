import {LitElement, html, css} from 'lit';
import {ChallengeDataService} from './ChallengeDataService.js';

export class ChallengeTable extends LitElement {
  static get styles() {
    return css`
    :host {
      color: #4DD0E1;
      font-family: 'Roboto', sans-serif;
    }
    h1 {
      text-align: center;
      color: #00BCD4;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 0 auto;
      border: 1px solid #00BCD4;
      box-shadow: 0 0 20px rgba(0,0,0,0.15);
    }
    thead th {
      position: sticky;
      top: 0;
      background: white; /* add a background color to the headers */
      z-index: 10; /* optional: raise the z-index to make sure it's on top */
    }
    td {
      padding: 10px;
      border: 1px solid #00BCD4;
      text-align: center;
    }
    div {
      overflow-y: scroll;
      overflow-x: hidden;
      max-height: 200px;
      margin: 0 20 0 20;
    }
    tr:nth-child(even) {
      background-color: #E0F7FA;
    }
    tr:hover {
      transform: scale(1.02);
      transition: transform .2s;
    }
    button {
      background-color: #00BCD4;
      color: white;
      border: none;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      transition-duration: 0.4s;
      cursor: pointer;
    }
    button:hover {
      background-color: white;
      color: #00BCD4;
    }
    @media screen and (max-width: 600px) {
      table {
        width: 100%;
      }
      td {
        font-size: 14px;
      }
      button {
        padding: 10px;
        font-size: 14px;
      }
    `;
  }

  static get properties() {
    return {
      // Feel free to refactor, change type, name, etc
      tableName: { type: String },
      data: { type: Array },
    };
  }

  // Updates the table and chart with the new data set
  updateProperties(size) {
    this.activeDataset = size;
    this.dataService.getDataSet(this.activeDataset).then((dataSet) => {
      this.tableName = dataSet.name;
      this.data = dataSet.xColumn.values.map((x, i) => [x, dataSet.yColumn.values[i]]);
      this.updateChallengeChart(this.data);
    });
  }

  updateChallengeChart(chartData) {
    const challengeChart = document.querySelector('challenge-chart');
    challengeChart.data = chartData;
  }

  startStreaming() {
    // Updates table and chart every second
    this.dataService.startStreaming(1, (xValue, yValue) => {
      this.data = [...this.data, [xValue, yValue]];
      this.tableName = 'Streaming';
      this.updateChallengeChart(this.data);
    });
  };

  // Clears all the data from the table and chart
  clearData() {
    this.data = [];
    this.updateChallengeChart(this.data);
  }

  constructor() {
    super();
    this.tableName = '';
    this.data = [];
    this.activeDataset = 'small';
    this.dataService = new ChallengeDataService();
    this.updateProperties(this.activeDataset);
  }

  render() {
    return html`
      <h1 id="table-title">${this.tableName}</h1>
      <select @change="${(e) => this.updateProperties(e.target.value)}" aria-labelledby="table-title">
        <option value="small"> Small </option>
        <option value="medium"> Medium </option>
        <option value="large"> Large </option>
      </select>
      <button @click="${() => this.startStreaming()}" role="button"> Start Streaming </button>
      <button @click="${() => this.dataService.stopStreaming()}" role="button"> Stop Streaming </button>
      <button @click="${() => this.clearData()}" role="button"> Clear Data </button>
      <div>
        ${this.data.length ? html`
          <table>
            <thead>
              <th> X </th>
              <th> Y </th>
            </thead>
            <tbody>
              ${this.data.map((dataRow) => html`
                <tr>
                  <td>${dataRow[0]}</td>
                  <td>${dataRow[1]}</td>
                </tr>
              `)}
            </tbody>
          </table>
        ` : html`<h1> No Data </h1>`}
      </div>
    `;
  }
}
window.customElements.define("challenge-table", ChallengeTable);