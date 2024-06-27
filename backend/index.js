const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/list")
    .then(() => console.log("DB Connected"))
    .catch(err => console.error("DB Connection Error:", err));

    const editorSchema = new mongoose.Schema({
    name: String
    });
    const editor = mongoose.model("editor", editorSchema);

    app.get("/editorlist", (req, res) => {
    editor.find()
        .then(retdata => {
        console.log(retdata);
        res.send(retdata);
        })
        .catch(err => {
        console.error("Error fetching editors:", err);
        res.status(500).send("Error fetching editors");
        });
    });

    app.post("/addeditor", (req, res) => {
    const neweditorName = req.body.neweditor;

    const neweditor = new editor({
        name: neweditorName
    });

    neweditor.save()
        .then(() => {
        console.log("Saved Successfully");
        res.status(200).send("Editor added successfully");
        })
        .catch(err => {
        console.error("Error saving editor:", err);
        res.status(500).send("Error saving editor");
        });
    });

    app.listen(5000, () => {
    console.log("Server Started...");
    });
