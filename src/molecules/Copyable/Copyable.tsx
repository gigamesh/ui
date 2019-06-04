import React, {
  ButtonHTMLAttributes,
  ClassAttributes,
  Component,
  DetailedHTMLProps,
  ReactNode,
} from 'react';
import styled, { ThemedOuterStyledProps } from 'styled-components';

import { Button, Icon, Tooltip } from '../../atoms';
import { ButtonProps, StyledButtonProps } from '../../atoms/Button/Button';
import Omit from '../../Omit';
import Theme from '../../Theme';
import Typography from '../../Typography';

const ColoredIcon = styled(Icon)`
  color: #b5bfc7;
`;

const ActiveButton = styled(Icon)`
  color: green;
`;

export class Copyable extends Component<{
  text: string;
  truncate?(text: string): string;
}> {
  public state = { copied: false };

  public handleClick = () => {
    const { text } = this.props;
    navigator.clipboard.writeText(text);
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 1000);
  };

  public render() {
    const { text, truncate } = this.props;

    return truncate ? (
      <Tooltip tooltip={<Typography as="div">{text}</Typography>}>
        {props => this.renderButton(truncate(text), props)}
      </Tooltip>
    ) : (
      <div>{this.renderButton(text)}</div>
    );
  }

  public renderButton(
    children: ReactNode,
    props?: ButtonProps &
      Omit<
        ThemedOuterStyledProps<
          DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
          > &
            ClassAttributes<HTMLButtonElement> &
            ButtonHTMLAttributes<HTMLButtonElement> &
            StyledButtonProps,
          Theme
        >,
        'ref'
      >,
  ) {
    const { text } = this.props;
    const { copied } = this.state;

    return (
      <Button
        onClick={this.handleClick}
        aria-label={`Copy ${text}`}
        basic={true}
        children={
          <>
            {children}{' '}
            {copied ? (
              <ActiveButton icon="warning" />
            ) : (
              <ColoredIcon icon="copy" />
            )}
          </>
        }
        {...props}
      />
    );
  }
}

export default Copyable;
