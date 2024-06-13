const express = require('express');
const app = express();
const parser = require('body-parser');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
const loginRoute = require('./src/routes/loginRoute');
const db = require('./models');
//const verifyKey = require('./src/middlewares/autenticacion');
const cors = require('cors');



app.use(cors());

const PORT = process.env.PORT || 3000;
app.use(parser.json());

//app.use(verifyKey);

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/users/login',loginRoute);

app.listen(PORT, async() =>
    {
        console.log("runing server in port");
        await db.sequelize.sync();
        console.log("synced db");
    });
