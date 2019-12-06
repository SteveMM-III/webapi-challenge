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
  if ( req.project ) {
    Projects.getProjectActions( req.params.id )
      .then( actions => {
        res.status( 200 ).json( actions );
      } )
      .catch( error => {
        console.log( error );
        res.status( 500 ).json( { error: "there was a problem retreiving the actions" } );
      } );
  } else {
    res.status( 500 ).json( { error: "there was a problem retreiving the actions" } );
  }
} );

router.post( '/', validateProject, ( req, res ) => {
  console.log( req.project );
  if ( req.project ) {
    Projects.insert( req.project )
      .then( project => { res.status( 200 ).json( project ); } )
      .catch( error => {
        console.log( error );
        res.status( 500 ).json( { error: "there was a problem posting the project" } );
      } );
  } else {
    res.status( 500 ).json( { error: "there was a problem posting the project" } );
  }
} );

router.put( '/:id', validateProjectId, validateProject, ( req, res ) => {
  if ( req.project ) {
    Projects.update( req.params.id, req.project )
      .then( project => {
        res.status( 200 ).json( project );
      } )
      .catch( error => {
        console.log( error );
        res.status( 500 ).json( { error: "there was a problem updating the project" } );
      } );
  } else {
    res.status( 500 ).json( { error: "there was a problem updating the project" } );
  }
} );

router.delete( '/:id', validateProjectId, ( req, res ) => {
  if ( req.project ) {
    Projects.remove( req.params.id )
      .then( projects => {
        res.status( 200 ).json( projects );
      } )
      .catch( error => {
        console.log( error );
        res.status( 500 ).json( { error: "there was a problem deleting the project" } );
      } );
  } else {
    res.status( 500 ).json( { error: "there was a problem deleting the project" } );
  }
} );

//==========================================================================================


function validateProjectId( req, res, next ) {
  Projects.get( req.params.id )
  .then( project => {
    if ( project ) { req.project = project; next(); }
    else { res.status( 400 ).json( { message: "invalid project id" } ); }
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

  if ( userData ) {
    if( userData.project_id ) {
      if ( userdata.description ) {
        if ( userData.notes ) { next(); }
        else { res.status( 400 ).json( { message: "missing required notes field" } ); } }
      else { res.status( 400 ).json( { message: "missing required description field" } ); } }
    else { res.status( 400 ).json( { message: "missing required project_id field" } ); } }
  else { res.status( 400 ).json( { message: "missing action data" } ); }
}
//==========================================================================================
module.exports = router;
