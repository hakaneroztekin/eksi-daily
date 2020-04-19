import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import List from '@material-ui/core/List';
import Link from "@material-ui/core/Link";
import ListElement from "./ListElement";

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
                        <ListElement
                            key={'listElement' + topic.index}
                            imageLink='http://code.hakaneroztekin.com/eksi-daily/static/images/logo-small.png'
                            primaryText={topic.title}
                            secondaryText={topic.messageCount + ' entry'}
                        />
                    </Link>
                ))}
            </List>
        );
    }
}

export default withStyles(styles)(Datatable);

