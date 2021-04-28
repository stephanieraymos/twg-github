import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: "#f7f8fc",
  },
  card: {
    borderRadius: 15,
  },
  title: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
    color: theme.palette.text.secondary,
  },
  body: {
    fontFamily: "Montserrat, sans-serif",
    color: theme.palette.text.se,
  },
  title_centered: {
    fontFamily: "Montserrat, sans-serif",
    textAlign: "center",
    fontWeight: 700,
    color: theme.palette.text.secondary,
  },
  body_centered: {
    fontFamily: "Montserrat, sans-serif",
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  button: {
    fontFamily: "Montserrat, sans-serif",
    margin: "auto",
  },
}));
