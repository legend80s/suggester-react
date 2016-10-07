import React from 'react';
import Suggester from './Suggester';
import findChildIndex from '../../utils/findChildIndex';
import './index.less';

export default class Suggesters extends React.Component {
  constructor(props) {
    super(props);

    this.state = { which: -1 };
  }

  hilight(event) {
    // console.log('hilight');
    this.setState({ which: findChildIndex(event.target) });
  }

  render() {
    return (
      <ol className="suggesters center-block" onMouseOver={ this.hilight.bind(this) }>
      {
        this.props.data.map((data, index) => {
          // console.log("this.which in render:", this.state.which);

          const d = index === this.state.which ? Object.assign({ active: true }, data) : data;

          if (this.props.showIndex) {
            return <Suggester original={ this.props.original } data={ d } index={ index + 1 } key={ index } />;
          }

          return <Suggester original={ this.props.original } data={ d } key={ index } />;
        })
      }
      </ol>
    );
  }
}

Suggesters.propTypes = {
  data: React.PropTypes.array.isRequired,
  original: React.PropTypes.string.isRequired,
  showIndex: React.PropTypes.bool.isRequired,
};
