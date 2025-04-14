const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db')

app.use(cors())
app.use(express.json())
app.use('/api',require('./routes/signup'));
app.use('/api',require('./routes/login'));
app.use('/api',require('./routes/sendWelcomeMail'));



const { OAuth2Client } = require("google-auth-library");
const clientId = "393138480612-36lq1t4hknhgsido310fmgd7i7209g4s.apps.googleusercontent.com"
const client = new OAuth2Client("393138480612-36lq1t4hknhgsido310fmgd7i7209g4s.apps.googleusercontent.com");

app.post("/api/google-login", async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId,
        });

        const payload = ticket.getPayload();
        console.log("Google User:", payload);

        res.json({
            message: "Google Login Successful",
            user: payload
        });
    } catch (error) {
        res.status(401).json({ message: "Google Authentication Failed" });
    }
});


app.listen("8080",()=>{
    console.log("Server running on port 8080")
})