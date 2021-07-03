var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
 
const BASE_URL = 'http://localhost:4000/m'
const api = apiAdapter(BASE_URL)
console.log(api);
 
router.get('/merchant', (req, res) => {
    console.log(req.path);
    api.get(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})
 
router.get('/merchant/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })    
})
 
router.post('/merchant', (req, res) => {
    console.log(req.path);
    api.post(req.path);
    api.post(req.path).then(resp => {
        res.send(resp.data)
    })
})
 
router.put('/merchant', (req, res) => {
    console.log(req.path);
    api.put(req.path);
    api.put(req.path).then(resp => {
        res.send(resp.data)
    })
})
 
router.delete('/merchant', (req, res) => {
    console.log(req.path);
    api.delete(req.path);
    api.delete(req.path).then(resp => {
        res.send(resp.data)
    })
})
 
router.post('/merchant', (req, res) => {
    console.log(req.path);
    api.post(req.path);
    api.post(req.path).then(resp => {
        res.send(resp.data)
    })
})
 
module.exports = router ;