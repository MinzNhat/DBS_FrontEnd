declare type PopupProps = {
    onClose: () => void;
    title?: string;
    className?: string;
    noPadding?: boolean;
    customWidth?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}