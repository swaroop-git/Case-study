var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
var i;
var j;

const BASE_URL = 'http://localhost:5000/u'
const api = apiAdapter(BASE_URL)
console.log(api);

router.get('/user', (req, res) => {

    console.log(req.path);
    console.log(j);

    api.get(req.path, {

        headers: { Authorization: `Bearer ${j}` }

    }).then(resp => {

        res.send(resp.data)

    }).catch((err) => {

        // res.send("Something went wrong. Please try again!!!")

        res.sendStatus(403)

    })

    // console.log(req.path);
    // api.get(req.path);
    // api.get(req.path).then(resp => {
    //     res.send(resp.data)
    // })
})
//get by id operation
router.get('/user/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.post('/user', (req, res) => {
    console.log(req.path);
    api.post(req.path);
    api.post(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.put('/user', (req, res) => {
    console.log(req.path);
    api.put(req.path);
    api.put(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.delete('/user', (req, res) => {
    console.log(req.path);
    api.delete(req.path);
    api.delete(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.post('/user', (req, res) => {
    console.log(req.path);
    api.post(req.path);
    api.post(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.post('/signup', (req, res) => {

    console.log(req.path);

    api.post(req.path, req.body, {

        withCredentials: true,

    }).then(resp => {

        res.send(resp.data)

    }).catch((err) => {

        res.send("Something went wrong. Please try again!!!")

    })

})



router.post('/login', (req, res) => {

    console.log(req.path);

    api.post(req.path, req.body, {

        withCredentials: true,

        crossDomain: true

    }).then(resp => {

        i = resp.data;

        j = i.token;

        console.log(i);

        console.log(j);

        console.log(resp.headers);

        // console.log(resp.headers.set-cookie);

        res.send(resp.data)

    }).catch((err) => {

        res.send("Either the email or password is incorrect")

    })

})



// axios.interceptors.request.use(

// config => {

// config.headers.authorization = `Bearer ${j}`;

// return config;

// },

// error => {

// return Promise.reject(error);

// }

// );


router.get('/logout', (req, res) => {

    console.log(req.path);

    j = ''

    console.log(j);

    api.get(req.path, { headers: { Authorization: `Bearer ${j}` } }).then(resp => {

        res.send(resp.data)

    }).catch((err) => {

        res.send("Something went wrong. Please try again!!!")

    })

})



// router.get('/users', (req, res) => {

//     console.log(req.path);

//     console.log(j);

//     api.get(req.path, { headers: { Authorization: `Bearer ${j}` } }).then(resp => {

//         res.send(resp.data)

//     }).catch((err) => {

//         res.send("Something went wrong. Please try again!!!")

//     })

// }
 
module.exports = router ;