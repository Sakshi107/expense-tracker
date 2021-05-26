//rafce

import React from 'react'
import {Grid} from "@material-ui/core";
import Details from './components/Details/Details'
import Main from './components/Main/Main'
import useStyles from './styles';

const App = () => {
    const classes=useStyles();
    return (
        <div>
            <Grid className={classes.grid} container spacing={0} alignItems="center" style={{height:'100vh'}}>
                <Grid item xs={12} sm={12} md={4}>
                    <Details title="Income"/>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                    <Main/>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Details title="Expense"/>
                </Grid>

            </Grid>
        </div>
    )
}

export default App
