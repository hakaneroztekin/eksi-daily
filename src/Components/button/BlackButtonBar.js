import React from 'react';
import {Component} from "react";
import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    primary: {
        width: 90,
        fontWeight: 'bold',
    },
    spaceTop: {
        marginTop: 19
    }
});

class ButtonBar extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.spaceTop}>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.primary}
                    style={{textTransform : 'capitalize'}}
                    onClick={() => this.props.redirect != null && this.props.redirect({})}
                >
                    {this.props.text}
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(ButtonBar);