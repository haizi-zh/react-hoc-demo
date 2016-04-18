/**
 *
 * Created by zephyre on 4/17/16.
 */

import React from 'react';
import {Paper} from 'material-ui';
import {Highlight} from './Highlight';

export const CodeSnippet = (props) => {
  return (
    <Paper style={{padding: 20, maxWidth: 800, borderRadius: 5,
                   backgroundColor: '#f8f8f8'}} zDepth={4}>
      <Highlight className="javascript">
        {(props || {}).code}
      </Highlight>
    </Paper>
  );
};

