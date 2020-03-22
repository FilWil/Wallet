import React, { useEffect } from 'react';
import { CallbackFunction } from '../types';
import styled, { keyframes } from 'styled-components';
import {ApplicationState} from "../store";
import { connect } from 'react-redux';

type RegistratorWrapperProps = {
    readonly isRegistered?: boolean;
};

type RegistratorProps = {
    readonly delay?: number;
    readonly isRegistered?: boolean;
    readonly handleOnFail: CallbackFunction;
    readonly handleOnSuccess: CallbackFunction;
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

const getChildDivBorderColor = (isRegistered): string => {
    switch (isRegistered) {
        case false:
            return FAIL_COLOR;
        case true:
            return SUCCESS_COLOR;
        default:
            return DEFAULT_COLOR;
    }
};

const RegistratorWrapper = styled.div<RegistratorWrapperProps>`
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
    border-top-color: ${({ isRegistered }) => getChildDivBorderColor(isRegistered)};
    animation: ${FINGERPRINT_KEYFRAMES} 1500ms cubic-bezier(0.68, -0.75, 0.265, 1.75) infinite forwards;

    ${getChildDivCSS()}
  }
`;

const Registrator = React.memo<RegistratorProps>(({
                                                          handleOnFail,
                                                          handleOnSuccess,
                                                          delay = 1500,
                                                           isRegistered
                                                      }) => {
    useEffect(() => {
        const registrationHandler = setTimeout(() => {
            switch (isRegistered) {
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
            clearTimeout(registrationHandler);
        };
    }, [isRegistered, delay, handleOnFail, handleOnSuccess]);

    if (!(isRegistered === true || isRegistered === false)) {
        return null;
    }

    return (
        <RegistratorWrapper isRegistered={isRegistered}>
            <div /><div /><div />
            <div /><div /><div />
            <div /><div /><div />
        </RegistratorWrapper>
    );
});

Registrator.displayName = 'Registrator';

const mapStateToProps = (state: ApplicationState) => ({
    isRegistered: state.auth.isRegistered
});

export default connect(mapStateToProps)(Registrator);
