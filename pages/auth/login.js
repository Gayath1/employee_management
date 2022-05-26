import { getProviders, signIn, getSession } from "next-auth/react";

import Googlebtn from '../../components/login/Googlebtn'

//Custom login page
function Login ( { providers } )
{

    return (
        <>
            { Object.values( providers ).map( ( provider ) => (
                <div key={ provider.name }>
                    <Googlebtn onClick={ () => signIn( provider.id ) }/>
                </div>
            ) ) }
        </>
    );
}

export default Login;

//Server Side Auth to Check Session
export const getServerSideProps = async ( context ) =>
{
    const session = await getSession( context );
    if ( session ) {
        return {
            redirect: { destination: "/profile/profile" },
        };
    }
    return {
        props: {
            session,
            providers: await getProviders()
        },
    };
};
