import React, { ChangeEvent, Component, FormEvent } from 'react';

import { Button, Identicon } from '../../atoms';
import { Copyable } from '../../molecules';
import styled from '../../styled-components';
import { borderRadius, monospace, scale } from '../../Theme';
import Typography from '../../Typography';

const Flex = styled.div`
  align-items: center;
  display: flex;

  * {
    font-family: ${monospace};
  }
`;

const Content = styled.div`
  padding-left: ${scale(0)};
`;

const Title = styled(Typography)<{ clickable: boolean }>`
  display: inline;
  font-size: ${scale(0.5)};
  ${props => props.clickable && `cursor: pointer;`};
`;

Title.defaultProps = { as: 'div' };

const MissingTitle = styled(Title)`
  color: ${props => props.theme.textLight};
  font-style: italic;
`;

MissingTitle.defaultProps = { children: 'No Label' };

const TitleInput = styled.input`
  background: ${props => props.theme.background};
  border: 0.125em solid ${props => props.theme.controlBorder};
  border-radius: ${borderRadius};
  color: ${props => props.theme.text};
  font: ${scale(0.5)} Lato, sans-serif;
  padding: 0;
`;

const ColoredIconButton = styled(Button)`
  color: #b5bfc7;
`;

const SubmitButton = styled(ColoredIconButton)`
  color: #1eb8e7;
  left: -${scale(2)};
  position: relative;
`;

SubmitButton.defaultProps = { type: 'submit', icon: 'exit' };

interface Props {
  address: string;
  className?: string;
  title?: string;
  isCopyable?: boolean;
  onSubmit?(title?: string): void;
  truncate?(text: string): string;
}

interface State {
  editing: boolean;
  title?: string;
}

export class Address extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = { editing: false, title: props.title };
  }

  public componentDidUpdate(prevProps: Readonly<Props>) {
    const { title } = this.props;

    if (title !== prevProps.title) {
      this.setState({ title });
    }
  }

  public handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => this.setState({ title: value });

  public handleEditing = () => this.setState({ editing: true });

  public handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { title } = this.state;

    this.setState({ editing: false });
    onSubmit!(title);
  };

  public static defaultProps = {
    isCopyable: true,
  };

  public render() {
    const { address, className, isCopyable, onSubmit, truncate } = this.props;
    const { editing, title } = this.state;

    const TitleComponent = title ? Title : MissingTitle;

    return (
      <Flex className={className}>
        <Identicon address={address} />

        <Content>
          {editing ? (
            <form onSubmit={this.handleSubmit}>
              <TitleInput
                value={title}
                onChange={this.handleChange}
                autoFocus={true} // eslint-disable-line jsx-a11y/no-autofocus
              />{' '}
              <SubmitButton />
            </form>
          ) : (
            <>
              <TitleComponent
                onClick={onSubmit && this.handleEditing}
                clickable={Boolean(onSubmit)}
              >
                {title}
              </TitleComponent>
              {onSubmit && (
                <>
                  {' '}
                  <ColoredIconButton
                    icon="create"
                    onClick={this.handleEditing}
                  />
                </>
              )}
            </>
          )}
          <Copyable
            text={address}
            truncate={truncate}
            isCopyable={isCopyable}
          />
        </Content>
      </Flex>
    );
  }
}

export default Address;
