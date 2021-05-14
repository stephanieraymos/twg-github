import { makeStyles } from '@material-ui/core/styles';
import { 
    Typography, 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    label: {
        fontFamily: "Montserrat, sans-serif",
        color: theme.palette.text.secondary,
        textAlign: "center"
    },
}));

const NoFileComponent = () => {
    const classes = useStyles();
    return (
        <Typography className={classes.label}>
            No File/Image to Preview
        </Typography>
    );
}

export default NoFileComponent;