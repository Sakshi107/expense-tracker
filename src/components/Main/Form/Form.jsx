import React, { useState, useContext, useEffect } from 'react'
import { TextField, Typography, Grid, Button, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 as uuidv4 } from 'uuid';
import { useSpeechContext } from '@speechly/react-client'
import useStyles from './styles';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import formatDate from '../../../utils/formatDate';
import CustomizedSnackbar from '../../Snackbar/Snackbar';

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date()),
}

const Form = () => {
    const classes = useStyles();
    const { addTransaction } = useContext(ExpenseTrackerContext);//starts with use=>Hooks in react
    const [formData, setFormData] = useState(initialState);
    const [open, setOpen] = useState(false);
    const { segment } = useSpeechContext();

    const createTransaction = () => {
        if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-'))
            return;
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() }//spread existing required things then after comma modifications
        addTransaction(transaction);
        setOpen(true);
        setFormData(initialState);
    }
    //console.log(formData);

    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense' })
            }
            else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income' })
            }
            else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction();
            }
            else if (segment.intent.intent === 'cancelTransaction') {
                setFormData(initialState)
            }

            segment.entities.forEach((e) => {
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: e.value });
                        break;
                    case 'category':
                        const c = `${e.value.charAt(0)}${e.value.toLowerCase().slice(1)}`
                        if (incomeCategories.map((iC) => iC.type).includes(c)) {
                            setFormData({ ...formData, category: c, type: 'Income' });
                        }
                        else if (expenseCategories.map((iC) => iC.type).includes(c)) {
                            setFormData({ ...formData, category: c, type: 'Expense' });
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: e.value });
                        break;
                    default:
                        break;
                }
            });
            if (segment.isFinal && formData.amount && formData.type && formData.date && formData.category) {
                createTransaction();
            }
        }

    }, [segment])
    //1st paramter what we want to run,2nd parameter(dependency array) when to run(which data/object changes) 
    //here it is called everytime segment changes

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;
    return (
        <Grid container spacing={2}>
            {open && <CustomizedSnackbar open={open} setOpen={setOpen} />}
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment &&
                        segment.words.map((w) => w.value).join(" ")
                    }
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {
                            selectedCategories.map((c) =>
                                <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)
                        }
                        {/* jsx dynamic block to add logic */}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form
