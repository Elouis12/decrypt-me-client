import { AiFillGithub, AiFillLinkedin, AiFillMail, AiOutlineCopyrightCircle } from "react-icons/ai";

let Footer = ()=>{

    let currentYear = new Date().getFullYear();

    return(

        <footer className={" flex flex-col justify-center items-center h-32 bg-black w-full space-y-3"}>
            {/* SOCIALS */}
            <div className={"flex item-center justify-center space-x-6"}>

                <a href={"https://github.com/Elouis12"}> <AiFillGithub size={25} color={"white"}/> </a>
                <a href={"https://www.linkedin.com/in/ernesto-louis-46795b235/"}> <AiFillLinkedin size={25} color={"white"}/> </a>
                <a href={"mailto:elouis12@me.com"}> <AiFillMail size={25} color={"white"}/> </a>
            </div>

            {/* COPYRIGHT NOTICE */}
            <div>
                <p className={"text-white"}>copyright <AiOutlineCopyrightCircle style={{ display: 'inline-block' }}/>  {currentYear} | Decrypt Me</p>
            </div>

        </footer>
    )

}

export default Footer;