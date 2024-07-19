import React from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, CardMedia, CardActions } from '@mui/material';

const Quote = ({ quote }) => {
    const handleDelete = () => {
        if (quote._id) {
            axios.delete(`http://localhost:5000/quotes/${quote._id}`)
                .then(response => console.log(response.data))
                .catch(error => console.error(error));
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{quote.text}</Typography>
                <Typography variant="subtitle1" color="textSecondary">{quote.author}</Typography>
                <Typography variant="body2" color="textSecondary">{quote.tags?.join(', ')}</Typography>
                {quote.backgroundImage && (
                    <CardMedia
                        component="img"
                        alt="Background"
                        height="140"
                        image={quote.backgroundImage}
                    />
                )}
                {quote.audio && (
                    <audio controls src={quote.audio} />
                )}
            </CardContent>
            {quote._id && (
                <CardActions>
                    <Button size="small" color="secondary" onClick={handleDelete}>Delete</Button>
                </CardActions>
            )}
        </Card>
    );
};

export default Quote;

