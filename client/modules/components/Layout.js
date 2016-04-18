/**
 *
 * Created by zephyre on 4/16/16.
 */

import React from 'react';
import { Menu, Icon } from 'antd';
import { FlowRouter } from 'meteor/kadira:flow-router';
const SubMenu = Menu.SubMenu;

const MenuItem = (props) => {
  const {children, ...otherProps} = props;
  otherProps.onClick = () => {
    const pattern = /^(.+)-(2b|hoc)$/;
    const result = pattern.exec(props.eventKey);

    if (result) {
      const category = result[1];
      const sub = result[2];
      FlowRouter.go(`/${category}/${sub}`);
    }
  };

  return React.createElement(Menu.Item, otherProps, children);
};

// define and export our Layout component
export const Layout = ({content, category, sub}) => {
  return (
    <div className="ant-layout-aside">
      <aside className="ant-layout-sider">
        <Menu mode="inline" theme="dark"
              defaultSelectedKeys={[ `${category}-${sub}` ]} defaultOpenKeys={[ category ]}>
          <SubMenu key="polling" title={<span><Icon type="clock-circle-o" />定时任务</span>}>
            <MenuItem key="polling-2b">菜鸟作法</MenuItem>
            <MenuItem key="polling-hoc">高阶组件</MenuItem>
          </SubMenu>
          <SubMenu key="async-drop-down" title={<span><Icon type="reload" />异步加载列表</span>}>
            <MenuItem key="async-drop-down-2b">菜鸟作法</MenuItem>
            <MenuItem key="async-drop-down-hoc">高阶组件</MenuItem>
          </SubMenu>
          <SubMenu key="meteor-data" title={<span><Icon type="cloud-download-o" />Meteor订阅</span>}>
            <MenuItem key="meteor-data-2b">菜鸟作法</MenuItem>
            <MenuItem key="meteor-data-hoc">高阶组件</MenuItem>
          </SubMenu>
        </Menu>
      </aside>
      <div className="ant-layout-main">
        <div className="ant-layout-container">
          <div className="ant-layout-content">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};
