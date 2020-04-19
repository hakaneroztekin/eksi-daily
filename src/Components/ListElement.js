import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const styles = theme => ({
    root: {
        width: '100%',
    },
    circle: {
        backgroundColor: '#fff',
        border: '1px solid #ededed',
        borderRadius: '50%',
    }
});

class Datatable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            primaryText: null,
            secondaryText: null
        };
    }

    componentDidMount() {
        this.setState({
            primaryText: this.props.primaryText,
            secondaryText: this.props.secondaryText
        })
    }

    render() {
        const {classes} = this.props;
        const preventDefault = (event) => event.preventDefault();

        return (
            <ListItem style={{border: '10px'}}>
                <ListItemAvatar>
                    <Avatar alt="Eksi"
                            className={classes.circle}
                            src="http://code.hakaneroztekin.com/eksi-daily/static/images/logo-small.png"/>
                </ListItemAvatar>
                <ListItemText primary={this.state.primaryText}
                              secondary={this.state.secondaryText}/>
            </ListItem>
        );
    }
}

export default withStyles(styles)(Datatable);