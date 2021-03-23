import video from "../img/video.mp4";
import warehouse from "../img/warehouse-sm.jpg";
import { useGlobalContext } from "../context";
import modalandsidebar from "../css/modalandsidebar.css";
import { Link } from "react-router-dom";

const Home = () => {
  document.title = "Home";
  const { openModal, isModalOpen } = useGlobalContext();

  return (
    <>
      {/* {<Navigation /> && style={{display: "none"}}} */}
      <div className="home-container" id="home-content">
        {window.innerWidth >= 900 ? (
          <video className="bg-video" autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <img src={warehouse} alt="Warehouse image" className="bg-img" />
        )}

        <div className="content">
          <main>
            <button className="modal-btn" onClick={openModal}>
              Login / Signup
            </button>
          </main>
          <div className={`${isModalOpen ? "sub-content-dis" : "sub-content"}`}>
            <h1 className="home-header">The WholeSale Group</h1>
            <div className="btn-container">
              <div className="center-btn">
                <Link
                  to="/InventoryAllTrucks"
                  style={{ textDecoration: "none", color: "white" }}
                  className="button"
                >
                  See more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

// TP-22
