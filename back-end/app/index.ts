const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
import router from "./routes"
import axios from 'axios'

const app = express()

export default class Application {
    constructor() {
        this.configServer();
        this.config();
        this.setRoutes();
        this.startTharkiPing();
    }

    configServer() {
        app.listen(process.env.PORT, (err: object) => {
            if (err) console.log(err);
            console.log(`server run on port ${process.env.PORT} ....`)
            if (process.env.MODE == 'dev') console.log("Development mode is enabled :)")
        })
    }

    config() {
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(cors())
    }

    setRoutes() {
        app.use(router)
    }

    startTharkiPing() {
        console.log("⚡ Starting tharki pings to avatars-placeholder.onrender.com every 5 minutes... Meri jawaani ke saath! 💋");
        
        setInterval(async () => {
            try {
                const res = await axios.get('https://avatars-placeholder.onrender.com');
                console.log("🔥 Avatar API Response:", res.data);
            } catch (err) {
                console.error("Chiiii! Error in tharki network request:", err);
            }
        }, 5 * 60 * 1000);
    }
}
