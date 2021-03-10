import Navigation from "./Navigation";
import { useGlobalContext } from "./context";
import inventory from "../css/inventory.css";

function Inventory() {
  document.title = "Inventory - Database";
  const { trucks, truckManifest } = useGlobalContext();

  const getManifest = async () => {
    const response = await fetch("http://143.110.225.28/api/v1/inventory/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        truckManifestName: truckManifest,
      }),
    });
    const json = await response.json();
    window.open({truckManifest})
    console.log(json, response);
  };


  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="table-wrapper">
        <div className="header-items">
          <p className="all-trucks-table-header-name truck">TRUCK NAME</p>
          <p className="all-trucks-table-header-price price">PRICE</p>
          <p className="all-trucks-table-header-contents contents">CONTENTS</p>
          <p className="all-trucks-table-header-manifest manifest">MANIFEST</p>
        </div>

        <div className="truckLoad-list">
          {trucks.map((truck) => {
            const {
              id,
              truckName,
              truckPrice,
              truckContents,
              truckManifest,
            } = truck;

            return (
              <div className="truckLoad" key={id}>
                <p className="items all-trucks-name">{truckName}</p>
                <p className="items all-trucks-price">${truckPrice}</p>
                <p className="items all-trucks-contents">{truckContents}</p>
                <a href="#" onClick={getManifest} target="_blank">
                  <p className="items all-trucks-manifest">MANIFEST</p>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Inventory;
