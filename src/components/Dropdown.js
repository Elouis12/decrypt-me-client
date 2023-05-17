import {useEffect, useRef, useState} from "react";
import {AiFillMail} from "react-icons/ai";
import {IoIosArrowDropdownCircle} from "react-icons/io";


let Dropdown = ({color, text, message, cipherSelection, items})=>{

    let [isOpen, setIsOpen] = useState(false);
    let [itemSelected, setItemSelected] = useState("");
    let [selected, setSelected] = useState(text);

    let dropDownRef = useRef(null);
//
    const setMaxWidth = () => {

        const dropdownItems = dropDownRef.current.querySelectorAll("p");
        let maxWidth = 0;
        dropdownItems.forEach((item) => {
            maxWidth = Math.max(maxWidth, item.offsetWidth);
        });
        dropDownRef.current.classList.add(`max-w-${maxWidth}`);
    };

    useEffect(setMaxWidth, [])

// HANDLE MENU CLICK
    let handleMenuClick = (e)=>{

        setIsOpen(!isOpen);
    }

// HANDLE ITEM CLICK
    let handleItemClick = (e)=>{

        // alert(e.target.innerText)
        setItemSelected(e.target.innerText);
        // set value to dropdown
        setSelected(e.target.innerText);

        // update cipher selection
        cipherSelection(e.target.innerText);

        setIsOpen(!isOpen);

    }


// CIPHER SELECTED

    return(

        <div className="relative inline-block text-left">
            <div>
                <button type="button"
                        className={`${ message.error ? 'border-red-300 border-4' : '' } inline-flex justify-center items-center space-x-4 px-5 py-2 ${color} border  rounded-md font-semibold text-white hover:${color} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${color} max-w-full`}
                        id="menu-button" aria-expanded="true" aria-haspopup="true"
                    onClick={handleMenuClick} /*onBlur={handleMenuClick}*/ ref={dropDownRef}>
                    <span>{message.message === "" ? text : selected}</span>
                    <IoIosArrowDropdownCircle/>
                </button>
            </div>

            <div id="dropdown-menu"
                 className={`${!isOpen ? 'hidden' : ''} origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                 role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">

                    { items.map( (item)=>{

                        return <p onClick={handleItemClick} href="#"
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                            {item}
                        </p>

                    } ) }

                  </div>
            </div>
        </div>

    )
}

export default Dropdown;