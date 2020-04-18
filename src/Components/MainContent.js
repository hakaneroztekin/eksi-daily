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
        marginBottom: 40
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
                xs={11}
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
                    xs={11}
                    key={i}
                >
                    <Topic/>
                    {/*    name={articles[i]['name']}*/}
                    {/*    logo={articles[i]['logo']}*/}
                    {/*    link={articles[i]['link']}*/}
                    {/*    summary={articles[i]['summary']}*/}
                    {/*    publishDate={articles[i]['publishDate']}*/}
                    {/*    accessTypeVal={articles[i]['accessTypeVal']}*/}
                    {/*    categoryVal={articles[i]['categoryVal']}*/}
                    {/*/>*/}
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
                        alignItems="center"
                        justify="center"
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