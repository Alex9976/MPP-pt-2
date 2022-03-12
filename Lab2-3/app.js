const express = require('express')
const multer = require("multer")
const cookieParser = require('cookie-parser')
const moment = require('moment')
const Task = require('./task')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const port = 3333
const dataPath = 'data.json'
const idPath = 'id.json'
const usersPath = 'users.json'
const tokenKey = 'b91028378997c0b3581821456edefd0ec'

const jsonParser = express.json()
const app = express()
app.use(express.static(__dirname + "/views/public"))

app.use(express.static(__dirname))
app.use(multer({ dest: "uploads" }).single("task-files"))

app.use(cookieParser())

app.use(async (req, res, next) => {
    console.log(req.cookies)
    try {
        let decoded = jwt.verify(req.cookies.token, tokenKey)
        let users = readToJSON(usersPath)
        let user = users.find(u => u.login === decoded.login)
        req.logged = user !== undefined && await bcrypt.compare(decoded.password, user.hashedPassword)
    } catch {
        req.logged = false
    }
    next();
})

function readToJSON(path) {
    let data = fs.readFileSync(path, "utf8")
    return JSON.parse(data)
}

function writeToJSON(path, obj) {
    const data = JSON.stringify(obj, null, 2)
    fs.writeFileSync(path, data)
    return data
}

app.get("/tasks", function (req, res) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not signInorized' })
    }
    console.log(req.url)
    res.send(readToJSON(dataPath))
})

app.get("/download/:taskId/:filename", function (req, res) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not signInorized' })
    }
    let path = process.cwd() + "\\uploads\\" + req.params.filename
    let taskId = req.params.taskId
    let data = readToJSON(dataPath)
    let originalName = data.tasks.filter(x => x.id === parseInt(taskId))[0].file.originalname

    res.download(path, originalName)
})

app.post("/signIn", jsonParser, async function (req, res) {
    console.log(req.body)
    let users = readToJSON(usersPath)
    let user = users.find(u => u.login === req.body.login)
    if (user !== undefined) {
        const match = await bcrypt.compare(req.body.password, user.hashedPassword)
        if (match) {
            let token = jwt.sign(req.body, tokenKey, { expiresIn: 60 })
            res.cookie('token', token, { httpOnly: true })
            res.send(readToJSON(dataPath))
        }
        else {
            res.status(401).json({ message: 'Bad password' })
        }
    } else {
        res.status(401).json({ message: 'Not signInorized' })
    }
})

app.post("/signUp", jsonParser, function (req, res) {
    console.log(req.body)
    let users = readToJSON(usersPath)
    let user = users.find(u => u.login === req.body.login)
    if (user === undefined) {
        users.push({ login: req.body.login, hashedPassword: req.body.password })
        let token = jwt.sign(req.body, tokenKey, { expiresIn: 60 })
        res.cookie('token', token, { httpOnly: true })
        writeToJSON(usersPath, users)
        res.send(readToJSON(dataPath))
    } else {
        res.status(401).json({ message: 'Not signUporized' })
    }
})

let lastFile

app.post("/upload", function (req, res, next) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not signInorized' })
    }
    console.log(req.file)
    lastFile = req.file
    next();
})

app.post("/tasks", jsonParser, function (req, res) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not signInorized' })
    }
    if (!req.body)
        return res.sendStatus(404)
    let ids = readToJSON(idPath)
    let data = readToJSON(dataPath)

    ids.taskId = ids.taskId + 1;
    if (req.body.name === "") {
        req.body.name = `New task-${ids.taskId}`
    }
    if (req.body.expires === "") {
        req.body.expires = moment(new Date()).add(1, 'days').format('YYYY-MM-DDThh:mm')
    }

    const task = new Task(ids.taskId, req.body.name, req.body.expires, req.body.description, lastFile)
    data.tasks.push(task)

    console.log("POST task")
    console.log(req.body)

    writeToJSON(idPath, ids)
    res.send(writeToJSON(dataPath, data))
})

app.put("/tasks/complete/:taskId", jsonParser, function (req, res) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not signInorized' })
    }
    if (!req.body)
        return res.sendStatus(404)
    let data = readToJSON(dataPath)

    const taskId = req.params.taskId
    const index = data.tasks.findIndex(x => x.id == parseInt(taskId))
    data.tasks[index].isComplete = true

    console.log("POST task")
    console.log(req.body)

    writeToJSON(dataPath, data)
    res.send(writeToJSON(dataPath, data))
})

app.delete("/tasks/:taskId", function (req, res) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not signInorized' })
    }

    const taskId = req.params.taskId
    let data = readToJSON(dataPath)

    data.tasks = data.tasks.filter(x => x.id !== parseInt(taskId))

    res.send(writeToJSON(dataPath, data))
})

app.listen(port)
