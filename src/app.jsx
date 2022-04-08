import { BrowserRouter,Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Maker from './components/maker/maker';
function App({ FileInput, authService}) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login authService={authService} />} />
          <Route path="/maker" element={<Maker authService={authService} FileInput={FileInput}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
/*
Router version v5
<Switch>
          <Route exact path="/">
            <Login authService={authService}/>
          </Route>
          <Route path="/maker">
            <Maker/>
          </Route>
        </Switch>
*/
export default App;
