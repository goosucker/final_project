import { MainPage } from "./components/pages/main_page";
import { Authorization } from "./components/pages/auth_page";
import { SearchPage } from "./components/pages/search_page";
import { ResultPage } from "./components/pages/result_page";
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { NotFound } from "./components/pages/notFound_page";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { AuthAndTimeCheck } from "./hoc/AuthAndTimeCheck";
import { TimeCheck } from "./hoc/TimeCheck";
import { InfoCompletCheck } from "./hoc/InfoCompletCheck";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <Routes>
          <Route path="/" element={
            <TimeCheck>
              <MainPage />
            </TimeCheck>
          }/>
          <Route path="/auth" element={<Authorization />}/>
          <Route path="/search" element={
            <AuthAndTimeCheck>
              <SearchPage />
            </AuthAndTimeCheck>
          }/>
          <Route path="*" element={
            <TimeCheck>
              <NotFound />
            </TimeCheck>
          }/>
          <Route path="/result" element={
            <InfoCompletCheck>
              <ResultPage />   
            </InfoCompletCheck>
          }/>
        </Routes>
        <Footer />
      </PersistGate>
    </Provider>
  )
}

export default App
