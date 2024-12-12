import Switch from "@/components/switch";

const ThemeSwitcherV1 = ({ checked, handleToggleTheme }: ThemeVersionProps) => {
    return (
        <Switch checked={checked} color="red" onChange={handleToggleTheme} className="dark:checked:!bg-blue-500" />
    );
};

export default ThemeSwitcherV1;