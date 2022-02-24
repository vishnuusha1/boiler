const express = require('express');
const { readdirSync } = require('fs');
const mongoose = require('mongoose');
const utils = require('./src/utils');
const configs = require('./src/configs');

const router = express.Router();

const app = express();

//Only define globals here
global.app = app;
global.utils = utils;
global.configs = configs;
Object.freeze(global);
//Global end

app.use(express.json())
app.use('/api/v1', router);

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const modules = getDirectories("./src/modules");

modules.forEach((moduleName) => {
    const appModule = require(`./src/modules/${moduleName}`); // eslint-disable-line
    if (typeof appModule.configure === 'function') {
        router.use(`/${moduleName}`, appModule.configure({app}));
    }
});

mongoose.connect('mongodb://localhost:27017/dns-pm-tool', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use((err, req,res,next)=>{
    res.json(err);
})

app.on('close', () => mongoose.disconnect());

const port = process.env.PORT || 9000;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})