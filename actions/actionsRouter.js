const express = require( 'express' );

const Actions  = require( '../data/helpers/actionModel'  );
const Projects = require( '../data/helpers/projectModel' );

const router = express.Router();

router.use( express.json() );

router.get( '/', ( req, res ) => {
  
} );

router.get( '/:id', ( req, res ) => {
  
} );

router.put( '/:id', ( req, res ) => {
  
} );

router.delete( '/:id', ( req, res ) => {
  
} );

function validateActionId( req, res, next ) {
  Actions.getById( req.params.id )
  .then( action => {
    if ( action ) { req.action = action; next(); }
    else { res.status( 400 ).json( { message: "invalid post id" } ) }
  } );
}

function validateAction( req, res, next ) {
  const userData = req.body;

  if ( userData ) {
    if( userData.project_id ) {
      if ( userdata.description ) {
        if ( userData.notes ) { next(); }
        else { res.status( 400 ).json( { message: "missing required notes field" } ); } }
      else { res.status( 400 ).json( { message: "missing required description field" } ); } }
    else { res.status( 400 ).json( { message: "missing required project_id field" } ); } }
  else { res.status( 400 ).json( { message: "missing action data" } ); }
}

module.exports = router;