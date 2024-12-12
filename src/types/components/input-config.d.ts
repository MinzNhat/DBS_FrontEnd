declare type TextInputVersion = '1' | '2';

declare type SelectInputVersion = '1';

declare type SelectInputType = 'single' | 'multi';

declare type InputState = 'error' | 'success' | 'default';

declare type InputTypes = 'select' | 'text' | 'number' | 'password' | 'date' | 'text-area' | 'email';

declare type BaseInputProps<T extends InputTypes, V extends T extends 'select' ? string[] : string | number> = {
    type: T;
    version?: T extends 'select' ? SelectInputVersion : TextInputVersion;

    id?: string;
    className?: string;
    inputClassName?: string;
    state?: InputState;

    label?: React.ReactNode | string;
    placeholder?: string;
    isClearable?: boolean;
    disabled?: boolean;

    value: V;
    setValue: React.Dispatch<React.SetStateAction<V>> | ((_value: V) => void);
};

declare type TextInputProps = BaseInputProps<Exclude<InputTypes, 'select'>>;

declare type SelectInputProps = BaseInputProps<'select'> & {
    select_type?: SelectInputType;
    messageIfEmptyOptions?: React.ReactNode | string;
    options?: SelectInputOptionFormat[];
    position?: string;
    dropdownPosition?: DropdownPosition;
};

declare type SelectButtonProps = Pick<
    SelectInputProps,
    'className' | 'disabled' | 'state' | 'isClearable' | 'value' | 'setValue' | 'selectedLabel' | 'placeholder' | 'openWrapper'
> & {
    defaultSelectPlaceHolder: string;
    setOpenWrapper: React.Dispatch<React.SetStateAction<boolean>>;
};

declare type SelectInputOptionFormat = {
    label: string;
    value: string;
};

declare type InputFieldProps = TextInputProps | SelectInputProps;