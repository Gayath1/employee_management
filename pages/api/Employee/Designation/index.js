import nextConnect from 'next-connect';
import middleware from '../../../../middlewares/database';

import { getSession } from 'next-auth/react'

const handler = nextConnect();

handler.use( middleware );

handler.get( async ( req, res ) =>
{
    try {
        //Check session from NextAuth
        const session = await getSession( { req } )
        if ( !session ) {
            return res.status( 400 ).json( { msg: "Invalid Authentication!" } )
        }

        // fetch the Designation data and Department data from mongoDB
        let Department = await req.db
            .collection( 'Department' )
            .find( {} )
            .sort( { published: -1 } )
            .toArray();
        // return data
        return res.json( {
            message: JSON.parse( JSON.stringify( Department ) ),
            success: true,
        } );
    } catch (error) {
        // return the error
        return res.json( {
            message: new Error( error ).message,
            success: false,
        } );
    }
} );

export default handler;
