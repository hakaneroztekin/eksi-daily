import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {ListItemAvatar} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

import MenuBookIcon from '@material-ui/icons/MenuBook';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AppleIcon from '@material-ui/icons/Apple';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import ReportIcon from '@material-ui/icons/Report';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

import TouchAppIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button";
import BlackButtonBar from "./button/BlackButtonBar";

const logo = require('../Images/logo-small.png');

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0px 0px 0px 1px #ccc'
    },
    panel: {
        paddingLeft: 25,
        padding: 20,
    },
    rightPanelPart: {
        position: 'absolute',
        right: 50,
        marginTop: -15,
        whiteSpace: 'nowrap'
    },
    showOnSmallScreens: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    hideOnSmallScreens: {
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    achievementPyramidStyle: {
        width: '100%',
        height: 300,
        overflow: 'wrap',
        borderRadius: 0,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    achievementPyramidStyleSmall: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: 'auto',
            borderRadius: 0
        }
    }
}));

export default function ScrollableTabsButtonForce() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    <Tab
                        icon={<img alt="Logo" width={50} src={logo}/>}
                        {...a11yProps(0)}
                    />
                    <Tab style={{textTransform: 'capitalize'}} label="Hakkında" {...a11yProps(1)}/>
                    {/*<Tab label={<BlackButtonBar/>}*/}
                </Tabs>
            </AppBar>

            <Grid>
                <TabPanel className={classes.panel} value={value} index={1}>
                    <Grid container spacing={2}>
                        <div>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <MenuBookIcon/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Text"
                                    />
                                </ListItem>
                            </List>
                        </div>
                    </Grid>
                </TabPanel>
                <TabPanel className={classes.panel} value={value} index={2}>
                   <BlackButtonBar/>
                </TabPanel>
            </Grid>
        </div>
    );
}