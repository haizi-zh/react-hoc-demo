/**
 *
 * Created by zephyre on 4/16/16.
 */

import hljs from 'Highlight.js';
import React from 'react';
import ReactDOM from 'react-dom';

export const Highlight = React.createClass({
  displayName: 'Highlight',

  getDefaultProps: function getDefaultProps() {
    return {
      innerHTML: false,
      className: null
    };
  },
  componentDidMount: function componentDidMount() {
    this.highlightCode();
  },
  componentDidUpdate: function componentDidUpdate() {
    this.highlightCode();
  },
  highlightCode: function highlightCode() {
    var domNode = ReactDOM.findDOMNode(this);
    var nodes = domNode.querySelectorAll('pre code');
    if (nodes.length > 0) {
      for (var i = 0; i < nodes.length; i++) {
        hljs.highlightBlock(nodes[i]);
      }
    }
  },
  render: function render() {
    if (this.props.innerHTML) {
      return React.createElement('div', {
        dangerouslySetInnerHTML: { __html: this.props.children },
        className: this.props.className || null
      });
    }
    return React.createElement(
      'pre',
      null,
      React.createElement(
        'code',
        { className: this.props.className },
        this.props.children
      )
    );
  }
});
