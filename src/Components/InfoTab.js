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

import MenuBookIcon from '@material-ui/icons/MenuBook';

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
                    <Tab label="hakkında" {...a11yProps(1)}/>
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
            </Grid>
        </div>
    );
}