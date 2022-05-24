import nextConnect from 'next-connect';
import middleware from '../../../../middlewares/database';

import { getSession } from 'next-auth/react'

const handler = nextConnect();

handler.use( middleware );

handler.put( async ( req, res ) =>
{

    try {
        //Get req.body data
        const { _id, Contact, Department, Designation, Address } = req.body;
        //Check Session from NextAuth
        const session = await getSession( { req } )
        if ( !session ) {
            return res.status( 400 ).json( { msg: "Invalid Authentication!" } )
        }
        // Update the Employee data according to ID
        await req.db.collection( 'Employee' ).updateOne(
            { _id: require( 'mongodb' ).ObjectId( _id ) },
            { $set: { Contact, Department, Designation, Address } }
        );

        // return a message
        return res.json( {
            message: 'Employee updated successfully',
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
