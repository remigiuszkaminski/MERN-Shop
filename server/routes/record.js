const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const fs = require("fs");
const util = require("util");

const log_file = fs.createWriteStream(__dirname + "/debug.log", { flags: "w" });
const log_stdout = process.stdout;

console.log = function (d) {
    log_file.write(util.format(d) + "\n");
    log_stdout.write(util.format(d) + "\n");
};


recordRoutes.route("/addproduct").post(function (req, res) {
    let db_connect = dbo.getDb("shop");
    let myobj = {
        price: req.body.price,
        category: req.body.category,
        brand: req.body.brand,
        title: req.body.title,
        description: req.body.description,
        strictdescription: req.body.strictdescription,
        image: req.body.image,
        comments: [],
        rating: [5]
    };
    db_connect.collection("products").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("Dodano produkt do bazy danych");
    });
    res.status(200).json({ message: "Product added successfully" });
});


recordRoutes.route("/getproducts").get(function (req, res) {
    let db_connect = dbo.getDb("shop");
    db_connect
        .collection("products")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


recordRoutes.route("/editproduct/:id").post(function (req, res) {
    let db_connect = dbo.getDb("shop");
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            price: req.body.price,
            category: req.body.category,
            brand: req.body.brand,
            title: req.body.title,
            description: req.body.description,
            strictdescription: req.body.strictdescription,
            image: req.body.image,
        },
    };
    db_connect
        .collection("products")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("Zaktualizowano produkt w bazie danych");
        });
    res.status(200).json({ message: "Product updated successfully" });
});


recordRoutes.route("/deleteproduct/:id").delete(function (req, res) {
    let db_connect = dbo.getDb("shop");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("products").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("Usunięto produkt z bazy danych");
    });
    res.status(200).json({ message: "Product deleted successfully" });
});


recordRoutes.route("/addcomment/:id").post(function (req, res) {
    let db_connect = dbo.getDb("shop");
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $push: {
            comments: {
                name: req.body.name,
                comment: req.body.comment,
            },
        },
    };
    db_connect.collection("products").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("Dodano komentarz do produktu w bazie danych");
    });
    res.status(200).json({ message: "Comment added successfully" });
});


recordRoutes.route("/addrating/:id").post(function (req, res) {
    let db_connect = dbo.getDb("shop");
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $push: {
            rating: req.body.rating,
        },
    };
    db_connect.collection("products").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("Dodano ocenę do produktu w bazie danych");
    });
    res.status(200).json({ message: "Rating added successfully" });
});



module.exports = recordRoutes;
