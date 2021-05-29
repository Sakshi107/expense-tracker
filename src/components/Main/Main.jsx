import React, { useContext } from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core'

import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';

import { ExpenseTrackerContext } from '../../context/context'
import InfoCard from '../InfoCard';

const Main = () => {
    const classes = useStyles();
    const { balance } = useContext(ExpenseTrackerContext);
    return (
        <Card className={classes.root}>
            <CardHeader title="Expense Tracker" subheader="Now handle your expense at ease" />
            <CardContent>
                <Typography align="center" variant="h5">Total Balance : ₹{balance}</Typography>
                <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                    <InfoCard />
                </Typography>
                <Divider className={classes.divider}/>
                <Form />
            </CardContent>
            <CardContent className={classes.CardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <List />
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    )
}

export default Main
