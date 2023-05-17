import Inputs from "./Inputs";
import Footer from "./Footer";
import NavBar from "./NavBar";


let CipherContent = ()=>{

    return(

        <>
            <main className={"h-screen mb-10"}>
                <NavBar/>
                <Inputs/>
            </main>
            <Footer/>
        </>
    )

}

export default CipherContent;