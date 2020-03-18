import React from "react";
import { TextInput } from "../../../hooks";
import { createClassName } from "../../../utils";
import { FontAwesomeIconMemo } from "../../../components";

type UsernameInputProps = {
    readonly textInput: TextInput;
    readonly isInputInvalid: boolean;
};

const UsernameInput = React.memo<UsernameInputProps>(({ textInput, isInputInvalid }) => {
    const { hasValue, bindToInput } = textInput;

    const className = createClassName([
        'input',
        'is-medium',
        (isInputInvalid && !hasValue) && 'is-danger'
    ]);

    return (
        <div className="field">
            <div className="control has-icons-left">
                <input
                    autoFocus
                    {...bindToInput}
                    className={className}
                    placeholder="Username"
                />
                <span className="icon is-left">
                    <FontAwesomeIconMemo icon="user"/>
                </span>
            </div>
        </div>
    );
});

UsernameInput.displayName = 'UsernameInput';

export default UsernameInput;