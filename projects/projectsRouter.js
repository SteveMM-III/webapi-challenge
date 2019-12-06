const express = require( 'express' );

const Actions  = require( '../data/helpers/actionModel'  );
const Projects = require( '../data/helpers/projectModel' );

const router = express.Router();

router.use( express.json() );

router.get( '/', ( req, res ) => {
  
} );

router.get( '/:id', ( req, res ) => {
  
} );

router.get( '/:id/actions', ( req, res ) => {
  
} );

router.put( '/', ( req, res ) => {
  
} );

router.put( '/:id/actions', ( req, res ) => {
  
} );


function validateProjectId( req, res, next ) {
  Projects.getById( req.params.id )
  .then( project => {
    if ( project ) { req.project = project; next(); }
    else { res.status( 400 ).json( { message: "invalid project id" } ); }
  } );
}

function validateProject( req, res, next ) {
  const userData = req.body;

  if ( userData ) {
    if ( userData.name ) {
      if ( userData.description ) { next(); }
      else { res.status( 400 ).json( { message: "missing required description field" } ); } }
    else { res.status( 400 ).json( { message: "missing required name field" } ); } }
  else { res.status( 400 ).json( { message: "missing project data" } ); }
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