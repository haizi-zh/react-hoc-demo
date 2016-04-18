/**
 *
 * Created by zephyre on 4/16/16.
 */

import React from 'react';
import {mount} from 'react-mounter';
// load Layout and Welcome React components
import {Layout} from './modules/components/Layout';
import {PollingPanel} from './modules/components/panels/PollingPanel';
import {AsyncDropDownPanel} from './modules/components/panels/AsyncDropDownPanel';
import {MeteorDataPanel} from './modules/components/panels/MeteorDataPanel';

FlowRouter.route('/', {
  action() {
    FlowRouter.go('/polling/2b');
  }
});

FlowRouter.route('/:category', {
  action(params) {
    FlowRouter.go(`/${params.category}/2b`);
  }
});

FlowRouter.route("/:category/:sub", {
  action(params) {
    const categories = ['polling', 'async-drop-down', 'meteor-data'];
    const subs = ['2b', 'hoc'];
    const category = params.category;
    const sub = params.sub;

    if (categories.indexOf(category) === -1) {
      FlowRouter.go('/polling/2b');
    } else {
      if (subs.indexOf(sub) === -1) {
        FlowRouter.go(`/${category}/2b`);
      } else {
        const panelDict = {
          'polling': PollingPanel,
          'async-drop-down': AsyncDropDownPanel,
          'meteor-data': MeteorDataPanel
        };

        const panel = panelDict[category] || 'div';

        mount(Layout, {
          content: (
            <div style={{minHeight: 400}}>
              {React.createElement(panel, {sub})}
            </div>
          ),
          category,
          sub
        });
      }
    }
  }
});
