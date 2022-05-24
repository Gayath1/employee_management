import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { getSession, useSession } from "next-auth/react";

import { TextField, MobileField, SelectField } from '../../components/TextField/TextField';
import { AleartSuccessful, AleartError } from '../../components/Aleart/aleart'

function AddEmployee ()
{

    //Get Session
    const { data: session, status } = useSession();

    //States
    const [firstName, setFirstName] = useState( '' )
    const [lastName, setLastName] = useState( '' )
    const [birthday, setBirthday] = useState( '' )
    const [Address, setAddress] = useState( [{ address: '' }] )
    const [Contact, setContact] = useState( [{ contact: '' }] )
    const [department, setDepartment] = useState( '' )
    const [designation, setDesignation] = useState( '' )
    const [empId, setEmpId] = useState( '' )
    const [nic, setNic] = useState( '' )

    //Fetch data states
    const [positions, setPositions] = useState( [] )
    const [cDesignations, setCDesignations] = useState( [[]] )

    const [message, setMessage] = useState( undefined );

    //Fetch  designations data on Initial render
    const fetchData = async () =>
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
    }, [] )

    //Address onChanges
    const handleFormChange = ( index, e ) =>
    {
        let data = [...Address];
        data[index][e.target.name] = e.target.value;
        setAddress( data );
    }

    //Cotact onChanges
    const handleContactChange = ( index, e ) =>
    {
        let data = [...Contact];
        data[index][e.target.name] = e.target.value;
        setContact( data );
    }

    //Employee Data Submit handler
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();

        const body = {
            FirstName: firstName,
            LastName: lastName,
            Birthday: birthday,
            Address: Address,
            Contact: Contact,
            Department: department,
            Designation: designation,
            EmpId: empId,
            Nic: nic
        };

        await axios.post( `/api/Employee/Add`, body )
            .then( ( res ) =>
            {
                setMessage( { type: 'success' } );
                setFirstName( '' )
                setLastName( '' )
                setBirthday( '' )
                setAddress( [{ address: '' }] )
                setContact( [{ contact: '' }] )
                setDepartment( '' )
                setDesignation( '' )
                setEmpId( '' )
                setNic( '' )
            } ).catch( ( error ) =>
            {
                setMessage( { type: 'error', error } );
            } );
    }

    //Close Aleart
    const disbleAleart = ( e ) =>
    {
        e.preventDefault()
        setMessage( undefined )
    }

    //Add more Address fields
    const addFields = ( e ) =>
    {
        e.preventDefault();
        let address = { address: '' }
        setAddress( [...Address, address] )
    }
    //Add more Contact Fields
    const addFieldsContact = ( e ) =>
    {
        e.preventDefault();
        let contact = { address: '' }
        setContact( [...Contact, contact] )
    }

    //Remove Address Fields
    const removeFields = ( e, index ) =>
    {
        e.preventDefault();
        let data = [...Address];
        data.splice( index, 1 )
        setAddress( data )

    }
    //Remove Contact Fields
    const removeFieldsContact = ( e, index ) =>
    {
        e.preventDefault();
        let data = [...Contact];
        data.splice( index, 1 )
        setContact( data )

    }

    if ( status === 'loading' && positions ) {
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

    //Map Departments
    let departmentList = positions.length > 0
        && positions.map( ( item, i ) =>
        {
            return (
                <option key={ i } value={ item.Department }>{ item.Department }</option>
            )
        } );
    //Map Designations according to Selected Department
    const changeDesignation = ( e ) =>
    {
        setDepartment( e.target.value )
        let designationList = positions.length > 0
            && positions.map( ( item ) => (
                item.Department.includes( e.target.value ) ? item.Designation : ''
            ) )
        setCDesignations( designationList[0] )

    }

    let designations = cDesignations.length > 0
        && cDesignations.map( ( item, i ) =>
        {
            return (
                <option key={ i } value={ item }>{ item }</option>
            )
        } );

    return (

        <form className="m-10 p-4 max-w-l bg-white rounded-lg  shadow-md sm:p-6 lg:p-8 " onSubmit={ handleSubmit }>

            { message?.type === 'success' && <AleartSuccessful onClick={ ( e ) => disbleAleart( e ) }/> }
            { message?.type === 'error' && (
                <AleartError onClick={ ( e ) => disbleAleart( e ) } error={ message.error }/>
            ) }
            <div className="grid xl:grid-cols-2 xl:gap-6">
                <TextField label="First name" type="text" name="FirstName"
                           onChange={ ( e ) => setFirstName( e.target.value ) } value={ firstName }/>
                <TextField label="Last name" type="text" name="LastName"
                           onChange={ ( e ) => setLastName( e.target.value ) }
                           value={ lastName }/>
            </div>


            <div className="grid xl:grid-cols-2 xl:gap-6">
                <TextField label="Employee Id" type="text" name="EmpId" onChange={ ( e ) => setEmpId( e.target.value ) }
                           value={ empId }/>
                <TextField label="National Id" type="text" name="Nic" onChange={ ( e ) => setNic( e.target.value ) }
                           value={ nic }/>
            </div>
            <div className="flex items-center">

                <div className="flex-none">
                    <button onClick={ ( e ) => addFields( e ) }>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="flex-1 w-64">
                    { Address.map( ( input, index ) =>
                    {
                        return (
                            <div key={ index } className="flex ">
                                <button onClick={ ( e ) => removeFields( e, index ) }>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField label="Address" type="text" name="address"
                                           onChange={ ( e ) => handleFormChange( index, e ) } value={ input.address }/>
                            </div>
                        )
                    } ) }
                </div>
            </div>
            <div className="grid xl:grid-cols-2 xl:gap-6">
                <SelectField label="Department" name="Department" onChange={ ( e ) => changeDesignation( e ) }
                             value={ department } data={ departmentList }/>
                <SelectField label="Designation" name="Designation"
                             onChange={ ( e ) => setDesignation( e.target.value ) }
                             value={ designation } data={ designations }/>
            </div>
            <div className="grid xl:grid-cols-2 xl:gap-6">
                <TextField label="Birthday" type="date" name="Birthday"
                           onChange={ ( e ) => setBirthday( e.target.value ) }
                           value={ birthday }/>

                <div className="flex items-center">
                    <div className="flex-none">
                        <button onClick={ ( e ) => addFieldsContact( e ) }>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="flex-1 w-64">
                        { Contact.map( ( input, index ) =>
                        {
                            return (
                                <div key={ index } className="flex ">
                                    <button onClick={ ( e ) => removeFieldsContact( e, index ) }>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20"
                                             fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <MobileField label="Mobile No" type="text" name="contact"
                                                 onChange={ ( e ) => handleContactChange( index, e ) }
                                                 value={ input.contact }/>
                                </div>
                            )
                        } ) }
                    </div>
                </div>
            </div>
            <button type="submit"
                    className="text-white bg-indigo-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit
            </button>
        </form>

    );
}

//Server side auth
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

export default AddEmployee;
