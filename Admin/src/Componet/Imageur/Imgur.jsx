import React from 'react';

const Imgur = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p>Imgur cannot be displayed in an iframe. Click the button below to visit Imgur.</p>
      <a
        href="https://postimages.org/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#2ecc71',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '16px',
        }}
      >
        covert File to Link
      </a>
    </div>
  );
};

export default Imgur;
