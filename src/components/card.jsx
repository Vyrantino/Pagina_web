import * as React from "react";
import { Box, Divider, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { loadArticle, loadIdCard, loadImg } from "./redux/editForm";
import { Link } from "react-router-dom";

export default function Carta(props) {
  const mode = useSelector((state) => state.adminMode.value);

  const dispatch = useDispatch();

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
      <Card raised>
        <CardMedia
          component="img"
          alt="green iguana"
          image={props.img}
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        />
        <CardContent>
          <Typography component="span" gutterBottom variant="h5">
            {props.title}
          </Typography>

          <Divider />

          <Typography component={"span"} variant="body2" color="text.secondary">
            {props.content}
          </Typography>
        </CardContent>
        {mode ? (
          <CardActions>
            {props.hasArticle ? (
              <Button
                variant="text"
                LinkComponent={Link}
                to="/article/"
                onClick={() => {
                  dispatch(loadArticle(props.article));
                }}
                sx={{
                  color: "red", // Cambia el color del texto aquí
                }}
              >
                <Typography color={`primary`}> Ver Articulo </Typography>
              </Button>
            ) : (
              <span />
            )}
            <Button
              variant="contained"
              LinkComponent={Link}
              to="/editCard/"
              onClick={() => {
                dispatch(loadIdCard(props.idCard)),
                  dispatch(loadImg(props.img));
              }}
            >
              <Typography component={"span"} color={`#350404`}>
                {" "}
                Editar{" "}
              </Typography>
            </Button>

            <Button
              onClick={() => {
                props.handleDelete(props.idCard);
              }}
              variant="contained"
            >
              <Typography component={"span"} color={`#350404`}>
                {" "}
                Borrar{" "}
              </Typography>
            </Button>
          </CardActions>
        ) : (
          //else
          <span />
        )}
      </Card>
    </Grid>
  );
}
