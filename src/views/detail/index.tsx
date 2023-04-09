
 
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
 
const Detail: FunctionComponent<Props> = () => {
    return ( <div className="about">
            这是Detail组件
            </div> );
}
 
export default Detail;