import { getSession } from "next-auth/react";
import React from "react";

import Profile from '../../components/profile/Profile'

function protectedpage ()
{
    return (
        <Profile/>
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
