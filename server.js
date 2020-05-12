const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const info = require("./data")
const courses = require("./data")


server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true    
})

server.get("/", function(req, res) {
    const about = {
        logo_url: "https://pbs.twimg.com/profile_images/953595371875422210/0pWsfSSp_400x400.jpg",
        name: "Rocketseat",
        description: "As melhores tecnologias em programação, direto ao ponto e do jeito certo.",
        links: [
            { name: "GitHub", url: "https://github.com/Rocketseat" },
            { name: "Facebook", url: "https://www.facebook.com/rocketseat" },
            { name: "Instagram", url: "https://www.instagram.com/rocketseat_oficial/" }
        ]
    }

    return res.render("about", { about })
})

server.get("/courses", function(req, res) {

    return res.render("courses", {items: info})
})

server.get("/course", function(req, res) {
    const id = req.query.id

    const course = courses.find(function(course) {
        return course.id == id
    })

    if (!course) {
        return res.send("course not found!")
    }

    return res.render("course", { item: course })
})

server.listen(5000, function() {
    console.log("server is running")
})