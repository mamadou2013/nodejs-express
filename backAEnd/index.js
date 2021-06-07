const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/routes');
const app = express();
const ports = process.env.PORT || 3600;

app.use(express.json());
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET ,POST ,PUT ,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/api/niit', authRoutes);

app.listen(ports, () => console.log(`Listen on port ${ports}`));