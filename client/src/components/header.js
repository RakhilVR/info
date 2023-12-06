import React from 'react';
import "./styles/header.css";

function Header() {
  return (
    <>
      <div className='row headerIMG'>

        <div className='col-12 col-sm-6  d-flex align-items-center justify-content-center'>
          <div className="row">
            <div className="conatiner">


              <h2 className='discover text-center text-sm-start text-md-center text-lg-center text-xl-center'>DISCOVER TOP TALENT</h2>
              <h4 className='powered '>AI Powered Talent Solution</h4>
              <p className='description mt-1'>
                Unlock top-tier candidates matched to your specific needs <br />
                effortlessly with our AI-driven platform.  Streamlined hiring,
                <br /> exceptional results.
              </p>
              <span style={{ textAlign: 'left' }}>
                <button className='mt-3 hire' >Hire with AI Precision</button>
              </span>




            </div>
          </div>
        </div>

        <div className='col-12 col-sm-6 d-none d-md-block'>
          <img
            src="/img/Rectangle 783.png"
            className="d-inline-block align-top sideImg img-fluid"
            alt="Your Logo"
          />
        </div>

      </div>
    </>
  );
}

export default Header;
