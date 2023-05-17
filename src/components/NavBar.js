import lockIcon from "../lock_icon.png"
import {Link, useLocation} from "react-router-dom";
let NavBar = ()=>{

    const location = useLocation()
    const currentPath = location.pathname;

    return(

        /* NAV BAR */
        <nav className={"container mx-auto p-6 w-4/5"}>

            {/* FLEX CONTAINER */}
            <div className={"flex items-center justify-between"}  >

                {/* LOGO */}
                <div className="pt-2">
                    <Link to={"/"}> <img width={40} src={lockIcon} alt={"logo"}/> </Link>
                </div>

                {/* MENU ITEMS */}
                <div className="hidden space-x-6 md:flex ">
                    {/*<a className={"p-2 rounded-md shadow-md hover:text-veryDarkBlue"}><Link to={"/learn"}>Learn</Link></a>*/}
                    {/*<a className={"p-2 rounded-md shadow-md hover:text-veryDarkBlue"}><Link to={"/about"}>About</Link></a>*/}
                    {/*<a className={"p-2 rounded-md shadow-md hover:text-veryDarkBlue"}><Link to={"/help"}>Help</Link></a>*/}
                </div>


                {/* BUTTON */}
                { !currentPath.includes('get-started') && <a href="" className={"hidden md:block p-3 px-6 pt-2 text-white bg-black rounded-full baseline hover:bg-darkGrayishBlue"}><Link to={"/get-started"}>Get Started</Link></a> }


            </div>

        </nav>
    );
}

export default NavBar;

