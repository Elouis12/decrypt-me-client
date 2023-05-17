import aiLogo from '../ai.jpg'
import {Link} from "react-router-dom";
let Intro = ()=>{

    return(

        <section>
            {/* FLEX CONTAINER */}
            <div className="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">


                {/* LEFT ITEM */}
                <div className="flex flex-col mb-32 space-y-12 md:w-1/2">
                    <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
                        Master encryption and decryption techniques
                        {/*Learn new encryption techniques while communicating with an AI-powered companion.*/}
                        {/*Understanding encryption techniques with the help of an AI-powered chatbot companion*/}
                    </h1>

                    <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
                        A web application designed to facilitate learning and practice of various encryption techniques, offering an engaging and interactive user experience with the help of an AI-powered chatbot companion.                     </p>

                    <div className="flex justify-center md:justify-start">
                        <a href="" className="text-left p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"><Link to={"/get-started"}>Get Started</Link></a>
                    </div>
                </div>

                {/* IMAGE ( RIGHT-ITEM )  */}
                <div className="md:w-1/2">
                    <img src={aiLogo} alt="AI image intro"/>
                </div>

            </div>
        </section>
    );

}

export default Intro;