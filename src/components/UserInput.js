import {AiFillMail, AiFillMessage} from 'react-icons/ai'
import {useState} from "react";
let UserInput = ({placeholder, icon, type, size, text, textChange})=>{

    return(

        <div className={`${size ? size : 'w-72'}`}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {icon}
                </div>
                <input type={`${ type ? type : 'text'}`} id="input-group-1"
                       className={`${ text.error ? 'bg-red-50 border border-red-300 text-red-900' : 'bg-gray-50 border border-gray-300 text-gray-900'} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                       placeholder={placeholder} value={text.message}  onChange={textChange}/>
            </div>

        </div>

    );

}

export default UserInput;