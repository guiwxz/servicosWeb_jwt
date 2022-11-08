const express = require('express');
const cors = require('cors');
const rotas = require('./src/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.use(rotas);

app.listen(process.env.PORT || 3001, () => {
    console.log('server up');
});
