/**
 *
 * Created by zephyre on 4/17/16.
 */

import React from 'react';
import {Paper} from 'material-ui';
import { message, Menu, Dropdown, Icon } from 'antd';
import {CodeSnippet} from '../misc/CodeSnippet';
import {createCollapsedPanel} from '../misc/collapsed';
import R from 'ramda';

const apiUrl = 'https://api.github.com/search/repositories?sort=stars&q=stars:%3E0&order=desc';

const code2b = `
class AsyncDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ready: false, repos: []};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const state = {...this.state, ready: false, repos: []};
    this.setState(state);

    fetch(apiUrl).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const repos = R.map((entry) => {
            return {name: entry['full_name'], url: entry['html_url']};
          })(data['items'] || []);
          const newState = {...state, ready: true, repos};
          this.setState(newState);

          message.success('Fetching repos succeeded.', 2);
        });
      }
    });
  }

  render() {
    const menuItems = R.compose(R.take(10), R.map((repo) => {
      return (
        <Menu.Item key={repo['name']}>
          <a target="_blank" href={repo['url']}>{repo['name']}</a>
        </Menu.Item>
      );
    }))(this.state.repos);

    const menu = (
      <Menu>
        {this.state.ready ? menuItems : [ (
          <Menu.Item key="loading">
            <span><Icon type="loading"/>&nbsp;&nbsp;Loading from GitHub...</span>
          </Menu.Item>
        ) ]}
      </Menu>
    );

    return (
      <div>
        <Dropdown overlay={menu} trigger={[ 'click' ]} onClick={this.handleClick}>
          <a className="ant-dropdown-link" href="#">
            Click to fetch <Icon type="down"/>
          </a>
        </Dropdown>
      </div>
    );
  }
}
`;

const codeHoc = `
const promisedComponent = (fn) =>
  (Component) =>
    (props) => {
      const {...otherProps, children} = props;
      return React.createElement(Component, {...otherProps, promiseFn: fn}, children);
    };

class InnerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ready: false, data: []};
    this.handleClick = this.handleClick.bind(this);
    this.promiseFn = this.props.promiseFn.bind(this);
  }

  handleClick() {
    const state = {...this.state, ready: false, data: []};
    this.setState(state);

    this.promiseFn().then((data) => {
      const newState = {...this.state, ready: Boolean(data), data: data || []};
      this.setState(newState);
      message.success('Fetching repos succeeded.', 2);
    });
  }

  render() {
    const menuItems = R.compose(R.take(10), R.map((repo) =>
      <Menu.Item key={repo['name']}>
        <a target="_blank" href={repo['url']}>{repo['name']}</a>
      </Menu.Item>
    ))(this.state.data);

    const menu = (
      <Menu>
        {this.state.ready ? menuItems : [ (
          <Menu.Item key="loading">
            <span><Icon type="loading"/>&nbsp;&nbsp;Loading from GitHub...</span>
          </Menu.Item>
        ) ]}
      </Menu>
    );

    return (
      <div>
        <Dropdown overlay={menu} trigger={[ 'click' ]} onClick={this.handleClick}>
          <a className="ant-dropdown-link" href="#">
            Click to fetch <Icon type="down"/>
          </a>
        </Dropdown>
      </div>
    );
  }
}

const WrappedComponent = promisedComponent(() =>
  new Promise((resolve, reject) =>
    fetch(apiUrl).then((res) => {
      res.json().then(
        (data) => {       // 获得data
          const repos = R.map((entry) => {
            return {name: entry['full_name'], url: entry['html_url']};
          })(data['items'] || []);
          resolve(repos);
        });
    },
    (err) => {
      reject(err);
    })
  )
)(InnerComponent);
`;

class AsyncDropDown2b extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ready: false, repos: []};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const state = {...this.state, ready: false, repos: []};
    this.setState(state);

    fetch(apiUrl).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const repos = R.map((entry) => {
            return {name: entry['full_name'], url: entry['html_url']};
          })(data['items'] || []);
          const newState = {...state, ready: true, repos};
          this.setState(newState);

          message.success('Fetching repos succeeded.', 2);
        });
      }
    });
  }

  render() {
    const menuItems = R.compose(R.take(10), R.map((repo) => {
      return (
        <Menu.Item key={repo['name']}>
          <a target="_blank" href={repo['url']}>{repo['name']}</a>
        </Menu.Item>
      );
    }))(this.state.repos);

    const menu = (
      <Menu>
        {this.state.ready ? menuItems : [ (
          <Menu.Item key="loading">
            <span><Icon type="loading"/>&nbsp;&nbsp;Loading from GitHub...</span>
          </Menu.Item>
        ) ]}
      </Menu>
    );

    return (
      <div>
        <Dropdown overlay={menu} trigger={[ 'click' ]} onClick={this.handleClick}>
          <a className="ant-dropdown-link" href="#">
            Click to fetch <Icon type="down"/>
          </a>
        </Dropdown>
      </div>
    );
  }
}

const promisedComponent = (fn) =>
  (Component) =>
    (props) => {
      const {...otherProps, children} = props;
      return React.createElement(Component, {...otherProps, promiseFn: fn}, children);
    };

class InnerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ready: false, data: []};
    this.handleClick = this.handleClick.bind(this);
    this.promiseFn = this.props.promiseFn.bind(this);
  }

  handleClick() {
    const state = {...this.state, ready: false, data: []};
    this.setState(state);

    this.promiseFn().then((data) => {
      const newState = {...this.state, ready: Boolean(data), data: data || []};
      this.setState(newState);
      message.success('Fetching repos succeeded.', 2);
    });
  }

  render() {
    const menuItems = R.compose(R.take(10), R.map((repo) =>
      <Menu.Item key={repo['name']}>
        <a target="_blank" href={repo['url']}>{repo['name']}</a>
      </Menu.Item>
    ))(this.state.data);

    const menu = (
      <Menu>
        {this.state.ready ? menuItems : [ (
          <Menu.Item key="loading">
            <span><Icon type="loading"/>&nbsp;&nbsp;Loading from GitHub...</span>
          </Menu.Item>
        ) ]}
      </Menu>
    );

    return (
      <div>
        <Dropdown overlay={menu} trigger={[ 'click' ]} onClick={this.handleClick}>
          <a className="ant-dropdown-link" href="#">
            Click to fetch <Icon type="down"/>
          </a>
        </Dropdown>
      </div>
    );
  }
}

const WrappedComponent = promisedComponent(() =>
  new Promise((resolve, reject) =>
    fetch(apiUrl).then((res) => {
      res.json().then(
        (data) => {       // 获得data
          const repos = R.map((entry) => {
            return {name: entry['full_name'], url: entry['html_url']};
          })(data['items'] || []);
          resolve(repos);
        });
    },
    (err) => {
      reject(err);
    })
  )
)(InnerComponent);

export const AsyncDropDownPanel = (props) => {
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
        {props.sub === '2b' ? <AsyncDropDown2b /> : <WrappedComponent />}
      </Paper>
      {createCollapsedPanel([ {header: 'Source code', component: <CodeSnippet code={code}/>} ])}
    </div>
  );
};
