
const HOSTNAME = '127.0.0.1'
const PORT = 3010
const http = require( 'http' )
const jsonBody = require("body/json")
const sendJson = require("send-data/json")
const state = {
    scores: [
        { name: "Edwin", score: 50 },
        { name: "David", score: 39 }
    ]}

const resources = [ '/scores', '/' ]

const server = http.createServer( ( req, res ) => {
    console.log( req.url )
    console.log( req.headers )

    if ( req.method === "GET" ) {
        if ( !resources.includes( req.url ) ) {
            res.statusCode = 404
            res.end( "ERROR NOT FOUND" )
        } else if ( req.url.toLowerCase() === "/scores" ) {
            res.statusCode = 200
            res.setHeader( 'Content-Type', 'text/plain' )
            const responseBody = JSON.stringify(state.scores.sort( (a,b) => a.score > b.score  ))
            sendJson( req,res,responseBody )
            //res.end( responseBody )
        }
    } else if ( req.method === "POST" ) {
        res.statusCode = 201
        jsonBody( req, res, ( err, requestBody ) => {
            if ( err ) throw err
            state.scores.push( requestBody )
            const responseBody = 'success'
            res.end( responseBody )
        })
    }

    console.log( state.scores )
})

server.listen( PORT, HOSTNAME, () => {
    console.log( `Server running at http://${HOSTNAME}:${PORT}/` )
})
