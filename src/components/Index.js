import NavBar from "./NavBar";
import Intro from "./Intro";
import Footer from "./Footer";

let Index = ()=>{

    return(

        <>
            <main className={"h-screen mb-10"} >
                <NavBar/>
                <Intro/>
            </main>
            <Footer/>
        </>
    )
}

export default Index;