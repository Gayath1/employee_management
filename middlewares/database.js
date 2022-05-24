import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

//Get URI from .env file
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// check the MongoDB URI
if ( !MONGODB_URI ) {
    throw new Error( 'Define the MONGODB_URI environmental variable' );
}

// check the MongoDB DB
if ( !MONGODB_DB ) {
    throw new Error( 'Define the MONGODB_DB environmental variable' );
}


const client = new MongoClient( process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} );

//Connect to MongoDB
function database ( req, res, next )
{

    return client.connect().then( () =>
    {
        req.dbClient = client;
        req.db = client.db( process.env.DB_NAME );
        return next();
    } );

}

const middleware = nextConnect();

middleware.use( database );

export default middleware;

