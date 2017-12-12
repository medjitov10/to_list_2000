import React from 'react';

const Footer = () => {
  return (
    <div>
      <ul className='footer-social-ul'>
        <h3 className='footer-social-ul'>Contact Me</h3>
        <li>
          <a href="https://www.instagram.com/jooz.yo/"  target="_blank">
            <i className="fa fa-instagram fa-lg" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="https://github.com/medjitov10"  target="_blank">
            <i className="fa fa-github fa-lg" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/osmanmed/"  target="_blank">
            <i className="fa fa-linkedin-square fa-lg" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
      <div>
        <i className="contact fa fa-phone-square" aria-hidden="true"></i>
        <span className='contact'>(516) 288 1476</span>
      </div>
      <div>
        <i className="contact fa fa-envelope" aria-hidden="true"></i>
        <span className='contact'>medjitov10@gmail.com</span>
      </div>
    </div>

  );
};

export default Footer;
