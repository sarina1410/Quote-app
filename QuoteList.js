
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Quote from './Quote';
import { Container, Grid, Typography } from '@mui/material';

const QuoteList = () => {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/quotes')
            .then(response => setQuotes(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Inspirational Quotes</Typography>
            <Grid container spacing={3}>
                {quotes.map(quote => (
                    <Grid item key={quote._id || quote.text} xs={12} sm={6} md={4}>
                        <Quote quote={quote} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default QuoteList;
