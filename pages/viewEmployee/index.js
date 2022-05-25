import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { getSession, useSession } from "next-auth/react";

import StickyHeadTable from '../../components/table/Table';


function ViewEmployee ()
{

    //Get Session
    const { data: session, status } = useSession();

    const [Message, setMessage] = useState( undefined );

    //Fetch data states
    const [positions, setPositions] = useState( [] )
    const [Employee, setEmployee] = useState( [] )

    //fetch Employee data
    const fetchData = async () =>
    {

        await axios.get( `/api/Employee/Get` )
            .then( res =>
            {
                setEmployee( res.data.message )
            } );
    };
    //Fetch  designations data on Initial render
    const fetchDesignation = async () =>
    {

        await axios.get( `/api/Employee/Designation` )
            .then( res =>
            {
                setPositions( res.data.message )
            } );

    };

    useEffect( () =>
    {
        fetchData();
        fetchDesignation();
    }, [] )

    //Update data handler
    const handleUpdate = async ( e, body ) =>
    {
        e.preventDefault()
        await axios.put( `/api/Employee/Update`, body )
            .then( ( res ) =>
            {
                setMessage( { type: 'success' } );
                fetchData();
            } ).catch( ( error ) =>
            {
                setMessage( { type: 'error', error } );
            } );
    }

    //DeleteHandler
    const handleDelete = async ( id ) =>
    {

        const body = { id };
        await axios.post( `/api/Employee/Delete`, body )
            .then( ( res ) =>
            {
                console.log( 'Deleted', body );
                fetchData();

            } ).catch( ( error ) =>
            {
                console.log( error );
            } );

    };

    //Disable Aleart
    const disbleAleart = ( e ) =>
    {
        e.preventDefault()
        setMessage( undefined )
    }

    if ( status === 'loading' ) {
        return (

            <div
                className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                <div
                    className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
                <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
            </div>
        )
    }

    return (
        <div>
            <StickyHeadTable data={ Employee } delete={ handleDelete } update={ handleUpdate } Message={ Message }
                             disbleAleart={ disbleAleart } positions={ positions }/>
        </div>

    );
}

//Server side Auth
export async function getServerSideProps ( context )
{
    const session = await getSession( context );
    if ( !session ) {
        context.res.writeHead( 302, { Location: "/auth/login" } );
        context.res.end();
        return {};
    }
    return {
        props: {
            user: session.user,
        },
    };
}

export default ViewEmployee;
