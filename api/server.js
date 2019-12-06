const express = require( 'express' );
const helmet  = require( 'helmet'  );

const actionsRouter  = require( '../routes/actionsRouter'   );
const projectsRouter = require( '../routes/projectsRouter' );

const server = express();

function logger( req, res, next ) {
  console.log( `${ req.method }to ${ req.originalUrl }` )
  next();
}

server.get('/', ( req, res ) => {
  res.send(`
    <h2>Lambda Web API Sprint Challenge</h>
    <p>Welcome to the Web API</p>
  `);
});

server.use( helmet()       );
server.use( express.json() );
server.use( logger         );

server.use( '/api/actions',  actionsRouter  );
server.use( '/api/projects', projectsRouter );

module.exports = server;
