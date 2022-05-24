import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';


const Profile = () =>
{


    const { data: session, status } = useSession();

    if ( status === 'loading' ) {
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

        <div className="home flex  items-center justify-center  sm:px-8 sm:py-12 sm:gap-x-8 md:py-16">
            <div
                className="flex  items-center justify-center  sm:px-8 sm:py-12 sm:gap-x-8 md:py-16 bg-white rounded-lg  shadow-md">
                <div
                    className=" space-y-5  ">
                    <p className="text-sm font-medium text-white sm:mb-1 sm:text-gray-500">Profile</p>
                    <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">{ session.user.name }</h2>
                    <p className="flex items-center text-black text-sm font-medium">
                        <img src={ session.user.image } alt="" className="w-6 h-6 rounded-full mr-2 bg-gray-100"/>
                        own by { session.user.email }
                    </p>
                    <div
                        className=" flex space-y-5 items-center  justify-center">
                        <button type="button"
                                className=" bg-red-700 text-white text-base font-semibold px-6 py-2 rounded-lg"
                                onClick={ () => signOut() }>Sign out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
