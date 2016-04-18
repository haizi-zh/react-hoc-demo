/**
 *
 * Created by zephyre on 4/17/16.
 */

import React from 'react';
import {Collapse} from 'antd';
const Panel = Collapse.Panel;
import R from 'ramda';

export const createCollapsedPanel = (panelList) => {
  // panelList: [ { header: '', component: ... } ]

  const createPanel = ({header, component, key}) => (
    <Panel header={header} key={key}>
      {component}
    </Panel>
  );

  for (let i = 0; i < panelList.length; i++) {
    panelList[i].key = (i + 1).toString();
  }

  return (
    <div style={{maxWidth: 840}}>
      <Collapse>
        {R.map(createPanel, panelList)}
      </Collapse>
    </div>
  );
};
