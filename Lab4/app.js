const express = require("express")
const bcrypt = require('bcrypt')
const http = require("http")
const multer = require("multer")
const cookieParser = require('cookie-parser')
const cookies = require('cookie-parse')
const jwt = require('jsonwebtoken')
const crud = require('./crud.js')
const rw = require('./utils/json.js')
const io = require("socket.io")({
    serveClient: true,
    cookie: true
})

const port = 3333
const jsonParser = express.json()
const app = express()
const server = http.createServer(app)

app.use(express.static(__dirname + "/views/public"))

const usersPath = 'users.json'
const tokenKey = 'b91028378997c0b3581821456edefd0ec'

app.use(express.static(__dirname))
app.use(multer({ dest: "uploads" }).single("task-files"))

let lastFile

app.use(cookieParser())

app.use(async (req, res, next) => {
    console.log('auth', req.cookies)
    try {
        let decoded = jwt.verify(req.cookies.token, tokenKey)
        let users = rw.readToJSON(usersPath)
        let user = users.find(u => u.login === decoded.login)
        req.logged = user !== undefined && await bcrypt.compare(decoded.password, user.hashedPassword)
    } catch {
        req.logged = false
    }
    next()
})

io.use(async function (socket, next) {
    let token
    try {
        token = cookies.parse(socket.handshake.headers.cookie).token
    } catch {
        token = undefined
    }

    console.log("token ", token)
    let logged
    try {
        let decoded = jwt.verify(token, tokenKey)
        let users = rw.readToJSON(usersPath)
        let user = users.find(u => u.login === decoded.login)
        logged = user !== undefined && await bcrypt.compare(decoded.password, user.hashedPassword)
    } catch {
        logged = false
    }
    if (logged) {
        next()
    } else {
        next(new Error('Authentication error'))
    }
})
    .on('connection', function (socket) {
        console.log("connected")

        socket.on("askTasks", () => crud.onReadTasks(io))

        socket.on("createTask", (data) => {
            crud.onCreateTask(data, lastFile)
            crud.onReadTasks(io)
        })

        socket.on("completeTask", (taskId, data) => {
            crud.onUpdateCompleted(taskId, data)
            crud.onReadTasks(io)
        })

        socket.on("deleteTask", (taskId) => {
            crud.onDeleteTask(taskId)
            crud.onReadTasks(io)
        })
    })

app.get("/download/:taskId/:filename", function (req, res) {
    console.log(req.logged)
    if (!req.logged) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    crud.onDownload(req, res)
})

app.post("/signIn", jsonParser, function (req, res) {
    crud.onSignIn(req, res);
})

app.post("/signUp", jsonParser, function (req, res) {
    crud.onSignUp(req, res);
})

app.post("/upload", function (req, res, next) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    console.log(req.file)
    lastFile = req.file
    next()
})

io.attach(server)
server.listen(port)
