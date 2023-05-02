import { Box, Button, TextField } from '@mui/material';
import * as React from 'react'; 

import { useState } from 'react';
import { Form } from 'react-router-dom';
import { login } from './axiosMain';
import { adminMode } from './components/redux/adminToken';
import { useSelector, useDispatch } from 'react-redux' ; 






export default function Admin( ) {    

    const mode = useSelector( ( state ) => state.adminMode.value ) ;
 
    const dispatch = useDispatch() ;

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const handleUsernameChange = ( e ) => setUsername( e.target.value.toLowerCase() ) ; 
    const handlePasswordChange = ( e ) => setPassword( e.target.value ) ; 
    

    const handleSubmit = async ( e ) =>{
        e.preventDefault() ;
        const func = login ; 
        const result = await func( username, password ) ; 
        if( !result ){
            console.log( mode  ) ;

        }
        else {
            alert( 'Se han activado los derechos de Administrador' ) ;
            dispatch( adminMode( mode ) ) ;
            console.log( mode  ) ;

        }
    }

    

    return (
        <Box
            sx = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                
            }}
        >
          <Form
            className = 'FormLogin'
            onSubmit = { handleSubmit }
          > 
            <TextField
                id="filled-basic" 
                label="Usuario" 
                variant="filled" 
                type = "text"
                
                onChange = { handleUsernameChange }
             />
             <TextField 
                id = "filled-basic" 
                label = "contraseña" 
                variant = "filled" 
                type = "password"
               
                onChange = { handlePasswordChange }
             />
             <Button 
                type = 'submit'
            
             >

                Entrar como Administrador 
             </Button> 
             <Button 
                type = 'submit'
            
             >

                Esto genera una accion 
             </Button> 
            
          </Form> 
      
           
        </Box>

    );

}