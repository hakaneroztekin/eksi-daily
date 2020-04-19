import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Link from "@material-ui/core/Link";

const logo = require('../Images/logo-small.png');

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
    buildMessageContent(messageCount) {
        return messageCount + " entry";
    }

    render() {
        const {classes} = this.props;
        const preventDefault = (event) => event.preventDefault();

        return (
            <List className={classes.root}>
                {this.props.list.map(topic => (
                    <Link key={topic.index} href={topic.link} color="secondary" style={{textDecoration: 'none'}}>
                        <ListItem style={{border: '10px'}}>
                            <ListItemAvatar>
                                <Avatar alt="Eksi"
                                        className={classes.circle}
                                        src="http://code.hakaneroztekin.com/eksi-daily/static/images/logo-small.png"/>
                            </ListItemAvatar>
                            <ListItemText primary={topic.title}
                                          secondary={this.buildMessageContent(topic.messageCount)}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
        );
    }
}

export default withStyles(styles)(Datatable);
