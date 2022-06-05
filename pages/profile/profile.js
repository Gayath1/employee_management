import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

import Profile from '../../components/profile/Profile'
import axios from "axios";



function protectedpage ()
{
    const [employee, setEmployee] = useState('')
    const [department, setDepartment] = useState('')

    //fetch Employee count
    const fetchData = async () =>
    {

        await axios.get( `/api/count/Employee` )
            .then( res =>
            {
                setEmployee( res.data.message )
            } );
    };

    //fetch Department count
    const fetchDepartment = async () =>
    {

        await axios.get( `/api/count/Department` )
            .then( res =>
            {
                setDepartment( res.data.message )
            } );
    };


    useEffect( () =>
    {
        fetchData();
        fetchDepartment();
    }, [] )

    if ( !employee && !department ) {
        return (

            <div
                className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                <div
                    className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
                <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this
                    page.</p>
            </div>
        )
    }

    return (
        <Profile Employee={employee} Department={department}/>
    );
}

//Server Side auth
export async function getServerSideProps ( context )
{
    const session = await getSession( context );
    if ( !session ) {
        context.res.writeHead( 302, { Location: "/" } );
        context.res.end();
        return {};
    }
    return {
        props: {
            user: session.user,
        },
    };
}

export default protectedpage;
