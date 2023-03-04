import { Box, Button, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import 'tools/prototypes/string'
import { createRoot } from 'react-dom/client'
import { AuthRouter } from 'apps/authorization/router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from 'apps/infrastructure/home';
import { HomeLinks } from 'apps/infrastructure/links';
import { AuthLinks } from 'apps/authorization/links';
import { Authorization } from 'apps/authorization/auth';
import { InfrastructureRouter } from 'apps/infrastructure/router';
import { BlockUi } from 'sharedComponents/blockUi/blockUi';
import { NotificationProvider } from 'sharedComponents/notification/store/notificationStore';
import { BlockUiProvider } from 'sharedComponents/blockUi/blockUiContext';
import { NotificationManager } from 'sharedComponents/notification/notificationManager';
import { TestRouter } from 'apps/tests/router';
import DialogProvider from 'sharedComponents/dialog/dialogProvider';

interface Props {

}
const theme = createTheme({

});

function AppBase(props: PropsWithChildren<Props>) {
  return (<BrowserRouter>
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <NotificationManager />
        <BlockUiProvider>
          <DialogProvider>
            <BlockUi />
            <CssBaseline />
            {props.children}
          </DialogProvider>
        </BlockUiProvider>
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
    </Routes>
  </AppBase>
}


const root = createRoot(document.getElementById("app")!)
root.render(<Main />)