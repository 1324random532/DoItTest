import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AuthLinks } from 'apps/authorization/links';
import { UsersProvider } from 'domain/users/usersProvider';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from 'sharedComponents/buttons/iconButton';
import { Tooltip } from 'sharedComponents/tooltip/tooltip';
import { SidebarIcon } from './sidebarIcon';
import SidebarLinksTree from './sidebarLinksTree';


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidebar(props: PropsWithChildren<{}>) {
    const theme = useTheme();

    const navigateTo = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    async function logOut() {
        const result = await UsersProvider.logOut();
        window.location.href = AuthLinks.authorization;
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={
                    open
                        ? {}
                        : {
                            ['@media (min-width:600px)']: { // eslint-disable-line no-useless-computed-key
                                pl: '10px'
                            }
                        }
                }>
                    <IconButton
                        icon='menu'
                        onClick={handleDrawerOpen}
                        sx={{ mr: 2, ...(open && { display: 'none' }), color: "white" }}
                        title='Развернуть'
                    />
                    <Typography variant="h6" noWrap component="div">
                        DoItTest
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton icon='door' onClick={() => logOut()} title='Выйти' />
                    <IconButton icon='chevronLeft' onClick={handleDrawerClose} title='Свернуть' />
                </DrawerHeader>
                <Divider />
                <List>
                    {SidebarLinksTree.items.map((s, index) => (
                        <Tooltip key={index} title={s.text}>
                            <ListItem button key={s.text} onClick={() => navigateTo(s.url)}>
                                <ListItemIcon>
                                    <SidebarIcon icon={s.icon} />
                                </ListItemIcon>
                                <ListItemText primary={s.text} />
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {props.children}
            </Box>
        </Box>
    );
}
