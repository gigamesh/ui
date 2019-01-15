import { storiesOf } from '@storybook/react';
import React from 'react';

import { ActionPanel } from 'src/molecules';
import List from './List';

const children = ['Foo', 'Bar', 'Baz'];
const listData = [
  {
    term: 'Address',
    definition: 'Some Address',
  },
  {
    term: 'Address',
    definition: 'Another Address',
  },
];

storiesOf('Molecules', module).add('List', () => (
  <React.StrictMode>
    {[
      {},
      { basic: true },
      { ordered: true },
      { group: true },
      {
        descriptionData: listData,
      },
    ].map((props, index) => (
      <List key={index} {...props}>
        {children}
      </List>
    ))}

    <ActionPanel
      action="View Example"
      href="https://example.com/"
      noPadding={true}
    >
      <List group={true} inline={true}>
        {children}
      </List>
    </ActionPanel>
  </React.StrictMode>
));
