const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3050;

// Middleware to parse URL-encoded bodies

app.use(express.urlencoded());

app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.get('/', (req, res) => {
    const con = "This is the best source";
    const params = { 'title': 'pub is coding', "content": con };
    res.status(200).render('index.pug', params);
});

app.post('/', (req, res) => {
    Name=req.body.Name
    Contact=req.body.Contact
    User=req.body.User
    User1=req.body.User1
    Password=req.body.Password
    Password1=req.body.Password1

    const outputv = `The Name of client is : ${Name}, Contact Number is: ${Contact}, Old Username: ${User} , New Username: ${User1} , Old Password : ${Password} , New Password : ${Password1}`;
    const outputPath = path.join(__dirname, 'output.txt');

    // Attempt to write data to file
    fs.writeFileSync(outputPath, outputv, (err) => {
        if (err) {
            console.error("Error writing to output.txt:", err);
            res.status(500).send("Error occurred while saving the data.");
        } else {
            console.log("Data written to output.txt successfully.");
            const params = { 'message': 'Your form has been uploaded successfully.' };
            res.status(200).render('index.pug', params);
        }
    });
});

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
