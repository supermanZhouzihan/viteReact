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
const Detail=lazy(() => import("@/views/detail"))
const Help =lazy(() => import("@/views/help"))
const Intro=lazy(() => import("@/views/intro"))
const Login=lazy(()=>import("@/views/login"))

const withLoadingComponent = (comp: JSX.Element) => (
    <React.Suspense fallback={<div>loading...</div>}>
        {comp}
    </React.Suspense>
)
const baseRouter = [
    {
        path: "/",
        element: <Navigate to={'/about'}></Navigate>
    },
    {
        path: "/login",
        element: withLoadingComponent(<Login></Login>)
    },

    {
        path: "/",
        element: withLoadingComponent(<Home />),
        children: [
            // {
            //     path: "/login",
            //     element: withLoadingComponent(<Login></Login>)
            // },
            {
                path: "/about",
                element: withLoadingComponent(<About></About>)
            },
            {
                path: "/detail",
                element: withLoadingComponent(<Detail></Detail>)
            },
            {
                path: "/help",
                element: withLoadingComponent(<Help></Help>)
            },
            {
                path: "/intro",
                element: withLoadingComponent(<Intro></Intro>)
            }

        ]
    },
    {
        path:"*",
        element: <Navigate to={'/about'}></Navigate>
    }

]
export default baseRouter