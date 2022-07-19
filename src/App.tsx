import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useParams } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import IndexEnca from './pages/Encargado/Index';
import CreateEnca from './pages/Encargado/create';
import EditEnca from './pages/Encargado/Edit';
import IndexTurist from './pages/Turista/Index';
import CreateTurist from './pages/Turista/create';
import EditTurist from './pages/Turista/Edit';


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
import Map from './pages/Map';
import Restaurante from './pages/Turismo/Restaurante';
import Turismo from './pages/Turismo/Turismo';
import Tienda from './pages/Turismo/Tienda';
import Parques from './pages/Turismo/Parques';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/Inbox" />
            </Route>
            
            <Route exact path="/page/Parques" component={Parques} />
            <Route exact path="/page/Tienda" component={Tienda} />
            <Route exact path="/page/Turismo" component={Turismo} />
            <Route exact path="/page/Restaurantes" component={Restaurante} />
            <Route exact path="/Encargado/Principal-Page" component={IndexEnca} />
            <Route exact path="/Encargador/create-site" component={CreateEnca}/>
            <Route exact path='/Encargado/edit/:id' component={EditEnca}/>
            <Route exact path="/Turista/Principal-Page" component={IndexTurist} />
            <Route exact path="/Turistear/create-site" component={CreateTurist}/>
            <Route exact path='/Turista/edit/:id' component={EditTurist}/>
            <Route exact path="/ubication" component={Map}/>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
