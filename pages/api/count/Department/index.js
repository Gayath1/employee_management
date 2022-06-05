import nextConnect from 'next-connect';
import middleware from '../../../../middlewares/database';

import { getSession } from 'next-auth/react'

const handler = nextConnect();

handler.use( middleware );

handler.get( async ( req, res ) =>
{
    try {
        //Check Session from NextAuth
        const session = await getSession( { req } )
        if ( !session ) {
            return res.status( 400 ).json( { msg: "Invalid Authentication!" } )
        }

        // fetch the Employee data
        let Employees = await req.db
            .collection( 'Department' )
            .count();
        // return the Data
        return res.json( {
            message: JSON.parse( JSON.stringify( Employees ) ),
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
