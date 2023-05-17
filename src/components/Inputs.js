import UserInput from "./UserInput";
import {AiFillMail, AiOutlineRedo} from "react-icons/ai";
import Dropdown from "./Dropdown";
import {useRef, useState} from "react";
import {IoIosArrowDropdownCircle} from "react-icons/io";
import {BsFillKeyFill, BsFillLockFill, BsFillSendFill, BsFillUnlockFill} from "react-icons/bs";
import {FaLightbulb} from "react-icons/fa";

let Inputs = ()=>{

    let [isMessageSent, setIsMessageSent] = useState(false);
    let [isDecrypted, setIsDecrypted] = useState(false);
    let [hintUsed, setHintUsed] = useState("bg-yellow-100 text-black");
    let [shiftMessage, setShiftMessage] = useState({message:3, error:false});
    let [message, setMessage] = useState({message:'', error:false});
    let [decryptionMessage, setDecryptionMessage] = useState({ message: '', error: false });
    let [cipherUsed, setCipherUsed] = useState({message:'', error:false});
    let [cipherToUse, setCipherToUse] = useState({message:'', error:false});
    let [serverMessage, setServerMessage] = useState({message:'', cipher:'', shift: 3});
    let [decryptedText, setDecryptedText] = useState("");
    let [decryptInputIsOpen, setDecryptInputIsOpen] = useState(false);

// VALIDATE MESSAGE TO SEND

    let canSendMessage = ()=>{

        let send = true;

        // message is empty
        if( message.message === '' ){


            send = false;

            // update its error prop
            setMessage( {...message, error: true} )

        }else{

            setMessage( {...message, error: false} )
        }

        if( shiftMessage.message === '' || Number.parseInt(shiftMessage.message) < 1 ){

            send = false;

            // update its error prop
            setShiftMessage( {...shiftMessage, error: true} )

        }else{

            setShiftMessage( {...shiftMessage, error: false} )
        }

        // cipher used is empty
        if( cipherUsed.message === '' ){

            send = false;
            // update its error prop

            setCipherUsed( {...cipherUsed, error: true} )

        }else{
            setCipherUsed( {...cipherUsed, error: false} )

        }

        // cipher to use is empty
        if( cipherToUse.message === '' ){

            send = false;
            setCipherToUse( {...cipherToUse, error: true} )

        }else{

            setCipherToUse( {...cipherToUse, error: false} )

        }


        return send;

    }
// SEND MESSAGE TO SERVER

    let sendMessage = async ()=>{

        if( canSendMessage() ){

            let resp = await fetch('http://localhost:8080/client-prompt-response',
            {
                method: "POST",
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({

                    message: message.message,
                    cipher: ( cipherUsed.message === 'None' ? null : cipherUsed.message ),
                    shift: shiftMessage.message,
                    cipherToUse: cipherToUse.message

                })
            })

            // returns the new data added by default
            const data = await resp.json();

            if( data.message ){

                setIsMessageSent( true );
                setServerMessage( { ...serverMessage, message: data.message, cipher: data.cipher, shift: data.shift } );

            }
            console.log(data);

        }


    }

// CAN CHECK


    let canSendDecryptedMessage = ()=>{

        let send = true;

        // message is empty
        if( decryptionMessage.message === '' ){


            send = false;

            // update its error prop
            setDecryptionMessage( {...decryptionMessage, error: true} )

        }else{

            setDecryptionMessage( {...decryptionMessage, error: false} )
        }

        return send;

    }


    let sendDecryptedMessage = async ()=>{

        if( canSendDecryptedMessage() ){

            let resp = await fetch('http://localhost:8080/client-decryption-response',
                {
                    method: "POST",
                    headers:{
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({

                        message: decryptionMessage.message,
                        shift: shiftMessage.message

                    })
                })

            // returns the new data added by default
            const data = await resp.json();

            if( data.correct ){

                setHintUsed("bg-green-100 text-black");
                setDecryptInputIsOpen(!decryptInputIsOpen);
                setDecryptedText(data.decryptedMessage);

            }
            console.log(data);

        }

    }

    let getDecryptedMessage = async ()=>{


        let resp = await fetch(`http://localhost:8080/decrypted-response?shift=${shiftMessage.message}`,
            {
                method: "GET",
                headers:{
                    'Content-type': 'application/json'
                }
            })

        // returns the new data added by default
        const data = await resp.text();


        // setServerMessage( { ...serverMessage, message: data } );
        setDecryptedText( data );

        setHintUsed("bg-red-100 text-black");

        setDecryptInputIsOpen(!decryptInputIsOpen);

    }

    let resetStates = ()=>{

        setIsMessageSent(false);
        setHintUsed("bg-yellow-100 text-black");
        setMessage({message:'', error:false});
        setDecryptionMessage({ message: '', error: false });
        setCipherUsed({message:'', error:false});
        setCipherToUse({message:'', error:false});
        setServerMessage({message:'', cipher:'', shift: 3});
        setDecryptInputIsOpen(false);
        setDecryptedText("");
        setShiftMessage({message:3, error:false});

    }

    return(


        <div className={"flex flex-col mt-20 space-y-20"}>

            {/* USER INPUT SECTION */}
            <section className={"flex flex-col space-y-6  items-center justify-center space-x-6 w-4/5 m-auto md:flex-row md:space-y-0"}>

                <div>
                    <UserInput key={1} icon={<AiFillMail className="w-5 h-5 text-gray-500" />} placeholder={"Message"} text={message} textChange={ (e)=>{setMessage({...message, message: e.target.value, error: message.error});} }/>
                </div>

                <div className={"flex justify-center items-center space-x-6"}>
                    {/* CIPHER USED */}
                    <div>
                        <Dropdown color={'bg-black'} text={'Cipher Used'} items={['None', 'Caesar']} message={cipherUsed} cipherSelection={(cipher)=>{ setCipherUsed({...cipherUsed, message:cipher}) }}/>
                    </div>

                    {/* SHIFTS */}
                    <div className={`${cipherUsed.message === "Caesar" ? 'flex' : 'hidden'}`}>
                        <UserInput key={1} icon={<BsFillKeyFill className="w-5 h-5 text-gray-500" />} placeholder={"Shifts"} type={'number'} size={"w-24"} text={shiftMessage} textChange={ (e)=>{setShiftMessage({...shiftMessage, message: e.target.value, error: message.error});} }/>
                    </div>

                    {/* CIPHER TO USE */}
                    <div>
                        <Dropdown color={'bg-green-300'} text={'Cipher to Encrypt Response'} items={['Random', 'Caesar']} message={cipherToUse} cipherSelection={(cipher)=>{ setCipherToUse({...cipherToUse, message:cipher}) }} />
                    </div>
                </div>


                <div className={"flex justify-center items-center space-x-6"}>
                    <div>
                        <button type="button"
                                className={` ${decryptInputIsOpen ? 'hidden' : ''} inline-flex justify-center items-center space-x-4 px-5 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-blue-500`}
                                id="menu-button" aria-expanded="true" aria-haspopup="true"
                                onClick={sendMessage}>
                            <BsFillSendFill/>
                        </button>
                    </div>

                    <div>
                        <button type="button"
                                className={`inline-flex justify-center items-center space-x-4 px-5 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-red-500`}
                                id="menu-button" aria-expanded="true" aria-haspopup="true"
                                onClick={resetStates}>
                            <AiOutlineRedo/>
                        </button>
                    </div>
                </div>


            </section>


            {/* SERVER MESSAGE SENT */}
            <section className={`${ !isMessageSent ? 'hidden' : '' } flex items-center justify-center  w-4/5 m-auto rounded h-full`}>
                <div className={" w-[40%] p-3 flex flex-grow items-center justify-evenly h-full  rounded-l bg-black text-white"}>
                    <p>{serverMessage.cipher.charAt(0).toUpperCase() + serverMessage.cipher.slice(1)}</p>

                    <div className={'flex justify-between items-center space-x-3'}>
                        { <BsFillKeyFill/>}
                        <p>{serverMessage.shift}</p>
                    </div>

                </div>
                <div className={`${hintUsed} w-[80%] flex flex-col items-center justify-center p-3 h-full rounded-r text-center space-y-4`}>

                    <p>{serverMessage.message}</p>
                    <hr className={`${ decryptedText.length > 0 ? "w-1/2 border-solid border-black border-2" : "hidden" }`} />
                    <p className={ decryptedText.length > 0 ? "flex" : "hidden"}>{decryptedText}</p>



                </div>
            </section>


            {/* CLIENT DECRYPTION SECTION */}
            <section className={`${ (decryptInputIsOpen || !isMessageSent) ? 'hidden' : '' } flex flex-col space-y-6 items-center justify-center space-x-6 w-4/5 m-auto md:flex-row md:space-y-0`}>
                <div>
                    <UserInput key={2} icon={ !decryptInputIsOpen ? <BsFillLockFill className="w-5 h-5 text-red-500" /> : <BsFillUnlockFill color={'text-green-300'} className="w-5 h-5 text-green-500" />} placeholder={"Decrypted Message"} text={decryptionMessage} textChange={ (e)=>{setDecryptionMessage({ ...message, message: e.target.value});} } />
                </div>

                <div className={"flex justify-center space-x-6"}>
                    <div>
                        <button type="button"
                                className={`inline-flex justify-center items-center space-x-4 px-5 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-blue-500`}
                                id="menu-button" aria-expanded="true" aria-haspopup="true"
                                onClick={sendDecryptedMessage}>
                            <BsFillSendFill/>
                        </button>
                    </div>
                    <div>
                        <button type="button"
                                className={`inline-flex justify-center items-center space-x-4 px-5 py-2 bg-yellow-300 border border-transparent rounded-md font-semibold text-white hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-blue-500`}
                                id="menu-button" aria-expanded="true" aria-haspopup="true"
                                onClick={getDecryptedMessage}>
                            <FaLightbulb/>
                        </button>
                    </div>
                </div>

            </section>

        </div>
    );
}

export default Inputs;