import './App.css';
import Router from "./components/Router/Router";
import styled from "styled-components";
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";

const App = () => {
    const {telegram} = useTelegram();

    useEffect(() => {
        telegram.ready();
    });

    return (
        <>
            <Header />
            <Layout>
                <Router/>
            </Layout>
        </>
    );
}

const Layout = styled.div`
  background: var(--tg-theme-secondary-bg-color);
  height: calc(100vh - 52px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`

export default App;
