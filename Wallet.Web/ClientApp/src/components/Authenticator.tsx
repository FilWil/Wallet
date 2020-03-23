import React, { useEffect } from 'react';
import { CallbackFunction } from '../types';
import styled, { keyframes } from 'styled-components';
import {AuthStatus, AuthStatusEnum} from "../store/auth";

type AuthenticatorWrapperProps = {
  readonly isAuthenticated?: boolean;
  readonly authStatus?: AuthStatus;
};

type AuthenticatorProps = {
  readonly delay?: number;
  readonly isAuthenticated?: boolean;
  readonly handleOnFail: CallbackFunction;
  readonly handleOnSuccess: CallbackFunction;
  readonly authStatus?: AuthStatus;
};

const CHILD_DIV_COUNT = 9;
const FAIL_COLOR = '#e93e60';
const SUCCESS_COLOR = '#09d3ac';
const DEFAULT_COLOR = 'rgba(9, 30, 66, 0.35)';

const FINGERPRINT_KEYFRAMES = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const childDivTemplate = (childIndex: number): string => (`
  &:nth-child(${childIndex + 1}) {
    height: calc(96px / 9 + ${childIndex} * 96px / 9);
    width: calc(96px / 9 + ${childIndex} * 96px / 9);
    animation-delay: calc(50ms * ${childIndex + 1});
  }
`);

const getChildDivCSS = (): string => {
  let childDivCSS = '';
  for (let index = 0; index < CHILD_DIV_COUNT; index += 1) {
    childDivCSS += childDivTemplate(index);
  }
  return childDivCSS;
};

const getChildDivBorderColor = (authStatus: AuthStatus): string => {
  switch (authStatus) {
    case AuthStatusEnum.FAIL:
      return FAIL_COLOR;
    case AuthStatusEnum.SUCCESS:
      return SUCCESS_COLOR;
    default:
      return DEFAULT_COLOR;
  }
};

const AuthenticatorWrapper = styled.div<AuthenticatorWrapperProps>`
  width: 100px;
  height: 100px;
  padding: 2px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  margin: 1.25em auto auto auto;

  > div {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid transparent;
    border-top-color: ${({ authStatus }) => getChildDivBorderColor(authStatus)};
    animation: ${FINGERPRINT_KEYFRAMES} 1500ms cubic-bezier(0.68, -0.75, 0.265, 1.75) infinite forwards;

    ${getChildDivCSS()}
  }
`;

const Authenticator = React.memo<AuthenticatorProps>(({
                                                        handleOnFail,
                                                        handleOnSuccess,
                                                        delay = 1500,
                                                        isAuthenticated,
                                                        authStatus
}) => {
  useEffect(() => {
    const authHandler = setTimeout(() => {
      switch (isAuthenticated) {
        case false:
          handleOnFail();
          return;
        case true:
          handleOnSuccess();
          return;
        default:
          return;
      }
    }, delay);

    return () => {
      clearTimeout(authHandler);
    };
  }, [isAuthenticated, delay, handleOnFail, handleOnSuccess, authStatus]);

  if (!(isAuthenticated === true || isAuthenticated === false)) {
    return null;
  }

  return (
    <AuthenticatorWrapper authStatus={authStatus}>
      <div /><div /><div />
      <div /><div /><div />
      <div /><div /><div />
    </AuthenticatorWrapper>
  );
});

Authenticator.displayName = 'Authenticator';

export default Authenticator;
