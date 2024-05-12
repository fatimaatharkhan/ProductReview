const express = require('express')
const app = express()
const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://fatimaatharkhan:IulvIKMp7KeVH9T6@productreview.ipm7xjq.mongodb.net/", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    detail: String
});

const Product = mongoose.model('Product', productSchema);
app.get("/api/getProducts",(req,res) => {
    Product.find({}, (err, found) => {
        if (!err) {
            res.send(found);
        }
        console.log(err);
        res.send("Some error occured!")
    }).catch(err => console.log("Error occured, " + err));
})

app.get("/api/insert", (req, res) => {
    const prd = new Product({
        id: 1001,
        name: 'Madison Hyde',
        detail: 'Details'
    });
    prd
        .save()
        .then(
            () => console.log("One entry added"), 
            (err) => console.log(err)
        );
    res.json("Inserted Successfully")

})

app.listen(5000, () => {console.log("Server started on 5000") }) 