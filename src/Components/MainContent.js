import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Topic from "./Topic";
import {scrape} from "../Service/ScraperService";

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        marginTop: 20,
        padding: 20,
        paddingBottom: 150
    },
    gridList: {
        flexWrap: 'nowrap',
        marginBottom: 20
    },
    tileBar: {
        height: 'auto'
    }
});

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: null,
        };
    }

    componentDidMount() {
        scrape(100, topics => {
            console.log("Scrape completed with " + topics.length + " total topics.");
            this.setState({topics: topics})
        });
    }

    createTopicsComponent = () => {
        let topicsComponent = [];
        let topics = this.state.topics;

        if (topics == null) {
            topicsComponent.push(<Grid
                item
                xs={6}
                key="empty"
            >
                Veriler toplanıyor...
            </Grid>);
            return topicsComponent;
        }

        for (let i = 0; i < topics.length; i++) {
            let topic = [];
            topic.push(
                <Grid
                    item
                    xs={6}
                    key={i}
                >
                    <Topic
                        title={JSON.parse(topics[i]).title}
                        messageCount={JSON.parse(topics[i]).messageCount}
                        link={JSON.parse(topics[i]).link}
                    />
                </Grid>);
            topicsComponent.push(topic);
        }
        return topicsComponent;
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <div className={classes.root}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="baseline"
                        spacing={1}
                    >
                        {this.createTopicsComponent()}
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(MainContent);