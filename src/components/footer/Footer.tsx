import React from 'react';
import logo from '../../assets/logo.jpg';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import google from '../../assets/google-play.png'
import apple from '../../assets/app-store.png'

function Footer() {
  return (
    <div className='main-container w-full flex'>
      <div className="source-container w-[30%] px-24 grid"> 
        <div className="company-container flex mt-2">
          <img className='w-[36px] h-[36px]' src={logo} alt="company-logo" />
          <label className='content-center text-2xl font-bold' >Bricks</label>
        </div>
        <label className='mb-6 mt-6'>Download the app by clicking the link below :</label>
        <div className="image-container flex *:w-[139px] *:h-[41px] ">
          <img className='pr-6' src={google} alt="play-store"/>
          <img src={apple} alt="app-store"/>
        </div>
      </div>
      <div className="pages-container w-[15%]">
        <label className='font-semibold m-2 text-xl pb-4'>Pages</label>
        <div className="contacts grid *:m-2">
          <label>
              How it works
          </label>
          <label>
              Pricing
          </label>
          <label>
              Blog
          </label>
          <label>
              Demo
          </label>
        </div>
      </div>
      <div className="service-container w-[15%]">
        <label className='font-semibold m-2 text-xl pb-4'>Service</label>
        <div className="contacts grid *:m-2">
          <label>
              Shoppify
          </label>
          <label>
              Wordpress
          </label>
          <label>
              UI/UX Design
          </label>
        </div>
      </div>
      <div className="contact-container w-[20%] ">
        <label className='font-semibold m-2 text-xl pb-4'>Contact Us</label>
        <div className="contacts grid *:m-2">
          <label>
            <CallIcon className='mr-2'/> (406) 555-0120
          </label>
          <label>
            <EmailIcon className='mr-2'/> mail.to@bricks.eu
          </label>
          <label>
            <LocationOnIcon className='mr-2'/> 2972 Westheimer Rd. Santa Ana, Illinois 85486 
          </label>
        </div>
      </div>
      <div className="social-container w-[20%] block ">
        <label className='font-semibold m-2 text-xl pb-4'>Social Media</label>
        <div className="sites *:m-2">
          <FacebookIcon/>
          <XIcon/>
          <LinkedInIcon/>
          <InstagramIcon/>
        </div>
      </div>
    </div>
  )
}

export default Footer;