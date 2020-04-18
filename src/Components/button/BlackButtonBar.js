import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    primary: {
        width: 10,
        fontWeight: 'bold',
    },
});

class ButtonBar extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.primary}
                    style={{textTransform: 'capitalize', borderRadius: 100}}
                    onClick={() => this.props.redirect != null && this.props.redirect({})}
                >
                    {this.props.text}
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(ButtonBar);