const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000


function calculateRate(weight,type) {

  switch (type) {
    case "letter(stamped)":
      if (weight <= 1)
        return 0.55;
      if (weight <= 2)
        return 0.70;
      if (weight <= 3)
        return 0.85;
      if (weight <= 3.5)
        return 1.00;

      console.error("Invalid Postage Weight");
      return 0;
    
    case "letter(metered)":
      if (weight <= 1)
        return 0.50;
      if (weight <= 2)
        return 0.65;
      if (weight <= 3)
        return 0.80;
      if (weight <= 3.5)
        return 0.95;

      console.error("Invalid Postage Weight");
      return 0;

    case "flat":
      if (weight <= 13)
        return 0.80 + (0.20 * Math.ceil(weight))

      console.error("Invalid Postage Weight");
      return 0;

    case "package":
      if (weight <= 13)
        return 3.45 + (0.20 * Math.ceil(weight));
      if (weight <= 16)
        return 8.85
      if (weight <= 32)
        return 10.75

        console.error("Invalid Postage Weight");
        return 0;
        
    default:
      console.error("Invalid Postage Type");
      return 0;
  }

}

var urlencodedParser = bodyParser.urlencoded({extended:false});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/getRate', urlencodedParser,(req, res) => {

    let weight = req.body.weight,
    type = req.body.type,
    rate = calculateRate(weight,type);

    if(rate <= 0.1) {
      res.render('pages/error')
    }
    else {
      res.render('pages/rate', {rate: rate.toFixed(2), type: type, weight: weight});
    }
  })

  .get('/getRate', (req, res) => {

    let weight = req.query.weight,
    type = req.query.type,
    rate = calculateRate(weight,type);

    if(rate == 0) {
      res.render('pages/error')
    }
    else {
      res.render('pages/rate', {rate: rate.toFixed(2), type: type, weight: weight});
    }
    
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
