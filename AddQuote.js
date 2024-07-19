import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const AddQuote = () => {
    const [quote, setQuote] = useState({
        text: '',
        author: '',
        tags: '',
        backgroundImage: '',
        audio: ''
    });

    const handleChange = e => {
        setQuote({ ...quote, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/quotes', quote)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom>Add a New Quote</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Quote"
                    name="text"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField
                    label="Author"
                    name="author"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField
                    label="Tags (comma separated)"
                    name="tags"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField
                    label="Background Image URL"
                    name="backgroundImage"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField
                    label="Audio URL"
                    name="audio"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary">Add Quote</Button>
            </form>
        </Container>
    );
};

export default AddQuote;

