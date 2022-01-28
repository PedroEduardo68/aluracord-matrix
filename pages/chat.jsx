import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import { useState } from 'react';
import appConfig from '../config.json';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { useEffect } from 'react';

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMzMTg0MCwiZXhwIjoxOTU4OTA3ODQwfQ.U1mWlrkrs38kIKwGn1z6UqZiPYS15eGr4MT6PXvbsrI"
const SUPABASE_URL = "https://twnvrhnkkclcutteldzm.supabase.co"

const CLIENT_SUPABASE = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)






const ChatPage = () => {
  // Sua lógica vai aqui
  /*
  // Usuario
  --- Usuario digita no campo text area
  --- apertar botao enviar
  --- tem que adicionar o texto na listagem
  
  
  */
  /*
  // Dev
  --- Camos criados
  --- vamos usar o usar o oncheange usar o use state () ter if para caso seja enter para a variavel limpar
  --- lista de mensgaens



  */

  const cliente_supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  useEffect(() => {
    cliente_supabase
      .from('mensagens')
      .select("*")
      .then(({ data }) => {
        setListaDeMensagens(data)
      })
  }, [])





  const [mensagem, setMensagem] = useState("")
  const [listaDeMensagens, setListaDeMensagens] = useState([]);





  const handleNovaMensagem = (novaMensagem) => {
    const mensagem = {
      //id: listaDeMensagens.length + 1,
      de: 'JoaoAlvesC',
      texto: novaMensagem,
    }

    cliente_supabase
      .from('mensagens')
      .insert([mensagem])
      .then(({ data }) => {
        setListaDeMensagens([
          data[0],
          ...listaDeMensagens,
        ])
      })

    //setListaDeMensagens([mensagem, ...listaDeMensagens])
    setMensagem('')
  }


  // ./Sua lógica vai aqui
  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          {/*


            listaDeMensagens.map((mensagemMap) => {
              return <li key={mensagemMap.id}>{mensagemMap.de} : {mensagemMap.texto}</li >;
            })
          */}
          <MessageList mensagensList={listaDeMensagens} />



          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                event.preventDefault();
                setMensagem(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                  //setListaDeMensagens(...listaDeMensagens, mensagem);
                  //setMensagem("");
                }

              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  //console.log('MessageList', props);



  return (
    <Box
      tag="ul"
      styleSheet={{
        //overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >
      {props.mensagensList.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">
                {mensagem.de}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text>
            </Box>
            {mensagem.texto}
          </Text>
        )
      })}
    </Box>
  )
}


export default ChatPage;
