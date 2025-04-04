const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'LucidxBMU' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
