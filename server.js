const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const url = require('url');

const port = process.env.PORT || 3010;
const app = express();


const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);
console.log(laptopData);

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

app.use(express.static(`${__dirname}/data/img`));

hbs.registerHelper('each', function(context, options) {
    let ret = "";

    for(let i=0; i<context.length; i++) {
        ret += options.fn(context[i]);
    }

    return ret;
});

hbs.registerHelper('getLaptopData', function(context, options) {
    return options.fn(context);
})

app.get('/', (req, res) => {
    res.render('overview.hbs', {
        laptopData
    });
});

app.get('/products', (req, res) => {
    res.render('overview.hbs', {
        laptopData
    });
});

app.get('/laptop', (req, res) => {
    const id = url.parse(req.url, true).query.id

    if (Number(id) < laptopData.length) {
        res.render('laptop.hbs', {
            singleLaptopData: laptopData[id]
        });
    }
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})


