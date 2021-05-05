import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import { authService } from "../../authService";

const AddInventoryButton = () => {
  let history = useHistory();
  let { url } = useRouteMatch();
  const { is_seller, is_admin, is_team_member } = authService.getUser();

  document.title = "Add Inventory";

  return (
    <>
      {/* //^ ---- ADD LOAD BUTTON ---- */}
      {(is_seller || is_admin || is_team_member) && (
        <div className="btn-container">
          <Button
            className="boot-button"
            style={{ margin: "1rem 0 -.75rem 0" }}
            onClick={(e) => {
              e.preventDefault();
              history.push(`${url}/add`);
            }}
          >
            Add Load
          </Button>
        </div>
      )}
    </>
  );
};
// TP-51

export default AddInventoryButton;
