import React from 'react';

const Footer = () => {
  return ( 
    <footer style={{
      display: 'flex',
      flexDirection: 'row',
      justfiyContent: 'center',
      alignContent: 'center',
      padding: '2rem',
      backgroundColor: '#333',
      color: '#f9f9f9',
      
    }}>
      <p style={{textAlign: 'center'}}>
      Made with <span className='fa fa-heart' /> from <a style={{color: '#f9f9f9'}} href='https://sechibueze.github.io' target='_blank' noreferrer noopener>Samuel Chibueze</a>

      </p>
    </footer>
   );
}
 
export default Footer;