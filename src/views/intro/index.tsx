
 
// function About:any = () => {
//     return ( 
//         <div className="about">
//         这是about组件
//         </div>
//      );
// }

import { FunctionComponent } from "react";

 
// export default About;

interface Props {
    
}
 
const Intro: FunctionComponent<Props> = () => {
    return ( <div className="about">
            这是intro组件
            </div> );
}
 
export default Intro;