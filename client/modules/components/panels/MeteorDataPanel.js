/**
 *
 * Created by zephyre on 4/17/16.
 */

import React from 'react';
import { message, Checkbox, Row, Icon } from 'antd';
import {Paper} from 'material-ui';
import {Tasks} from '/imports/api/tasks';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { composeWithTracker } from 'react-komposer';
import { createCollapsedPanel } from '../misc/collapsed';
import { CodeSnippet } from '../misc/CodeSnippet';
import R from 'ramda';

const code2b =
`
const MeteorData = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const handle = Meteor.subscribe('tasks');
    return {
      loading: !handle.ready(),
      tasks: Tasks.find().fetch()
    };
  },

  handleChange(taskId) {
    if (!this.data.loading) {
      const task = R.find((task) => task._id.toHexString() === taskId, this.data.tasks || []);
      if (task) {
        Meteor.call('tasks.setChecked', taskId, !task.checked);
      }
    }
  },

  render() {
    const createTask = (taskEntry) => {
      const checked = !!taskEntry.checked;
      const taskId = taskEntry._id.toHexString();

      return (
        <Row key={taskId} style={{margin: 10}}>
          <label>
            <Checkbox checked={checked} onChange={this.handleChange.bind(this, taskId)} />
            <span>
              {checked ? <del>{taskEntry.desc}</del> : taskEntry.desc}
            </span>
          </label>
        </Row>
      );
    };

    const contents = this.data.loading ? <Icon type="loading" /> : R.map(createTask, this.data.tasks);

    return (
      <div>{contents}</div>
    );
  }
});
`;

const codeHoc =
`
const composer = (props, onData) => {
  const handle = Meteor.subscribe('tasks');
  const ready = handle.ready();
  const tasks = ready ? Tasks.find().fetch() : [];
  onData(null, {loading: !ready, tasks})
};

class InnerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(taskId) {
    if (!this.props.loading) {
      const task = R.find((task) => task._id.toHexString() === taskId, this.props.tasks || []);
      if (task) {
        Meteor.call('tasks.setChecked', taskId, !task.checked);
      }
    }
  }

  render() {
    const createTask = (taskEntry) => {
      const checked = !!taskEntry.checked;
      const taskId = taskEntry._id.toHexString();

      return (
        <Row key={taskId} style={{margin: 10}}>
          <label>
            <Checkbox checked={checked} onChange={this.handleChange.bind(this, taskId)} />
            <span>
              {checked ? <del>{taskEntry.desc}</del> : taskEntry.desc}
            </span>
          </label>
        </Row>
      );
    };

    const contents = this.props.loading ? <Icon type="loading" /> : R.map(createTask, this.props.tasks);

    return (
      <div>{contents}</div>
    );
  }
}

const WrappedComponent = composeWithTracker(composer)(InnerComponent);
`;

const MeteorData2b = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const handle = Meteor.subscribe('tasks');
    return {
      loading: !handle.ready(),
      tasks: Tasks.find().fetch()
    };
  },

  handleChange(taskId) {
    if (!this.data.loading) {
      const task = R.find((task) => task._id.toHexString() === taskId, this.data.tasks || []);
      if (task) {
        Meteor.call('tasks.setChecked', taskId, !task.checked, (err, res) => {
          if (!err) {
            message.success('Task list updated.', 2);
          }
        });
      }
    }
  },

  render() {
    const createTask = (taskEntry) => {
      const checked = !!taskEntry.checked;
      const taskId = taskEntry._id.toHexString();

      return (
        <Row key={taskId} style={{margin: 10}}>
          <label>
            <Checkbox checked={checked} onChange={this.handleChange.bind(this, taskId)} />
            <span>
              {checked ? <del>{taskEntry.desc}</del> : taskEntry.desc}
            </span>
          </label>
        </Row>
      );
    };

    const contents = this.data.loading ? <Icon type="loading" /> : R.map(createTask, this.data.tasks);

    return (
      <div>{contents}</div>
    );
  }
});

const composer = (props, onData) => {
  const handle = Meteor.subscribe('tasks');
  const ready = handle.ready();
  const tasks = ready ? Tasks.find().fetch() : [];
  onData(null, {loading: !ready, tasks})
};

class InnerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(taskId) {
    if (!this.props.loading) {
      const task = R.find((task) => task._id.toHexString() === taskId, this.props.tasks || []);
      if (task) {
        Meteor.call('tasks.setChecked', taskId, !task.checked, (err, res) => {
          if (!err) {
            message.success('Task list updated.', 2);
          }
        });
      }
    }
  }

  render() {
    const createTask = (taskEntry) => {
      const checked = !!taskEntry.checked;
      const taskId = taskEntry._id.toHexString();

      return (
        <Row key={taskId} style={{margin: 10}}>
          <label>
            <Checkbox checked={checked} onChange={this.handleChange.bind(this, taskId)} />
            <span>
              {checked ? <del>{taskEntry.desc}</del> : taskEntry.desc}
            </span>
          </label>
        </Row>
      );
    };

    const contents = this.props.loading ? <Icon type="loading" /> : R.map(createTask, this.props.tasks);

    return (
      <div>{contents}</div>
    );
  }
}

const WrappedComponent = composeWithTracker(composer)(InnerComponent);

export const MeteorDataPanel = (props) => {
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
      break
  }

  return (
    <div>
      <Paper style={{padding: 20, marginBottom: 40, maxWidth: 600, borderRadius: 5, backgroundColor: '#f8f8f8'}}
             zDepth={2}>
        {props.sub === '2b' ? <MeteorData2b /> : <WrappedComponent />}
      </Paper>
      {createCollapsedPanel([{header: 'Source code', component: <CodeSnippet code={code}/>}])}
    </div>
  );
};
