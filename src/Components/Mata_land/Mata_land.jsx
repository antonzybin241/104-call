import React from 'react'
import "./Mata_land.css"
import mata_l from "../Assets/home_h.png"
export default function Mata_land() {
  return (
    <div className='main_mata_land'>
    <div className="container hero-container">
        <div className="row align-items-center g-2 g-lg-3">
            <div className="col-md-6 right_text">
                {/* <h5>Explore ZK with</h5>
                <h5 className='fw-bold'>THE FIRST AND LARGEST</h5>
                <h5>MODULAR L2</h5>

                <h6>Manta Pacific Mainnet is Live</h6>
                <p>Manta Pacific is the first EVM-equivalent ZK-application platform that is scalable and secure through Celestia DA and Polygon zkEVM.</p> */}
                <div className="main_div_Text">
                {/* <img src={coin_logo} style={{width:"150px"}} className='mb-2' alt="" /> */}
                  <h1 className="hero-title txt_clr mb-1">
                    Global Real Estate Marketplace — Reals Tokens. Where real estate meets crypto to build a better future.
                  </h1>
                  <p className="site_font txt_clr hero-tagline mb-0">
                    <em>“Building a better future for your investments.”</em>
                  </p>

                </div>
            </div>
            <div className="col-md-6">
                <img src={mata_l} className='rounded mata_home_page w-100' alt="" />
            </div>
        </div>
    </div>

    </div>
  )
}
