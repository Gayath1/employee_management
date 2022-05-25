import React from 'react';


export function TextField ( props )
{


    return (

        <div className="relative z-0 w-full mb-6 group">
            <input type={ props.type } name={ props.name }
                   className="block py-2.5 px-0 w-full text-sm text-black-900  bg-transparent border-0 border-b-2 border-gray appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   placeholder=" " onChange={ props.onChange } value={ props.value } disabled={props.disable} required/>
            <label htmlFor="floating_email"
                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{ props.label }</label>
        </div>
    );
}


export function MobileField ( props )
{


    return (

        <div className="relative z-0 w-full mb-6 group">
            <input type='tel' name={ props.name }
                   className="block py-2.5 px-0 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-purple appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   placeholder=" " required onChange={ props.onChange } value={ props.value } pattern="[0-9]{3}[0-9]{3}[0-9]{4}" />
            <label htmlFor="mobile"
                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{ props.label }</label>
        </div>
    );
}

export function SelectField ( props )
{


    return (

        <div className="relative z-0 w-full mb-6 group">
            <select name={ props.name }
                    className="block py-2.5 px-0 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-purple appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required="" onChange={ props.onChange } value={ props.value }>
                <option selected>Choose a { props.name }</option>
                { props.data }
            </select>
            <label htmlFor="mobile"
                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{ props.label }</label>
        </div>
    );
}
