import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import BlackButtonBar from "./button/BlackButtonBar";
// import ButtonBar from "../button/ButtonBar";

const styles = theme => ({
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        borderRadius: 12
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
    inlineRight: {
        width: '10%',
        textAlign: 'right',
        marginLeft: 50,
        alignContent: 'right',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: 0,
            textAlign: 'center'
        }
    },
    backButton: {
        marginRight: theme.spacing(2)
    },
    secondary: {
        background: theme.palette.secondary['100']
    },
    tag: {
        margin: theme.spacing(0.25)
    }
});


class CardItem extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} variant="outlined"
                >
                    <div className={classes.itemContainer}
                         onClick={() => window.open(this.props.link)}
                    >
                        <div>
                            <div>
                                <Typography variant="h6" gutterBottom>
                                    {this.props.messageCount}
                                    <br/> entry
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.baseline}>
                            <div className={classes.inline}>
                                <Typography variant="h5" gutterBottom>
                                    {this.props.title}
                                </Typography>
                            </div>
                        </div>
                        <div>
                            <div className={classes.inlineRight}>
                                <BlackButtonBar text=">"/>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(CardItem);