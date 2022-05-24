import nextConnect from 'next-connect';
import middleware from '../../../../middlewares/database';

import { getSession } from 'next-auth/react'

const handler = nextConnect();

handler.use( middleware );

handler.post( async ( req, res ) =>
{

    try {
        //Get Id from body
        const _id = req.body.id;
        //Check Session from auth
        const session = await getSession( { req } )
        if ( !session ) {
            return res.status( 400 ).json( { msg: "Invalid Authentication!" } )
        }
        // Delete the Employee details from mongoDB
        await req.db.collection( 'Employee' ).deleteOne(
            { _id: require( 'mongodb' ).ObjectId( _id ) }
        );

        // return a message
        return res.json( {
            message: 'Employee deleted successfully',
            success: true,
        } );
    } catch (error) {

        // return an error
        return res.json( {
            message: new Error( error ).message,
            success: false,
        } );
    }
} );

export default handler;
