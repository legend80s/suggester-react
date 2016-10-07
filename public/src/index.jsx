import React from 'react';
import ReactDOM from 'react-dom';
import jsonp from 'fetch-jsonp';
import 'bootstrap/dist/css/bootstrap.min.css';

import hosts from './config/hosts';
import Suggesters from './components/Suggesters';
import './index.less';

class SuggesterBox extends React.Component {
  constructor(props) {
    super(props);

    const choice = hosts.find(host => host.default).id;
    this.state = { data: [], showIndex: true, value: '', choice };
  }

  static getParameters(choice, value) {
    const host = hosts.find(h => h.id === choice);
    const suggesterUrls = host.urls.suggesters;

    let url = '';
    if (!value) {
      url = suggesterUrls[0];
    } else {
      url = (suggesterUrls.length === 1 ? suggesterUrls[0] : suggesterUrls[1]) + value;
    }

    return {
      url,
      href: host.urls.href,
      process: host.process,
      jsonpCallback: host.jsonpCallback,
    };
  }

  static _fetch(url, jsonpCallback) {
    return jsonp(url, { jsonpCallback })
      .then(res => res.json())
      .catch(error => console.error(`Fetch ${url}`, error));
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const { url, href, process, jsonpCallback } = SuggesterBox.getParameters(this.state.choice, this.state.value);

    SuggesterBox._fetch(url, jsonpCallback)
      .then(process)
      .then((data) => {
        this.setState({
          data: data.map(d => ({ href, result: d })),
        });
      });
  }

  handleInput(event) {
    const value = event.target.value.trim();

    this.setState({ showIndex: !value, value }, this.fetch);
  }

  makeChoice(e) {
    this.setState({ choice: e.target.value }, this.fetch);
  }

  render() {
    return (
      <div className="suggester-box container center-block">
        <form className="center-block" role="form">
          <input type="text" className="form-control" onChange={ this.handleInput.bind(this) } />

          <select value={ this.state.choice } className="form-control" onChange={ this.makeChoice.bind(this) }>
            {
              hosts.map(host =>
                <option value={ host.id } key={ host.id }>{ host.name }</option>
              )
            }
          </select>
        </form>

        <Suggesters
          original={ this.state.value }
          data={ this.state.data }
          showIndex={ this.state.showIndex }
        />
      </div>
    );
  }
}

SuggesterBox.propTypes = {
  url: React.PropTypes.string,
  initialUrl: React.PropTypes.string,
  searchUrl: React.PropTypes.string,
};

ReactDOM.render(
  <SuggesterBox />,

  document.getElementById('app')
);
