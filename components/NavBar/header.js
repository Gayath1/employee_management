import React, { Fragment, useEffect, useState } from 'react'

import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'

import { useSession, signIn, signOut } from "next-auth/react"


export default function Header ()
{

    const { data: session, status } = useSession();


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
        <header className="relative bg-white z-50">
            <div className="border-b border-gray-200">
                <div className="h-16 flex items-center">

                    {/* Logo */ }
                    <div className="ml-4 flex lg:ml-0">
                        <a href="/">
                            <span className="sr-only">logo</span>
                            <img
                                className="h-10 w-auto"
                                src="https://www.pageuppeople.com/wp-content/uploads/2019/01/Top-60-Employee-Engagement-image14-1024x511.png"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="ml-auto flex items-center justify-center">
                        { session ? (
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:space-x-6">
                                <a href="/AddEmployee"
                                   className="text-sm font-medium text-gray-700 hover:text-gray-800">Add Employees</a>
                                <span className="h-6 w-px bg-gray-200" aria-hidden="true"/>
                                <a href="/ViewEmployee"
                                   className="text-sm font-medium text-gray-700 hover:text-gray-800">View Employees</a>

                            </div>
                        ) : null }
                    </div>
                    <div className="ml-auto flex items-center">
                        { session ? (
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                <img src={ session.user.image } alt=""
                                     className="w-6 h-6 rounded-full mr-2 bg-gray-100"/>
                                <a href="/Profile/profile"
                                   className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                    { session.user.email }
                                </a>
                                <span className="h-6 w-px bg-gray-200" aria-hidden="true"/>
                                <a href="#" onClick={ () => signOut() }
                                   className="text-sm font-medium text-gray-700 hover:text-gray-800">Sign out</a>
                                <span className="h-6 w-px bg-gray-200" aria-hidden="true"/>
                            </div>
                        ) : (
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                <a href="/api/auth/signin"
                                   className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                   onClick={ () => signIn() }>Sign
                                    in</a>
                                <span className="h-6 w-px bg-gray-200" aria-hidden="true"/>

                            </div>
                        ) }

                    </div>
                </div>
            </div>
        </header>
    )
}
