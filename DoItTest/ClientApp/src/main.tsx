import { Box, Button, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import * as ReactDOM from 'react-dom';

interface Props{

}
const theme = createTheme({

});

const AppBase: FC<Props> = (props) => {


  return (<ThemeProvider theme={theme}>
          <CssBaseline />
          <Box mt={2}>

          </Box>
          {props.children}
  </ThemeProvider>)
}

const Main: FC<{}> = (props) => {
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    console.log(value)
  }, [value])

  const a = useMemo(() => {return 1}, [value])

  return <AppBase>
    <Button sx={{margin: "10px"}} onClick={() => setValue((prevValue) => prevValue+1)} variant='contained'>{value}</Button>
  </AppBase>
}

function Main1(props: Props){


  return (<div></div>)
}


const container = document.getElementById('app');
ReactDOM.render(<Main />, container)