const express = require('express');
const app = express();
const port = 30;
var cors = require('cors')
const path = require('path');
const database = require("./utils/db");
const auth = require("./router/authRouter");


database()

app.use(express.static(path.join(__dirname, 'photos')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())


app.use("/auth", auth)



app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
