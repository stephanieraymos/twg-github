import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./Hooks/useStyles";
import { authService } from "../../authService";

const AvailableInventoriesButton = ({ availableInventory, updateTable }) => {
  const classes = useStyles();
  const { is_seller } = authService.getUser();

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography className={classes.title_centered} gutterBottom>
          {is_seller ? "Your Available Inventories" : "Available Inventories"}
        </Typography>
        <Typography
          className={classes.body_centered}
          variant="h5"
          component="h2"
        >
          {availableInventory.length}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={() => updateTable(0)}
        >
          {is_seller
            ? "View Your Available Inventories"
            : "View Available Inventories"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default AvailableInventoriesButton;
