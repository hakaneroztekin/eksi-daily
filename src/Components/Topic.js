import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="stretch"
                >
                    <Grid>1</Grid>
                    <Grid>2</Grid>
                    <Grid>3</Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}