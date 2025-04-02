import { Menu } from 'react-admin';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';

export const MyMenu = () => (
    <Menu>
        <Menu.DashboardItem />
        <Menu.ResourceItems />
        <Menu.Item to="/settings" primaryText="Users" leftIcon={<SettingsIcon />}/>
        <Menu.Item to="/profile" primaryText="Miscellaneous" leftIcon={<PeopleIcon />}/>
    </Menu>
);