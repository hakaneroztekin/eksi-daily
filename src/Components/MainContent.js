import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import CssBaseline from "@material-ui/core/CssBaseline";
import {scrape} from "../Service/ScraperService";
import Datatable from "./Datatable";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListElement from "./ListElement";
import Link from "@material-ui/core/Link";

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
            lastUpdate: null,
        };
    }

    componentDidMount() {
        this.updateTopics();
    }

    updateTopics() {
        scrape(100, topics => {
            console.log("Scrape completed with " + topics.data.length + " hot topics.");
            console.log("topics.data");
            console.log(topics.data);
            this.setState({topics: topics.data, lastUpdate: topics.lastUpdate});
            this.forceUpdate();
        });
    }


    createTopicsComponent = () => {
        let topicsComponent = []; // the final component version of topics
        let topics = this.state.topics; // parsed topics
        let topicList = []; // topics list, which is processed 'topics'

        if (topics == null) {
            topicsComponent.push(
                <LinearProgress key="linearProgress" color="secondary" style={{opacity: 0.4}}/>
            );
            return topicsComponent;
        }

        for (let i = 0; i < topics.length; i++) {
            topicList.push({
                index: i,
                title: topics[i].title,
                messageCount: topics[i].messageCount,
                link: topics[i].link,
                changeCount: topics[i].changeCount
            });
        }
        topicsComponent.push(this.renderDataTable(topicList));
        return topicsComponent;
    };

    renderDataTable = (topicList) => {
        console.log("topicList");
        console.log(topicList);
        return (
            <div>
                <Link onClick={() => this.updateTopics()} color="secondary" style={{textDecoration: 'none'}}>
                    <ListElement
                        key={'listElement'}
                        imageLink='https://cdn.iconscout.com/icon/free/png-256/refresh-1781197-1518571.png'
                        imageOpacity='0.7'
                        primaryText='Yenile'
                        secondaryText={'Son yenileme ' + this.state.lastUpdate}
                    />
                </Link>
                <Datatable key={'datatable'} list={topicList}/>
            </div>
        )
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