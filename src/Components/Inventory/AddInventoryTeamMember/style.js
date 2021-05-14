import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        width: "100%",
    },
    formRoot: {
        width: "100%",
    },
    textField: {
        width: "100%",
        color: theme.palette.text.primary,
        fontFamily: "Montserrat, sans-serif",
    },
    title: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 700,
        color: theme.palette.text.primary,
    },
    time: {
        fontFamily: "Montserrat, sans-serif",
        textAlign: "right",
        color: theme.palette.text.secondary,
    },
    label: {
        fontFamily: "Montserrat, sans-serif",
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(1),
    },
    label2: {
        fontFamily: "Montserrat, sans-serif",
        color: theme.palette.text.primary,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    label3: {
        fontFamily: "Montserrat, sans-serif",
        color: theme.palette.text.secondary,
        textAlign: "center"
    },
    button: {
        marginTop: theme.spacing(2)
    },
    addFileButton: {
        marginRight: theme.spacing(2)
    },
    chip: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    gridList: {
        height: 600,
    },
    helperText: {
        fontFamily: "Montserrat, sans-serif",
        color: theme.palette.error.main,
        marginTop: theme.spacing(1),
    }
}));

export default useStyles;