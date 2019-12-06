const express = require( 'express' );
const helmet  = require( 'helmet'  );

const actionsRouter  = require( '../actions/actionsRouter'   );
const projectsRouter = require( '../projects/projectsRouter' );

const server = express();

function logger( req, res, next ) {
  console.log( `${ req.method }to ${ req.originalUrl }` )
  next();
}

server.use( helmet() );
server.use( express.json() );
server.use( logger );
server.use( '/api/actions', actionsRouter   );
server.use( '/api/projects', projectsRouter );

module.exports = server;