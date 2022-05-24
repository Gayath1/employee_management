import nextConnect from 'next-connect';
import middleware from '../../../../middlewares/database';

//Get session Using Next auth
import { getSession } from 'next-auth/react'

const handler = nextConnect();

handler.use( middleware );

handler.post( async ( req, res ) =>
{
    try {

        //Check Session auth
        const session = await getSession( { req } )
        if ( !session ) {
            return res.status( 400 ).json( { msg: "Invalid Authentication!" } )
        }
        // add the Employee
        let doc = await req.db.collection( 'Employee' ).insertOne( req.body );
        // return a message
        return res.json( {
            message: 'Employee added successfully',
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
