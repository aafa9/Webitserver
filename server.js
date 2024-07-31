const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const Order = require('./models/Order');
const Developer = require("./models/Devs")
const bcrypt = require("bcrypt")
const cors = require("cors")
const app = express()
const port = 1000

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://mohamed:moh@cluster1.07jxpmt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
.then(
    () => {console.log("server connected to database succefuly!")}
)
.catch(err => console.log(`Failed to connect to the databse with error ${err}`))

app.get("/Devs",async (req,res) => {
    try {
        const Developers = await Developer.find();
        res.json(Developers);
        console.log("test")
    } catch (err) {
        res.status(500).send(err);
    }

})

app.get("/orders", async (req, res) => {
    try {
        const Orders = await Order.find();
        res.json(Orders);
        console.log("server connected to orders collection");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete("/Devs/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDeveloper = await Developer.findByIdAndDelete(id);
        if (!deletedDeveloper) {
            return res.status(404).send("Developer not found");
        }
        res.status(200).json({ message: "Developer deleted", developer: deletedDeveloper });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete("/Order/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteorder = await Order.findByIdAndDelete(id);
        if (!deleteorder) {
            return res.status(404).send("Order not found");
        }
        res.status(200).json({ message: "Order deleted"});
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/orders', async (req, res) => {
    const { firstname, lastname, email, phone, whatsapp, service, message } = req.body;

    const newOrder = new Order({
        firstname,
        lastname,
        email,
        phone,
        whatsapp,
        service,
        message,
    });
    console.log("Order created succesfuly !!")
    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save order' });
    }
});

app.post("/Devs", async (req, res) => {
    const { firstname, lastname, specialization, descreption, portfolio, contact } = req.body;
    try {
        const newDeveloper = new Developer({
            firstname,
            lastname,
            specialization,
            descreption,
            portfolio,
            contact
        });
        await newDeveloper.save();
        res.status(201).json(newDeveloper);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`i am listening on port ${port}`)
})