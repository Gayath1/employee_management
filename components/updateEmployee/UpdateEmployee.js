import React, { useState } from 'react';

import Modal from '@mui/material/Modal';

import { TextField, MobileField } from '../textField/TextField';
import { AlertSuccessful, AlertError } from '../alert/Alert'


export default function PopUp ( props )
{

    const [open, setOpen] = React.useState( false );

    //POP Card Close
    const handleClose = () => setOpen( false );

    const [firstName, setFirstName] = useState( '' )
    const [lastName, setLastName] = useState( '' )
    const [birthday, setBirthday] = useState( '' )
    const [Address, setAddress] = useState( [{ address: '' }] )
    const [Contact, setContact] = useState( [{ contact: '' }] )
    const [department, setDepartment] = useState( '' )
    const [designation, setDesignation] = useState( '' )
    const [empId, setEmpId] = useState( '' )
    const [nic, setNic] = useState( '' )
    const [_id, set_id] = useState( '' )

    const [cDesignations, setCDesignations] = useState( [[]] )

    const body = {
        FirstName: firstName,
        LastName: lastName,
        Birthday: birthday,
        Address: Address,
        Contact: Contact,
        Department: department,
        Designation: designation,
        EmpId: empId,
        Nic: nic,
        _id: _id
    };

    //set row data to Form
    const fetchData = async () =>
    {
        set_id( props.data._id )
        setFirstName( props.data.FirstName )
        setLastName( props.data.LastName )
        setBirthday( props.data.Birthday )
        setAddress( props.data.Address )
        setContact( props.data.Contact )
        setDepartment( props.data.Department )
        setDesignation( props.data.Designation )
        setEmpId( props.data.EmpId )
        setNic( props.data.Nic )
    };

    const handleOpen = () =>
    {

        fetchData();
        setOpen( true )
    };

    //Send updated data to parent for update
    const handleUpdate = async ( e, body ) =>
    {
        await props.update( e, body )
        setOpen( false )
    };

    //update Address onChange
    const handleFormChange = ( index, e ) =>
    {
        let data = [...Address];
        data[index][e.target.name] = e.target.value;
        setAddress( data );
    }

    //update Contact onChange
    const handleContactChange = ( index, e ) =>
    {
        let data = [...Contact];
        data[index][e.target.name] = e.target.value;
        setContact( data );
    }
    //Map Departments
    let departmentList = props.positions.length > 0
        && props.positions.map( ( item, i ) =>
        {
            return (
                <option key={ i } value={ item.Department }>{ item.Department }</option>
            )
        } );
    //Map Designations according to Selected Department
    const changeDesignation = ( e ) =>
    {
        setDepartment( e.target.value )
        let designationList = props.positions.length > 0
            && props.positions.map( ( item ) => (
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
        <>
            <button
                className="text-green-600  hover:text-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={ handleOpen }>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
            </button>
            <Modal
                open={ open }
                onClose={ handleClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <form className="m-10 p-4 max-w-l bg-white rounded-lg  shadow-md sm:p-6 lg:p-8 "
                      onSubmit={ ( e ) => handleUpdate( e, body ) }>

                    { props.Message?.type === 'success' &&
                        <AlertSuccessful onClick={ ( e ) => props.disbleAleart( e ) }/> }
                    { props.Message?.type === 'error' && (
                        <AlertError onClick={ ( e ) => props.disbleAleart( e ) } error={ props.Message.error }/>
                    ) }

                    <TextField label="First name" type="text" name="FirstName"
                               onChange={ ( e ) => setFirstName( e.target.value ) } value={ firstName }
                               disable={ true }/>
                    <TextField label="Last name" type="text" name="LastName"
                               onChange={ ( e ) => setLastName( e.target.value ) } value={ lastName } disable={ true }/>
                    { Address.map( ( input, index ) =>
                    {
                        return (
                            <div key={ index }>
                                <TextField label="Address" type="text" name="address"
                                           onChange={ ( e ) => handleFormChange( index, e ) } value={ input.address }/>
                            </div>
                        )
                    } ) }

                    <div className="grid xl:grid-cols-2 xl:gap-6">
                        <TextField label="Birthday" type="date" name="Birthday"
                                   onChange={ ( e ) => setBirthday( e.target.value ) } value={ birthday }
                                   disable={ true }/>
                        { Contact.map( ( input, index ) =>
                        {
                            return (
                                <div key={ index }>
                                    <MobileField label="Mobile No" type="text" name="contact"
                                                 onChange={ ( e ) => handleContactChange( index, e ) }
                                                 value={ input.contact }/>
                                </div>
                            )
                        } ) }
                    </div>
                    <div className="grid xl:grid-cols-2 xl:gap-6">
                        <TextField label="Employee Id" type="text" name="EmpId"
                                   onChange={ ( e ) => setEmpId( e.target.value ) } value={ empId } disable={ true }/>
                        <TextField label="National Id" type="text" name="Nic"
                                   onChange={ ( e ) => setNic( e.target.value ) } value={ nic } disable={ true }/>
                    </div>
                    <div className="grid xl:grid-cols-2 xl:gap-6">

                        <div className="relative z-0 w-full mb-6 group">
                            <select name="Department"
                                    className="block py-2.5 px-0 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-purple appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    required="" onChange={ ( e ) => changeDesignation( e ) }
                                    value={ department }>
                                <option defaultValue hidden>
                                    { department }
                                </option>
                                { departmentList }
                            </select>
                            <label htmlFor="mobile"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{ props.label }</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <select name="Designation"
                                    className="block py-2.5 px-0 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-purple appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    required="" onChange={ ( e ) => setDesignation( e.target.value ) }
                                    value={ designation }>
                                <option defaultValue hidden>
                                    { designation }
                                </option>
                                { designations }
                            </select>
                            <label htmlFor="mobile"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{ props.label }</label>
                        </div>
                    </div>
                    <button type="submit"
                            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update
                    </button>
                </form>

            </Modal>
        </>
    );
}
