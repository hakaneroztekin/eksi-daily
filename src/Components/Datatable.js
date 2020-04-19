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
    constructor(props) {
        super(props);
        this.state = {
            list: null,
        };
    }

    componentDidMount() {
        this.setState({list: this.props.list});
    }

    buildMessageContent(messageCount) {
        return messageCount + " entry";
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({list: nextProps.list});
        this.forceUpdate();
    }

    render() {
        const {classes} = this.props;

        return (
            <List className={classes.root}>
                {this.props.list.map(topic => (
                    <Link key={topic.index} href={topic.link} color="secondary" style={{textDecoration: 'none'}}>
                        <ListElement
                            key={'listElement' + topic.index}
                            imageLink='http://code.hakaneroztekin.com/eksi-daily/static/images/logo-small.png'
                            imageOpacity='1'
                            primaryText={topic.title}
                            secondaryText={topic.messageCount + ' entry '
                            + (topic.changeCount > 0 ? '(' + topic.changeCount + ' yeni)' : '')}
                        />
                    </Link>
                ))}
            </List>
        );
    }
}

export default withStyles(styles)(Datatable);

