import { storiesOf } from '@storybook/react';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { StyledComponentClass } from 'styled-components';

import styled from 'src/styled-components';
import Theme from 'src/Theme';
import Typography from 'src/Typography';
import Icon, { icons } from './Icon';

const Code = styled(Typography)`
  display: block;
  font-family: monospace;
` as StyledComponentClass<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
  Theme
>;

Code.defaultProps = { as: 'code' };

storiesOf('Atoms', module).add('Icon', () => (
  <React.StrictMode>
    <Typography>
      {Object.keys(icons).map(icon => (
        <Code key={icon}>
          <Icon icon={icon as keyof typeof icons} /> {icon}
        </Code>
      ))}
    </Typography>
  </React.StrictMode>
));
