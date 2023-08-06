import React from 'react'
import logo from 'assets/logo.png'
import ArrowRightAltTwoToneIcon from '@mui/icons-material/ArrowRightAltTwoTone';
import './_footer.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <div className="bg-dark footer">
      <div className="container text-white">
        <div className="row gx-0 gx-md-5 row-cols-1 row-cols-md-2 row-cols-lg-4 px-4 px-md-5 py-5">
          <div className="col">
            <img src={logo} className="rounded" width="60px" alt="" />
            <span className="ms-3 fs-5">Fashion Web</span>
            <div className="text-secondary mt-5">
              Your satisfaction is our priority - shop with confidence and find
              your perfect fit.
            </div>
          </div>
          <div className="col mt-5 mt-md-0">
            <h4 className="fw-bold mb-4 mb-md-5">Newsletter</h4>
            <div className="text-secondary ">Stay update with our latest</div>
            <div className="input-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <button className="btn btn-success text-white" id="basic-addon1">
                <ArrowRightAltTwoToneIcon className="arrow" />
              </button>
            </div>
          </div>
          <div className="col mt-5 mt-lg-0">
            <h4 className="fw-bold mb-4 mb-md-5">Instagram Feed</h4>
            <div className="row row-cols-4 text-center">
              <div className="col ">
                <img
                  src="https://images.unsplash.com/photo-1552432134-191ce4bdf1f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  width="45px"
                  height="45px"
                  alt=""
                />
              </div>
              <div className="col ">
                <img
                  src="https://images.unsplash.com/photo-1552323543-4cffa4ffffe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  width="45px"
                  height="45px"
                  alt=""
                />
              </div>
              <div className="col ">
                <img
                  src="https://images.unsplash.com/photo-1552319704-41c50c38c26e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  width="45px"
                  height="45px"
                  alt=""
                />
              </div>
              <div className="col ">
                <img
                  src="https://images.unsplash.com/photo-1552252220-62b2bdeadc4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                  width="45px"
                  height="45px"
                  alt=""
                />
              </div>
              <div className="col  mt-3">
                <img
                  src="https://images.unsplash.com/photo-1552240971-fbf96e9867e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                  width="45px"
                  height="45px"
                  alt=""
                />
              </div>
              <div className="col  mt-3">
                <img
                  src="https://images.unsplash.com/photo-1551923064-9f993866844e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                  width="45px"
                  height="45px"
                  alt=""
                />
              </div>
              <div className="col  mt-3">
                <img
                  src="https://images.unsplash.com/photo-1551760585-9fc2b3dc02dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                  width="45px"
                  height="45px"
                  alt=""
                />
              </div>
              <div className="col  mt-3">
                <img
                  src="https://images.unsplash.com/photo-1551801841-ecad875a5142?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                  width="45px"
                  height="45px"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col mt-5 mt-lg-0">
            <h4 className="fw-bold mb-4 mb-md-5">Follow Us</h4>
            <div className="text-secondary mb-3">Let us be social</div>
            <a
              href="https://www.facebook.com/mianzeeshankhaliq"
              target="_blank"
              className="text-light "
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/zeeshankhaliq219/"
              target="_blank"
              className="text-light ms-2"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://twitter.com/zeeshankhaliq29/"
              target="_blank"
              className="text-light ms-2"
            >
              <TwitterIcon />
            </a>
            <a
              href="https://www.youtube.com/@zeeshankhaliq"
              target="_blank"
              className="text-light ms-2"
            >
              <YouTubeIcon />
            </a>
          </div>
        </div>
        <hr />
        <div className="row pb-4">
          <div className="col text-center">
            Copyright &copy; {year}. All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
}
