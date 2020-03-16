import { useState, useCallback, useMemo, ChangeEvent } from 'react';

export type TextInputType = 'text' | 'password';

export type TextInput = {
    value: string;
    hasValue: boolean;
    clear: () => void;
    bindToInput: {
        value: string;
        type: TextInputType;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    };
};

export const useTextInput = (
    initial: string = '',
    type: TextInputType = 'text',
): TextInput => {
    const [value, setValue] = useState<string>(initial);
    const clear = useCallback((): void => setValue(''), []);
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => setValue(e.currentTarget.value), []);

    return useMemo<TextInput>(() => ({
        value,
        clear,
        hasValue: !!(value && value.trim()),
        bindToInput: {
            type,
            value,
            onChange
        }
    }), [value, type, onChange, clear]);
};
