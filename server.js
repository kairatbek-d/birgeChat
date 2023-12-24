require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000', // or your specific origin
    credentials: true, // to allow cookies and authentication headers
    // you can add more options as needed
};
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cors(corsOptions));
app.use(cookieParser())
app.options('*', cors(corsOptions)); // include before other routes

app.get('/', (req, res) => {
    res.json({msg: "Hello"})
})

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log('Server is running on port', port)
})