import React from 'react'
import { List as MultiList, ListItem, ListItemAvatar, Avatar, Slide, IconButton, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';
import useStyles from './styles'

const List = () => {
    const classes = useStyles();
    const transactions = [
        { id: 1, type: "Income",  category: "bussiness", amount: 50, date: "Wed May 26 2021" },
        { id: 2, type: "Expense", category: "pets", amount: 150, date: "Wed May 27 2021" },
        { id: 3, type: "Expense", category: "pets", amount: 150, date: "Wed May 27 2021" },
        { id: 4, type: "Expense", category: "pets", amount: 150, date: "Wed May 27 2021" },
        { id: 5, type: "Expense", category: "pets", amount: 150, date: "Wed May 27 2021" },
    ];
    return (
        <MultiList dense={false}>
            {transactions.map((transaction) => (
                <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick="">
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>

                    </ListItem>
                </Slide>
            ))}
        </MultiList >
    )
}

export default List
