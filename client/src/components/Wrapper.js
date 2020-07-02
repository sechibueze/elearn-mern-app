import React, { Fragment} from 'react';
const Wrapper = ({ children }) => {
  return ( 
    <Fragment>
      <div className="container"> { children } </div>
    </Fragment>
   );
}
 
export default Wrapper;