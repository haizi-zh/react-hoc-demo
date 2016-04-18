/**
 *
 * Created by zephyre on 4/17/16.
 */

import React from 'react';
import { Paper, FlatButton } from 'material-ui';
import { CodeSnippet } from '../misc/CodeSnippet';
import { createCollapsedPanel } from '../misc/collapsed';
// import { compose } from 'react-komposer';

const code2b = `
class PollingDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount || 0};
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState({count: this.state.count + 1});
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, this.props.interval || 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <FlatButton label={\`Count: \${this.state.count}\`} secondary={true}/>
    );
  }
}
`;

const codeHoc = `
const intervaledComponent = (tickFn, interval) =>
  (Component) => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.tick = tickFn.bind(this);
        this.state = {};
      }

      componentDidMount() {
        this.timer = setInterval(this.tick, interval);
      }

      componentWillUnmount() {
        if (this.timer) {
          clearInterval(this.timer);
        }
      }

      render() {
        const {children, ...otherProps} = this.props;
        const innerProps = {...otherProps, ...this.state};
        return React.createElement(Component, innerProps, children);
      }
    }
    return Wrapper;
  };

const InnerComponent = (props) =>
  <FlatButton label={\`Count: \${props.count || 0}\`} secondary={true}/>;

const WrappedComponent = intervaledComponent(
  function () {
    this.setState({count: (this.state.count || 0) + 1});
  }, 1000)(InnerComponent);
`;

class PollingDemo2b extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount || 0};
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState({count: this.state.count + 1});
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, this.props.interval || 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <FlatButton label={`Count: ${this.state.count}`} secondary={true}/>
    );
  }
}

const intervaledComponent = (tickFn, interval) =>
  (Component) => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.tick = tickFn.bind(this);
        this.state = {};
      }

      componentDidMount() {
        this.timer = setInterval(this.tick, interval);
      }

      componentWillUnmount() {
        if (this.timer) {
          clearInterval(this.timer);
        }
      }

      render() {
        const {children, ...otherProps} = this.props;
        const innerProps = {...otherProps, ...this.state};
        return React.createElement(Component, innerProps, children);
      }
    }
    return Wrapper;
  };

const InnerComponent = (props) =>
  <FlatButton label={`Count: ${props.count || 0}`} secondary={true}/>;

const WrappedComponent = intervaledComponent(
  function () {
    this.setState({count: (this.state.count || 0) + 1});
  }, 1000)(InnerComponent);

// // react-komposer way
// const KomposedComponent = compose((props, onData) => {
//   let count = 0;
//   onData(null, {count});
//   const handle = setInterval(() => {
//     count += 1;
//     onData(null, {count});
//   }, 1000);
//
//   return () => clearInterval(handle);
// })(InnerComponent);

export const PollingPanel = (props) => {
  // 根据sub决定显示哪一段代码
  let code;
  switch (props.sub) {
    case '2b':
      code = code2b;
      break;
    case 'hoc':
      code = codeHoc;
      break;
    default:
      break;
  }

  return (
    <div>
      <Paper style={{padding: 20, marginBottom: 40, maxWidth: 600, borderRadius: 5,
                     backgroundColor: '#f8f8f8'}}
             zDepth={2}>
        {props.sub === '2b' ? <PollingDemo2b /> : <WrappedComponent />}
      </Paper>
      {createCollapsedPanel([ {header: 'Source code', component: <CodeSnippet code={code}/>} ])}
    </div>
  );
};
