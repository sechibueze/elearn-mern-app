import React, { Fragment } from 'react';
import spinnerUrl from  './spinner.gif';
const Loader = () => {
  return (
    <Fragment>
      <img 
        src={spinnerUrl}
        alt='Loading...'
        style={{
          display: 'block',
          margin: 'auto',
          width: '250px',
          textAlign: 'center'
        }}
      />
    </Fragment>
  );
}
 
export default Loader;