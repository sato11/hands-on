import React            from 'react';
import ReactDOM         from 'react-dom';
import createReactClass from 'create-react-class';

const headers = [
  'Title', 'Author', 'Language', 'Published', 'Sales'
];

const data = [
  ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954–1955", "150 million"],
  ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"],
  ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"],
  ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],
  ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754–1791", "100 million"],
  ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"],
  ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"],
];

const Excel = React.createClass({
  displayName: 'Excel',
  propTypes: {
    headers: React.PropTypes.arrayOf(
      React.PropTypes.string
    ),
    initialData: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(
        React.PropTypes.string
      )
    ),
  },
  _preSearchData: null,
  _log: [],

  _logSetState: function(newState) {
    this._log.push(JSON.parse(JSON.stringify(
      this._log.length === 0 ? this.state : newState
    )));
    this.setState(newState);
  },

  componentDidMount: function() {
    document.onkeydown = function(e) {
      if (e.altKey && e.shiftKey && e.keyCode === 82) {
        this._replay();
      }
    }.bind(this);
  },

  _replay: function() {
    if (this._log.length === 0) {
      console.warn('No state is logged.');
      return;
    }
    let id = -1;
    const interval = setInterval(function() {
      id++;
      if (id === this._log.length - 1) {
        clearInterval(interval);
      }
      this.setState(this._log[id]);
    }.bind(this), 1000);
  },

  getInitialState: function() {
    return {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null,
      search: false,
    };
  },

  _sort: function(e) {
    const column = e.target.cellIndex;
    const descending = this.state.sortby === column && !this.state.descending
    const data = this.state.data.slice();
    data.sort( (a, b) => {
      return descending
        ? (a[column] < b[column] ? 1 : -1)
        : (a[column] > b[column] ? 1 : -1);
    });
    this._logSetState({
      data: data,
      sortby: column,
      descending: descending,
    });
  },

  _showEditor: function(e) {
    this._logSetState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex,
      }
    });
  },

  _save: function(e) {
    e.preventDefault();
    const input = e.target.firstChild;
    const data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this._logSetState({
      edit: null,
      data: data,
    })
  },

  _toggleSearch: function() {
    if (this.state.search) {
      this._logSetState({
        data: this._preSearchData,
        search: false,
      });
      this._preSearchData = null;
    } else {
      this._preSearchData = this.state.data;
      this._logSetState({
        search: true,
      });
    }
  },

  _search: function(e) {
    const needle = e.target.value.toLowerCase();
    if (!needle) {
      this._logSetState({ data: this._preSearchData });
      return;
    }
    const id = e.target.dataset.id;
    const searchData = this._preSearchData.filter( row => {
      return row[id].toString().toLowerCase().indexOf(needle) > -1;
    });
    this._logSetState({ data: searchData });
  },

  download: function(format, ev) {
    const contents = format === 'json'
      ? JSON.stringify(this.state.data)
      : this.state.data.reduce((result, row) => {
        return result
          + row.reduce((rowResult, cell, id) => {
            return rowResult
              + '"'
              + cell.replace(/"/g, '""')
              + '"'
              + (id < row.length - 1 ? ',' : '');
          }, '')
          + "\n";
      }, '');

    const URL = window.URL || window.webkitURL;
    const blob = new Blob([contents], { type: `text/${format}` });
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = `data.${format}`
  },

  render: function() {
    return (
      <div>
        { this._renderToolbar() }
        { this._renderTable() }
      </div>
    );
  },

  _renderToolbar: function() {
    return (
      <div className="toolbar">
        <button onClick={ this._toggleSearch }>検索</button>
        <a onClick={ this.download.bind(this, 'json') } href="data.json">JSONで保存</a>
        <a onClick={ this.download.bind(this, 'csv') } href="data.csv">CSVで保存</a>
      </div>
    );
  },

  _renderTable: function() {
    return (
      <table>
        <thead onClick={ this._sort }>
          <tr>
            { this.props.headers.map( (title, i) => {
              if (this.state.sortby == i) {
                title += this.state.descending ? ' \u2191' : '\u2193'
              }
              return (
                <th key={ i }>{ title }</th>
              )
            }, this)}
          </tr>
        </thead>
        <tbody onDoubleClick={ this._showEditor }>{
          this._renderSearch(),
          this.state.data.map( (row, rowId) => {
            return (
              <tr key={ rowId }>
                { row.map( (cell, i) => {
                  let content = cell;
                  const edit = this.state.edit;
                  if (edit && edit.row === rowId && edit.cell === i) {
                    content =
                      <form onSubmit={ this._save }>
                        <input type="text" defaultValue={ content } />
                      </form>
                  }
                  return (
                    <td key={ i } data-row={ rowId }>
                      { content }
                    </td>
                  )
                }, this)}
              </tr>
            )
          }, this)}
        </tbody>
      </table>
    )
  },

  _renderSearch: function() {
    if (!this.state.search) { return null; }
    return (
      <tr onChange={ this._search }>
        { this.props.headers.map((_ignore, id) => {
          return (
            <td key={ id }>
              <input type="text" data-id={ id } />
            </td>
          );
        })}
      </tr>
    )
  },
});

ReactDOM.render(
  <Excel headers={ headers } initialData={ data }></Excel>,
  document.getElementById('app')
);
