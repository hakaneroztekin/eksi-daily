import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import CssBaseline from "@material-ui/core/CssBaseline";
import {scrape} from "../Service/ScraperService";
import Datatable from "./Datatable";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        paddingBottom: 150
    },
    gridList: {
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
            console.log("Scrape completed with " + topics.length + " hot topics.");
            this.setState({topics: topics})
        });
    }


    createTopicsComponent = () => {
        let topicsComponent = []; // the final component version of topics
        let topics = this.state.topics; // parsed topics
        let topicList = []; // topics list, which is processed 'topics'

        if (topics == null) {
            topicsComponent.push(
                <LinearProgress color="secondary" style={{opacity: 0.4}}/>
            );
            return topicsComponent;
        }

        for (let i = 0; i < topics.length; i++) {
            topicList.push({
                index: i,
                title: topics[i].title,
                messageCount: topics[i].messageCount,
                link: topics[i].link
            });
        }
        topicsComponent.push(this.renderDataTable(topicList));
        return topicsComponent;
    };

    renderDataTable = (topicList) => {
        return (<Datatable key={'datatable'} list={topicList}/>)
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <div className={classes.root}>
                    {this.createTopicsComponent()}
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(MainContent);