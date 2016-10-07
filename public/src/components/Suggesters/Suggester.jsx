import React from 'react';

export default class Suggester extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active: '' };
  }

  /**
   * ('M', 'Mother') => 'M<b>other</b>'
   * ('m', 'Mother') => 'Mother'
   * @param  {string} keyword
   * @param  {string} str
   * @return {string}
   */
  static mark(keyword, str) {
    const regexp = new RegExp(`^(${keyword})(.*)`);
    const matches = str.match(regexp);

    let head = '';
    let tail = '';

    if (matches !== null) {
      head = matches[1];
      tail = matches[2];
    } else {
      head = str;
      tail = '';
    }

    return {
      head,
      tail,
    };
  }

  toResultPage() {
    const data = this.props.data;

    if (!data.href) {
      return;
    }

    window.open(`${data.href}${data.result}`, '_blank');
  }

  render() {
    const props = this.props;
    const index = props.index;
    const data = props.data;

    const active = data.active ? 'active' : '';

    if (typeof index !== 'undefined') {
      const className = index < 4 ? `rank top${index}` : 'rank';

      return (
        <li onClick={ this.toResultPage.bind(this) } className={ active }>
          <span className={ className }>
            { index }
          </span>
          { data.result }
        </li>
      );
    }

    const { head, tail } = Suggester.mark(props.original, data.result);

    return (
      <li onClick={ this.toResultPage.bind(this) } className={ active }>
        { head }<b>{ tail }</b>
      </li>
    );
  }
}

Suggester.propTypes = {
  index: React.PropTypes.number,
  original: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired,
};
