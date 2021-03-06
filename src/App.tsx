import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonLoading, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import TabRoot1 from './pages/tabroot1';
import { useSQLite } from 'react-sqlite-hook';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Auth
import { useAuth } from "./pages/auth/authContext";
import { useEffect, useState } from 'react';
import LoginPage from './pages/auth/LoginPage';
import Menu from './components/Menu';
import TabRoot2 from './pages/tabroot2';
import { getDBInitByName } from './database';

setupIonicReact();

// Singleton SQLite Hook
export let sqlite: any;
// Existing Connections Store
export let existingConn: any;

const App: React.FC = () => {

  const { authInfo, initialize } = useAuth()!;
  const [iniDBStatus, setiniDBStatus] = useState<Boolean>(false);
  const [existConn, setExistConn] = useState(false);
  existingConn = { existConn: existConn, setExistConn: setExistConn };

  const { echo, getPlatform, createConnection, closeConnection,
    retrieveConnection, retrieveAllConnections, closeAllConnections,
    addUpgradeStatement, importFromJson, isJsonValid, copyFromAssets, isConnection,
    isAvailable } = useSQLite();

  sqlite = {
    echo: echo, getPlatform: getPlatform,
    createConnection: createConnection,
    closeConnection: closeConnection,
    retrieveConnection: retrieveConnection,
    retrieveAllConnections: retrieveAllConnections,
    closeAllConnections: closeAllConnections,
    addUpgradeStatement: addUpgradeStatement,
    importFromJson: importFromJson,
    isJsonValid: isJsonValid,
    copyFromAssets: copyFromAssets,
    isConnection: isConnection,
    isAvailable: isAvailable
  };

  useEffect(() => {
    !authInfo?.initialized && (async () => await initialize())();
  }, [authInfo, initialize]);

  useEffect(() => {
    let initDB = async () => {
      await getDBInitByName('aahk', 'no-encryption')
      setiniDBStatus(true)
    }
    initDB()
    //.then(async syncLocalAAHKDB)
  }, [])



  if (!authInfo || !authInfo.initialized || !iniDBStatus) {
    return (
      <IonApp>
        <IonLoading isOpen={true} />
      </IonApp>
    );
  } else {
    return (
      <IonApp>
        <>
          {authInfo?.loggedIn === true ? (
            <IonReactRouter>
              <IonSplitPane contentId="main">
                <Menu />
                <IonRouterOutlet id="main">
                  {/* <Route exact path="/tabroot1">
                    <TabRoot1 />
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/tabroot1" />
                  </Route>
                  <Route exact path="/login">
                    <Redirect to="/tabroot1" />
                  </Route> */}
                  <Switch>
                    <Route path="/tabroot1" component={TabRoot1} />
                    <Route path="/tabroot2" component={TabRoot2} />
                    <Route path="/login" component={TabRoot1} />
                    <Redirect from="/" to="/tabroot1" exact />
                  </Switch>
                </IonRouterOutlet>
              </IonSplitPane>
            </IonReactRouter>
          ) : (
            <IonReactRouter>
              <Route path="/login" component={LoginPage} exact />
              <Redirect from="/" to="/login" exact />
            </IonReactRouter>
          )}
        </>
      </IonApp>
    )
  }
};

export default App;
