const express = require( 'express' );

const Actions  = require( '../data/helpers/actionModel'  );
const Projects = require( '../data/helpers/projectModel' );

const router = express.Router();

router.use( express.json() );

//==========================================================================================
router.get( '/', ( req, res ) => {
  Projects.get()
    .then( projects => {
      res.status( 200 ).json( projects );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "problem getting projects" } );
    } );
} );

router.get( '/:id', validateProjectId, ( req, res ) => {
  if ( req.project ) { res.status( 200 ).json( req.project ); }
  else { res.status( 400 ).json( { message: "there was a problem getting the project at that id" } ); }
} );

router.get( '/:id/actions', validateProjectId, ( req, res ) => {
  Projects.getProjectActions( req.params.id )
    .then( actions => {
      res.status( 200 ).json( actions );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "there was a problem retreiving the actions" } );
    } );
} );

router.post( '/', validateProject, ( req, res ) => {
  Projects.insert( req.project )
    .then( project => { res.status( 200 ).json( project ); } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "there was a problem posting the project" } );
    } );
} );

router.post( '/:id/actions', validateProjectId, validateAction, ( req, res ) => {
  Actions.insert( { project_id: req.params.id, ...req.action } )
    .then( action => {
      res.status( 200 ).json( action );
    })
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "there was a problem posting the action" } );
    } );
} );

router.put( '/:id', validateProjectId, validateProject, ( req, res ) => {
  Projects.update( req.params.id, req.project )
    .then( project => {
      res.status( 200 ).json( project );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "there was a problem updating the project" } );
    } );
} );

router.delete( '/:id', validateProjectId, ( req, res ) => {
  Projects.remove( req.params.id )
    .then( projects => {
      res.status( 200 ).json( projects );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "there was a problem deleting the project" } );
    } );
} );

//==========================================================================================
function validateProjectId( req, res, next ) {
  Projects.get( req.params.id )
    .then( project => {
      if ( project ) { req.project = project; next(); }
      else { res.status( 400 ).json( { message: "invalid project id" } ); }
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "error validating project id" } );
    } );
}

function validateProject( req, res, next ) {
  const userData = req.body;

  if ( userData ) {
    if ( userData.name ) {
      if ( userData.description ) { req.project = userData; next(); }
      else { res.status( 400 ).json( { message: "missing required description field" } ); } }
    else { res.status( 400 ).json( { message: "missing required name field" } ); } }
  else { res.status( 400 ).json( { message: "missing project data" } ); }
}

function validateAction( req, res, next ) {
  const userData = req.body;
  userData.project_id = req.params.id;

  if ( userData ) {
    if( userData.project_id ) {
      if ( userData.description ) {
        if ( userData.notes ) { req.action = userData; next(); }
        else { res.status( 400 ).json( { message: "missing required notes field" } ); } }
      else { res.status( 400 ).json( { message: "missing required description field" } ); } }
    else { res.status( 400 ).json( { message: "missing required project_id field" } ); } }
  else { res.status( 400 ).json( { message: "missing action data" } ); }
}
//==========================================================================================
module.exports = router;
