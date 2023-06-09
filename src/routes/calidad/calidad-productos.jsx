import * as React from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import Carousel from "../../components/carousel";
import Papers from "../../components/papers";
import Carta from "../../components/card";
import {
  createNewPaper,
  deleteCard,
  deletePaper,
  getArticles,
  getCards,
  getCarouselItems,
  getPapers,
  newCard,
} from "../../axiosMain";
import { useSelector } from "react-redux";
import NewCardDto from "../edit/models/newCardDto";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Link, useOutletContext } from "react-router-dom";
import NewPaperDto from "../edit/models/newPaperDto";
import Sidebar from "../edit/sidebar";
import AfterCarousel from "../../components/page components/afterCarousel";
import AfterCards from "../../components/page components/afterCards";
import MaqromLogo from '../../assets/MaqromLogo.png' ; 
import AfterPapers from "../../components/page components/afterPapers";
import calidadProductos from '../../assets/calidadProductos.jpg'
export default function CalidadProductos() {
  const [cards, setCards] = React.useState([]);
  const [papers, setPapers] = React.useState([]);
  const [articles, setArticles] = React.useState([]);
  const [carouselItems, setCarouselItems] = React.useState([]);
  const [sidebar, setSidebar] = useOutletContext();

  const route = "CalidadProductos";

  React.useEffect(() => {
    getArticles(setArticles);
    getCarouselItems(setCarouselItems, route);
    getCards(setCards, route);
    getPapers(setPapers, route, "");
    setSidebar(false);
  }, []);

  const mode = useSelector((state) => state.adminMode.value);

  const handleNewCard = async () => {
    const card = new NewCardDto(route);
    await newCard(card, route).then(() => {
      getCards(setCards, route);
    });
  };

  // const handleNewPaper = async () => {
  //   const paper = new NewPaperDto(route, "");
  //   await createNewPaper(paper, route, "").then(() => {
  //     getPapers(setPapers, route, "");
  //   });
  // };

  const handleDelete = async (idCard) => {
    deleteCard(idCard, setCards, route).then(() => {
      getCards(setCards, route);
    });
  };

  const handleDeletePaper = async (idPaper) => {
    await deletePaper(idPaper).then(() => {
      getPapers(setPapers, route, "");
    });
  };

  const toogle = (open) => {
    setSidebar(open);
  };

  const isArticle = (article) => {
    const articleList = articles.map((item) => item.articleName);
    return articleList.includes(article);
  };
  return(
    <Box > 
        <AfterCarousel 
          image ={ calidadProductos }
          texto = { textos.textoAfterCarousel }
        />
        <Grid
                container
                spacing ={0.5}
                rowGap={5}
                justifyContent={'space-around'}
                display={'flex'}
                flexDirection={'row'}
        >
          {cards.map( ( item ) =>(
      
              <Certificado 
                  key = { item.idCard }
                  img = { item.img }
                  title = { item.title }
                  content = { item.content }
                  route = { item.route }
                  idCard = { item.idCard }
                  isLocked = { item.isLocked }
                  CardWidth = '100'
                  CardHeight = '300'
                  handleDelete = { handleDelete }
                  article = { item.article }
                  hasArticle = { isArticle( item.article ) }
                  buttons = { mode }
              /> 
          ))} 
        </Grid>
        <Box  sx={{ backgroundColor: '#F3F3F3' , padding: '1em' }} /> 
        <AfterCards
           firstText={ textos.primerTexto }
           secondText={ textos.segundoTexto }
           thirdText={ textos.tercerTexto }
           title={ textos.titulo }
           route = {route}
        />  
        <Box  sx={{ backgroundColor: '#F3F3F3' , padding: '1em' }} />  
            <Box  sx={{ backgroundColor: '#F3F3F3' , padding: '1em' }} />
            <AfterPapers afterPapersText = { textos.textoAfterPapers } />
            <Box  sx={{ backgroundColor: '#E66825' , padding: '1em' }} />
            <Box  sx={{ backgroundColor: '#F57A2E' , padding: '1em' }} />
            <Box  sx={{ backgroundColor: '#1F0318' , padding: '1em' }} />

        { mode && 
            <Sidebar 
                sidebar = { sidebar } 
                toogle = { toogle }
                handleNewCard = { handleNewCard }
                //handleNewPaper = { handleNewPaper }
            />  
        }
    </ Box>

  );
}


const textos = {
  primerTexto: "Productos",
  segundoTexto:"De calidad Maqrom",
  tercerTexto:"Llene nuestro formulario de contacto",
  titulo:"Respuesta en 72horas",
  textoAfterCarousel: "Nos destacamos por ofrecer productos de excelencia, diseñados con materiales de primera calidad y meticulosamente construidos para brindarte soluciones duraderas y funcionales." ,
  textoAfterPapers: " Nuestro compromiso con la calidad se extiende a cada etapa del proceso, desde la selección de los materiales hasta la entrega final, para garantizar la satisfacción total de nuestros clientes"
};