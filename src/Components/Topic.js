import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";

const logo = require('../Images/logo-small.png');

const styles = theme => ({
    paper: {
        textAlign: 'left',
        color: theme.palette.text.secondary,
        borderRadius: 12,
        minHeight: 50,
        paddingTop: 10
    },
    itemContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }
    },
    avatar: {
        margin: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: theme.palette.grey['200'],
        color: theme.palette.text.primary,
    },
    avatarImg: {
        maxWidth: '100%',
        height: 'auto'
    },
    avatarContainer: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginBottom: theme.spacing(4)
        }
    },
    baseline: {
        width: '70%',
        marginLeft: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: 0
        }
    },
    inline: {
        width: '90%',
        display: 'inline-block',
        marginLeft: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0
        }
    },
    backButton: {
        marginRight: theme.spacing(2)
    },
    secondary: {
        background: theme.palette.secondary['100']
    }
});


class CardItem extends Component {

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.paper} variant="outlined"
            >
                <div className={classes.itemContainer}
                     onClick={() => window.open(this.props.link)}
                >

                    <div className={classes.avatarContainer}>
                        <Avatar className={classes.avatar}>
                            <img
                                className={classes.avatarImg}
                                alt="Logo"
                                src='../Images/logo-small.png'
                            />
                        </Avatar>
                    </div>

                    <div className={classes.baseline}>
                        <div className={classes.inline}>
                            <Typography variant="body1" gutterBottom>
                                {this.props.title}
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <div className={classes.inlineRight}>
                            {this.props.messageCount} entry
                        </div>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(CardItem);