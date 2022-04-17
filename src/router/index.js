'use strict';

const express = require('express');
const router = express.Router();

// DATABASE
let items = [
  {
    id: 1,
    name: 'Mouse',
    price: 6
  },
  {
    id: 2,
    name: 'Teclado',
    price: 12
  },
  {
    id: 3,
    name: 'pantalla',
    price: 8
  }
];

router.get('/', (req, res) => {
  res.render('main.ejs')
})

router.get('/get', (req, res) => {
  res.json(items);
})

router.put('/get/:id', (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;
  items.forEach((key, i) => {
    if(key.id == id){
      key.name = name;
      key.price = price;
    }
  });
  res.json('Producto Actualizado');
})

router.delete('/get/:id', (req, res) => {
  const { id } = req.params;
  items.forEach((key, i) => {
    if (key.id == id){
      items.splice(i, 1);
    }
  });
  res.json('Producto Eliminado');
})

router.post('/search', (req, res) => {
  const {name} = req.body;
  let data = [];
  for (let i = 0; i < items.length; i++) {
    if(name){
      if(!items[i].name.indexOf(name)){
        data.push(items[i].name);
      }
    }
  }
  res.json(data);
})

router.post('/add', (req, res) => {
  const { name, price } = req.body;
  items.push({
    id: items.length + 1,
    name,
    price
  })
  res.json('Producto Almacenado');
})


module.exports = router;
