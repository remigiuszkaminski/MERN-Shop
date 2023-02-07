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


recordRoutes.route("/getproduct/:id").get(function (req, res) {
    let db_connect = dbo.getDb("shop");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("products").findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/editproduct/:id").put(function (req, res) {
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


recordRoutes.route("/deletecomment/:id").put(function (req, res) {
    let db_connect = dbo.getDb("shop");
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $pull: {
            comments: {
                name: req.body.name,
                comment: req.body.comment,
            },
        },
    };
    db_connect.collection("products").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("Usunięto komentarz z produktu w bazie danych");
    });
    res.status(200).json({ message: "Comment deleted successfully" });
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


recordRoutes.route("/getsum").get(function (req, res) {
    let db_connect = dbo.getDb("shop");
    db_connect
        .collection("products")
        .aggregate([
            {
                $group: {
                    _id: null,
                    sum: { $sum: "$price" },
                },
            },
        ])
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/getcommentsval").get(function (req, res) {
    let db_connect = dbo.getDb("shop");
    db_connect
        .collection("products")
        .aggregate([
            {
                $project: {
                    _id: 1,
                    title: 1,
                    comments: 1,
                    commentsCount: { $size: "$comments" },
                },
            },
            { $sort: { commentsCount: -1, title: 1 } },
            { $limit: 5 },
        ])
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


recordRoutes.route("/getcategorysum").get(function (req, res) {
    let db_connect = dbo.getDb("shop");
    db_connect
        .collection("products")
        .aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1, _id: 1 } },
        ])
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


recordRoutes.route("/getbestrating").get(function (req, res) {
    let db_connect = dbo.getDb("shop");
    db_connect
        .collection("products")
        .aggregate([
            {
                $project: {
                    _id: 1,
                    title: 1,
                    rating: 1,
                    ratingCount: { $size: "$rating" },
                    ratingAvg: { $avg: "$rating" },
                },
            },
            { $sort: { ratingAvg: -1 } },
            { $limit: 5 },
        ])
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});



recordRoutes.route("/getcheapest").get(function (req, res) {
    let db_connect = dbo.getDb("shop");
    db_connect
        .collection("products")
        .aggregate([
            {
                $match: {
                    category: { $ne: "Akcesoria" },
                },
            },
            { $sort: { price: 1 } },
            { $limit: 5 },
        ])
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


recordRoutes.route("/getmostactiveuser").get(function (req, res) {
    let db_connect = dbo.getDb("shop");
    db_connect
        .collection("products")
        .aggregate([
            {
                $unwind: "$comments",
            },
            {
                $group: {
                    _id: "$comments.name",
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1, _id: 1 } },
            { $limit: 5 },
        ])
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


recordRoutes.route("/getproductscount").get(function (req, res) {
    let db_connect = dbo.getDb("shop");
    db_connect
        .collection("products")
        .aggregate([
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                },
            },
        ])
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


recordRoutes.route("/addhistory").post(function (req, res) {
    let db_connect = dbo.getDb("shop");
    let myobj = {
        price: req.body.price,
    };
    db_connect.collection("history").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("Dodano historię do bazy danych");
    });
    res.status(200).json({ message: "History added successfully" });
});


recordRoutes.route("/gethistory").get(function (req, res) {
    let db_connect = dbo.getDb("shop");
    db_connect
        .collection("history")
        .aggregate([
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    sum: { $sum: "$price" },
                },
            },
        ])
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


recordRoutes.route("/search/:title").get(function (req, res) {
    let db_connect = dbo.getDb("shop");
    let title = req.params.title;
    db_connect
        .collection("products")
        .find({ title: { $regex: title } })
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});



recordRoutes.route("/getmostexpensive").get(function (req, res) {
    let db_connect = dbo.getDb("shop");
    db_connect
        .collection("products")
        .aggregate([
            {
                $match: {
                    category: { $ne: "Akcesoria" },
                },
            },
            { $sort: { price: -1 } },
            { $limit: 5 },
        ])
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


module.exports = recordRoutes;
