import * as React from 'react';

import { DataGrid } from '@mui/x-data-grid';


import DeleteBtn from './Delete';
import PopUp from '../UpdateEmployee/updateEmployee'


export default function StickyHeadTable ( props )
{

    const columns = [
        { field: 'id', hide: true },
        {
            field: 'FirstName',
            headerName: 'First name',
            headerClassName: 'bg-gray-300',
            width: 150,
            flex: 1
        },
        {
            field: 'LastName',
            headerName: 'Last name',
            headerClassName: 'bg-gray-300',
            width: 150,
            flex: 1
        },
        {
            field: 'Birthday',
            headerName: 'Birthday',
            headerClassName: 'bg-gray-300',
            width: 130,
            flex: 1
        },
        {
            field: 'Address',
            headerName: 'Address',
            headerClassName: 'bg-gray-300',
            width: 300,
            flex: 2.5,
            renderCell: ( params ) => (

                <div>

                    { params.row.Address.map( ( data, index ) => (
                        <li key={ index }>{ data.address }</li>
                    ) ) }
                </div>
            ),
        },
        {
            field: 'Contact',
            headerName: 'Mobile',
            headerClassName: 'bg-gray-300',
            width: 150,
            flex: 1,
            renderCell: ( params ) => (

                <div>

                    { params.row.Contact.map( ( data, index ) => (
                        <li key={ index }>{ data.contact }</li>
                    ) ) }
                </div>
            ),
        },
        {
            field: 'Department',
            headerName: 'Department',
            headerClassName: 'bg-gray-300',
            width: 150,
            flex: 1
        },
        {
            field: 'Designation',
            headerName: 'Designation',
            headerClassName: 'bg-gray-300',
            width: 180,
            flex: 1
        },
        {
            field: 'EmpId',
            headerName: 'Employee Id',
            headerClassName: 'bg-gray-300',
            width: 150,
            flex: 1
        },
        {
            field: 'Nic',
            headerName: 'National Id',
            headerClassName: 'bg-gray-300',
            width: 150,
            flex: 1.5
        },
        {
            field: 'action',
            headerName: 'Action',
            headerClassName: 'bg-gray-300',
            width: 210,
            renderCell: ( params ) => (
                <>
                    <DeleteBtn onClick={ () => props.delete( params.row._id ) }/>
                    &nbsp;&nbsp;
                    <PopUp data={ params.row } update={ props.update } Message={ props.Message }
                           disbleAleart={ props.disbleAleart } positions={ props.positions }/>

                </>
            ),
        },
    ];


    return (

        <div className="m-10 p-4 max-w-l bg-white rounded-lg  shadow-md sm:p-6 lg:p-8 " style={ { height: 400 } }>

            <DataGrid
                rows={ props.data }
                columns={ columns }
                getRowId={ ( row ) => row._id }
                pageSize={ 5 }
                disableSelectionOnClick
            />
        </div>

    );
}
