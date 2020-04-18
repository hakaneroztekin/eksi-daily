import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    primary: {
        background: "#3b5998",
        color: 'white',
        width: 75
    },
    spaceTop: {
        marginTop: 20
    }
});

class ButtonBar extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.spaceTop}>
                <Button
                    variant="contained"
                    onClick={() => window.open(this.props.link)}
                    className={classes.primary}
                >
                    {this.props.text}
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(ButtonBar);