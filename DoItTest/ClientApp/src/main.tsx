import { Box, Button, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import 'tools/prototypes/string'
import { createRoot } from 'react-dom/client'
import { AuthRouter } from 'apps/authorization/router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ruLocale from 'date-fns/locale/ru';
import { InfrastructureRouter } from 'apps/infrastructure/router';
import { BlockUi } from 'sharedComponents/blockUi/blockUi';
import { NotificationProvider } from 'sharedComponents/notification/store/notificationStore';
import { BlockUiProvider } from 'sharedComponents/blockUi/blockUiContext';
import { NotificationManager } from 'sharedComponents/notification/notificationManager';
import { TestRouter } from 'apps/tests/router';
import DialogProvider from 'sharedComponents/dialog/dialogProvider';
import { UsersRouter } from 'apps/users/router';
import { LocalizationProvider, ruRU } from '@mui/x-date-pickers';

interface Props {

}
const theme = createTheme({

});

function AppBase(props: PropsWithChildren<Props>) {
  return (<BrowserRouter>
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <NotificationManager />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale} localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
          <BlockUiProvider>
            <DialogProvider>
              <BlockUi />
              <CssBaseline />
              {props.children}
            </DialogProvider>
          </BlockUiProvider>
        </LocalizationProvider>
      </NotificationProvider>
    </ThemeProvider>
  </BrowserRouter>)
}

const Main: FC<{}> = (props) => {

  return <AppBase>
    <Routes>
      {AuthRouter()}
      {InfrastructureRouter()}
      {TestRouter()}
      {UsersRouter()}
    </Routes>
  </AppBase>
}


const root = createRoot(document.getElementById("app")!)
root.render(<Main />)