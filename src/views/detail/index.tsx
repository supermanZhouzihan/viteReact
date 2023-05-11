
 
// function About:any = () => {
//     return ( 
//         <div className="about">
//         这是about组件
//         </div>
//      );
// }

import { FunctionComponent } from "react";
import axios from "axios";
 
// export default About;

interface Props {
    
}

// function getCode(){
//     axios.get('/api/code')
//         .then(response => {
//             console.log(response.data);
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }
const Detail: FunctionComponent<Props> = () => {
    
    return ( <div className="about">
            这是Detail组件
            </div> );
}
 
export default Detail;


