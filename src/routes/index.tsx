// import App from "@/App";
// import Home from "@/views/home";
// import About from "@/views/about";
// import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";




// const baseRouter = () => (
//     <BrowserRouter>
//         <Routes>
//             <Route path="/" element={<App></App>}>
//                 <Route path="/" element={<Navigate to='/home'></Navigate>}></Route>
//                 <Route path="/home" element={<Home></Home>} />
//                 <Route path="/about" element={<About></About>} />
//             </Route>
//         </Routes>
//     </BrowserRouter>
// )

// export default baseRouter


// import About from "@/views/about";
// import Home from "@/views/home";
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const About = lazy(() => import("@/views/about"))
const Home = lazy(() => import("@/views/home"))

const withLoadingComponent = (comp: JSX.Element) => (
    <React.Suspense fallback={<div>loading...</div>}>
        {comp}
    </React.Suspense>
)
const baseRouter = [
    {
        path: "/",
        element: <Navigate to={'/home'}></Navigate>
    },
    {
        path: "/about",
        element: withLoadingComponent(<About></About>)
    },
    {
        path: "/home",
        element: withLoadingComponent(<Home />)
    },

]
export default baseRouter