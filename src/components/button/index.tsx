'use client';

import { FC } from "react";
import RenderCase from "../render";
import CustomButtonV1 from "./versions/v1";

const BUTTON_SWITCHER_VERSIONS: Record<ButtonVersion, FC<ButtonVersionProps>> = {
    '1': CustomButtonV1,
};

const CustomButton = ({ version, id, className, color, onClick, children }: ButtonProps) => {
    const VersionComponent = BUTTON_SWITCHER_VERSIONS[version ?? '1'] || null;

    return (
        <RenderCase renderIf={true}>
            <VersionComponent id={id} className={className} color={color} onClick={onClick}>
                {children}
            </VersionComponent>
        </RenderCase>
    );
};

export default CustomButton;