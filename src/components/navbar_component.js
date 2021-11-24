import React from "react";
import { Link } from "react-router-dom";
import { AiOutlinePoweroff, AiFillHome } from "react-icons/ai";

export const Navbar_view = () => {
  return (
    <div className="container-fluid shadow-sm">
      <div className="d-flex flex-row">
        <div className="container_logo">
          <Link to="/home">
            <img src="/assets/rocacrm.jpeg" className="logo img-fluid" />
          </Link>
        </div>
        <div className="container_menu container_menu--gris">
          <div className="d-flex justify-content-start">
            
              <Link className="nav-link active" aria-current="page" to="/">
                <div className="col">
                  <AiFillHome size="50" />
                </div>
              </Link>
              <Link className="nav-link" to="/">
                <div className="col">
                <p>Jorge García Méndez</p>
                </div>
              </Link>

            <div className="ms-auto d-flex">
              <Link className="nav-link active" aria-current="page" to="/">
                <div className="col">
                  <AiFillHome size="50" />
                </div>
              </Link>
              <div>|</div>
              <Link className="nav-link active" aria-current="page" to="/">
                <div className="col">
                  <AiFillHome size="50" />
                </div>
              </Link>
              <div>|</div>
              <Link className="nav-link" to="/">
                <div className="col">
                  <AiOutlinePoweroff size="50" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="d-flex flex-row">
    //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //     <div className="container-fluid">
    //       <div className="container">
    //         <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    //           <div className="navbar-nav">
    //             <Link className="nav-link active" aria-current="page" to="/">
    //               <div>
    //                 <AiFillHome />
    //               </div>
    //             </Link>
    //             <Link className="nav-link" to="/display_flex">
    //               <div>
    //                 <AiOutlinePoweroff />
    //               </div>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>
    //</div>
  );
};
