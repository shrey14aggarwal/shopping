const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('./model/user');
const Users = require('./model/user')
const Product = require('./model/product');
const LoginUser = require('./model/loginuser')
const Prod = require('./model/prod')
const checkAuth = require('./middleware/check-auth');


const app = express();

//connection to db 
mongoose.connect('mongodb+srv://shrey:Ia3ecJOMPu4tsIMn@cluster0-mp9x4.mongodb.net/shopping?retryWrites=true&w=majority')
    .then(() => {
        console.log("connected to database");
    }).catch(() => {
        console.log("connection error");
    })

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//setting headers for CORS policy 
app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
    next();
})

app.post('/api/user', (req, res, err) => {

    const product = new Product({

        item: req.body.item,
        quantity: req.body.quantity,
        price : req.body.price
    })
    const user = new User({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        product: product

    })

    console.log(user);

    user.save();

});
//chainging get to post
app.post('/api/users:email', (req, res, next) => {

    User.find({ email: req.params.email }).then(documents => {



        if (Object.keys(documents).length === 0) {
            res.json(null);
            console.log("hihihihi")
        }

        else {

            const token = jwt.sign({email : req.params.email}, 'secret_this_should_be_longer_key_since_it_is_jwt', {expiresIn: '1h'});
           // res.json(documents)
           console.log("hi")
           console.log(token);
           res.json( token)
        }
    });

});

app.get('/api/prodInfo', checkAuth,(req, res, err) => {

    Prod.find().then(documents => {
        res.json(documents);
    });
});

app.put('/api/product:email', (req, res, err) => {


    const product = new Product({

        item: req.body.item,
        quantity: req.body.quantity
    })


    const user = new User({



        password: req.body.password,

    })

    console.log(req.body)

    const filter = { email: req.params.email };
    const update = { products: [{ item: req.body.item, quantity: req.body.quantity }] };

    
    User.findOneAndUpdate({ email: req.params.email }, { $push: { products: [{ item: req.body.item, price: req.body.price, quantity: req.body.quantity }] } }).then(documents => {

    });

   
    mongoose.set('debug', true);
})

app.put('/api/delete:email', (req, res, err)=>{
    User.update({ email: req.params.email}, { $pull:{ products: { quantity:0} }}).then(documents => {
        console.log("deleted 0")
    });

})

app.get('/api/products:email', checkAuth, (req, res, err) => {
    console.log(req.params.email)

    User.aggregate(([

        {
            $match: {
                email: req.params.email
            }
        },
        {
            $unwind: {
                path: "$products",
                includeArrayIndex: "arrayIndex",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $group: {
                _id: "$products.item",
                firstName: { "$first": "$firstName" },
                quantity: {
                    $sum: "$products.quantity"
                },
                price: {
                    $sum: "$products.price"
                }
            }
        },
        {
            $sort: { _id :1}
        }

    ])).then(result => {
        res.send(JSON.stringify(result, null, 2));
        console.log(JSON.stringify(result, null, 2))
    })
})

app.post('/api/updateProd:email', (req, res,err) =>{


    User.update({email: req.params.email}, { $pull: { products:{item: req.body.item}} }, {multi:true}).then(documents => {

    });
   // console.log(req.body)
    //User.update({ email: req.params.email}, { $set: { "products.$.item": req.body.item, "products.$.price" : req.body.price, "products.$.quantity": req.body.quantity}}).then(documents => {

    //});

})
module.exports = app;