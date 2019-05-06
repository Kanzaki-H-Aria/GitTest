const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2]

if(!port) {
    console.log('请指定端口')
    process.exit(1)
}

const server = http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true)
    let path = req.url
    let query = ''
    if(path.indexOf('?') >= 0) {
        query = path.substring(path.indexOf('?'))
    }
    let pathNoQuery = parsedUrl.pathname
    let queryObject = parsedUrl.query
    let method = req.method
    switch(path) {
        case '/':
            res.setHeader('Content-type','text/html;charset=utf-9')
            res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Document</title>
                <script src="main.js"></script>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                Hello, world!  
            </body>
            </html>`)
            res.end()
            break
        case '/main.js':
            res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
            res.write(`alert('Hello.js')`)
            res.end()
            break
        case '/style.css':
            res.setHeader('Content-Type', 'text/css; charset=utf-8')
            res.write(`
                body {
                    color: red;
                }
            `)
            res.end()
            break
        default:
            res.statusCode = 404
            res.end()
        
    }
})

server.listen(port)
console.log(`监听${port}端口`)