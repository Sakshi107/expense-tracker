import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2';
import useTransactions from '../../useTransactions';

import useStyles from './styles';
const Details = ({ title }) => {
    const classes = useStyles();
    const { total, chartData } = useTransactions(title);//destructure ->customHook
    console.log(chartData)
    return (
        <Card className={title === "Income" ? classes.income : classes.expense}>
            <CardHeader title={title} />
            <CardContent>
                <Typography variant="h5">₹{total}</Typography>
                {/* {Object.keys(chartData).length !== 0 ? (<Doughnut data={chartData} />) : null} */}
                <Doughnut data={chartData} />
            </CardContent>
        </Card>
    )
}

export default Details
