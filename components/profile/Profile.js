import React from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head'

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
        <>
            <Head>
                <title>Dashboard</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <h1 className="font-SFProDisplay  leading-tight text-4xl ml-12 text-black  pt-6">Dashboard</h1>
            <div className="flex">
                <div className="relative bg-white rounded-2xl  shadow-md bg-amber-600  h-60 w-52 ml-12 mt-6 ">
                    <div className="absolute top-0 left-0 pl-5 pt-6">
                        <div className="flex justify-center rounded-full bg-amber-500 w-10 h-10 items-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " viewBox="0 0 20 20"
                                 fill="white">
                                <path
                                    d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 pl-5 pb-6">
                        <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-white md:text-3xl font-SFProText ">20</h2>
                        <h3 className="text-xs font-regular text-white sm:text-1xl sm:leading-7 sm:text-white md:text-2xl font-SFProText ">People</h3>
                    </div>
                </div>
                <div className="relative bg-white rounded-2xl  shadow-md bg-red-400  h-60 w-52 ml-12 mt-6 ">
                    <div className="absolute top-0 left-0 pl-5 pt-6">
                        <div className="flex justify-center rounded-full bg-red-300 w-10 h-10 items-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="white">
                                <path fillRule="evenodd"
                                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                      clipRule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 pl-5 pb-6">
                        <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-white md:text-3xl font-SFProText ">03</h2>
                        <h3 className="text-xs font-regular text-white sm:text-1xl sm:leading-7 sm:text-white md:text-2xl font-SFProText ">Departments</h3>
                    </div>
                </div>
            </div>
            {/*<div className="home flex  items-center justify-center  sm:px-8 sm:py-12 sm:gap-x-8 md:py-16">*/ }
            {/*    <div*/ }
            {/*        className="flex  items-center justify-center  sm:px-8 sm:py-12 sm:gap-x-8 md:py-16 bg-white rounded-lg  shadow-md">*/ }
            {/*        <div*/ }
            {/*            className=" space-y-5  ">*/ }
            {/*            <p className="text-sm font-medium text-white sm:mb-1 sm:text-gray-500">Profile</p>*/ }
            {/*            <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">{ session.user.name }</h2>*/ }
            {/*            <p className="flex items-center text-black text-sm font-medium">*/ }
            {/*                <img src={ session.user.image } alt="" className="w-6 h-6 rounded-full mr-2 bg-gray-100"/>*/ }
            {/*                own by { session.user.email }*/ }
            {/*            </p>*/ }
            {/*            <div*/ }
            {/*                className=" flex space-y-5 items-center  justify-center">*/ }
            {/*                <button type="button"*/ }
            {/*                        className=" bg-red-700 text-white text-base font-semibold px-6 py-2 rounded-lg"*/ }
            {/*                        onClick={ () => signOut() }>Sign out*/ }
            {/*                </button>*/ }
            {/*            </div>*/ }
            {/*        </div>*/ }
            {/*    </div>*/ }

            {/*    <div*/ }
            {/*        className="flex  items-center justify-center  sm:px-8 sm:py-12 sm:gap-x-8 md:py-16 bg-white rounded-lg  shadow-md">*/ }
            {/*        <div*/ }
            {/*            className=" space-y-5  ">*/ }
            {/*            <p className="text-sm font-medium text-white sm:mb-1 sm:text-gray-500">Profile</p>*/ }
            {/*            <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">{ session.user.name }</h2>*/ }
            {/*            <p className="flex items-center text-black text-sm font-medium">*/ }
            {/*                <img src={ session.user.image } alt="" className="w-6 h-6 rounded-full mr-2 bg-gray-100"/>*/ }
            {/*                own by { session.user.email }*/ }
            {/*            </p>*/ }
            {/*            <div*/ }
            {/*                className=" flex space-y-5 items-center  justify-center">*/ }
            {/*                <button type="button"*/ }
            {/*                        className=" bg-red-700 text-white text-base font-semibold px-6 py-2 rounded-lg"*/ }
            {/*                        onClick={ () => signOut() }>Sign out*/ }
            {/*                </button>*/ }
            {/*            </div>*/ }
            {/*        </div>*/ }
            {/*    </div>*/ }
            {/*</div>*/ }
        </>
    )
}

export default Profile;
