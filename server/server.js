const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const db_name = 'db_name';
const port = 8000;

app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json(), express.urlencoded({ extended: true }));

require('./config/mongoose.config')(db_name);
require('./routes/routes')(app);

const server = app.listen(port, () => console.log(`Server is up and listening on port ${port}`));

const io = require('socket.io')(server);
io.on('connection', client => {
    console.log('Socket established');
});