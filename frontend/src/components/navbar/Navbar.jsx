import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./Navbar.scss"

const Navbar = () => {

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive)
    }
  }, [])

  const currUser = {
    id: 1,
    username: "User1",
    isSeller: true
  }

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className='link' to="/">
            <span className='text'>GetWork</span>
            <span className='dot'>.</span>
          </Link>
        </div>
        <div className="links">
          <span>GetWork Business</span>
          <span>Explore</span>
          <span>Hindi</span>
          {!currUser?.isSeller && <span>Become a Seller</span>}
          {!currUser && <button>Join</button>}
          {currUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src="" alt="" />
              <span>{currUser?.username}</span>
              {open && <div className="options">
                {
                  currUser?.isSeller && (
                    <>
                      <Link className='link' to="/mygigs">Gigs</Link>
                      <Link className='link' to="/add">Add New Gig</Link>
                    </>
                  )
                }
                <Link className='link' to="/orders">Orders</Link>
                <Link className='link' to="/messages">Messages</Link>
                <Link className='link' to="/">Logout</Link>
              </div>}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (<>
        <hr />
        <div className="menu">
          <Link className='link menuLink' to="/">Graphics & Design</Link>
          <Link className='link menuLink' to="/">Video & Animation</Link>
          <Link className='link menuLink' to="/">Writing & Translation</Link>
          <Link className='link menuLink' to="/">AI Services</Link>
          <Link className='link menuLink' to="/">Digital Marketing</Link>
          <Link className='link menuLink' to="/">Music & Audio</Link>
          <Link className='link menuLink' to="/">Programming & Tech</Link>
          <Link className='link menuLink' to="/">Business</Link>
          <Link className='link menuLink' to="/">LifeStyle</Link>
        </div>
      </>)}
    </div>
  )
}

export default Navbar;