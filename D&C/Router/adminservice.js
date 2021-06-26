var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
 
const BASE_URL = 'http://localhost:8080/a'
const api = apiAdapter(BASE_URL)
console.log(api);
 
router.get('/admin', (req, res) => {
    console.log(req.path);
    api.get(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})
 
router.get('/admin/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })    
})
 
router.post('/admin', (req, res) => {
    console.log(req.path);
    api.post(req.path);
    api.post(req.path).then(resp => {
        res.send(resp.data)
    })
})
 
router.put('/admin/:id', (req, res) => {
    console.log(req.path);
    api.put(req.path);
    api.put(req.path).then(resp => {
        res.send(resp.data)
    })
})
 
router.delete('/admin', (req, res) => {
    console.log(req.path);
    api.delete(req.path);
    api.delete(req.path).then(resp => {
        res.send(resp.data)
    })
})
 
router.post('/admin', (req, res) => {
    console.log(req.path);
    api.post(req.path);
    api.post(req.path).then(resp => {
        res.send(resp.data)
    })
})
 
module.exports = router ;