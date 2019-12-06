const express = require( 'express' );

const Actions  = require( '../data/helpers/actionModel'  );

const router = express.Router();

router.use( express.json() );

//==========================================================================================
router.get( '/', ( req, res ) => {
  Actions.get()
    .then( actions => {
      res.status( 200 ).json( actions );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "problem getting projects" } );
    } );
} );

router.get( '/:id', validateActionId, ( req, res ) => {
  if ( req.action ) { res.status( 200 ).json( req.action ); }
  else { res.status( 400 ).json( { message: "there was a problem getting the action at that id" } ); }
} );

router.put( '/:id', validateActionId, validateAction, ( req, res ) => {
  console.log( req.action );
  Actions.update( req.params.id, req.action )
    .then( action => {
      res.status( 200 ).json( action );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "there was a problem updating the action" } );
    } );
} );

router.delete( '/:id', validateActionId, ( req, res ) => {
  Actions.remove( req.params.id )
    .then( actions => {
      res.status( 200 ).json( actions );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "there was a problem deleting the action" } );
    } );
} );

//==========================================================================================
function validateActionId( req, res, next ) {
  Actions.get( req.params.id )
    .then( action => {
      if ( action ) { req.action = action; next(); }
      else { res.status( 400 ).json( { message: "invalid action id" } ) }
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "error validating action id" } );
    } );
}

function validateAction( req, res, next ) {
  const userData = req.body;

  if ( userData ) {
    if ( userData.description ) {
      if ( userData.notes ) { req.action = { ...req.action, ...userData }; next(); }
      else { res.status( 400 ).json( { message: "missing required notes field" } ); } }
    else { res.status( 400 ).json( { message: "missing required description field" } ); } }
  else { res.status( 400 ).json( { message: "missing action data" } ); }
}
//==========================================================================================
module.exports = router;