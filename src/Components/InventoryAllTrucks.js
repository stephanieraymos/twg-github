import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

const url = ""; //API LINK

const Inventory = () => {
    const [loading, setLoading] = useState(true);
    const [trucks, setTrucks] = useState([]);
    const [value, setValue] = useState(0);
  
    const fetchTrucks = async () => {
      const response = await fetch(url);
      const newTrucks = await response.json();
      setTrucks(newTrucks);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchTrucks();
    }, []);
  
    if (loading) {
      return (
        <section className="section loading">
          <h1>Loading ...</h1>
        </section>
      );
    }
    const { truckName, truckPrice, truckContents, id } = trucks[value];
  
    return (
      <section className="section">
        <div className="title">
          <h2>Trucks</h2>
          <div className="underline"></div>
        </div>
        <div className="trucks-center">
          {/* btn container */}
          <div className="btn-container">
            {trucks.map((truck, index) => {
              return (
                <button key={truck.id} onClick={() => setValue(index)} className={`trucks-btn ${index === value && 'active-btn'}`}>
                  {truck.truckName}
                </button>
              );
            })}
          </div>
          <article className="truck-info">
            <h3>{truckName}</h3>
            <h4>{truckPrice}</h4>
            <p className="truck-contents">{truckContents}</p>
            {contents.map((content, index) => {
              return (
                <div key={index} className="truck-contents">
                  <FaAngleDoubleRight className="truck-icon" />
                  <p>{content}</p>
                </div>
              );
            })}
          </article>
        </div>
      </section>
    );
  }
export default Inventory;

// TP-51