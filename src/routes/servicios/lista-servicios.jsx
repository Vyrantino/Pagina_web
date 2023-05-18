import * as React from 'react' ;
import { useState, useEffect } from 'react';
import { 
    Box, Container ,

} from "@mui/material";

import { deleteCard, getArticles, getCards, newCard } from '../../axiosMain';
import { useSelector } from 'react-redux';
import NewCardDto from '../edit/models/newCardDto';
import { Button } from '@mui/material';
import Carta from '../../components/card';



export default function ListaServicios(){

    const [ cards, setCards ] = React.useState([]);
    const [ effect, setEffect ] = React.useState(true);  
    const [ articles, setArticles ] = React.useState([]) ;
    const url = "Servicios" ;
    React.useEffect(() => {
       getCards(  setCards  , url ) ;
       getArticles( setArticles ); 
    }, [ effect ]);

    const mode = useSelector( ( state ) => state.adminMode.value ) ;

    const handleNewCard = async (  ) =>{
        const card = new NewCardDto( url) ; 
        await newCard( card , url ) ;
        const updatedCards = await getCards( setCards , url ) ; 
    }

    const handleDelete = async ( idCard ) =>{
       
        deleteCard( idCard  , setCards,  url ) ;
        setEffect( !effect ) ;
    }

    const isArticle = ( article ) =>{
        const articleList = articles.map( ( item ) => item.articleName ) ;
        return articleList.includes( article ) ;
    }

    return(
        <Box className = "BoxListaProyectos" >
            <Container>
            { mode ? <Button aria-label='Crear Nueva Carta' onClick={ handleNewCard }> Crear Nueva Carta </ Button> : null }
                {
                    cards.map( ( item ) =>(
                        
                            <Carta 
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
                            />
                    
                    ))
                }
                        
            </Container>
        </Box>
    );

}