import './App.css';
import Router from "./components/Router/Router";
import styled from "styled-components";
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";

const App = () => {
    const {telegram} = useTelegram();

    useEffect(() => {
        telegram.ready();
    });

    return (
        <Layout>
            <Router/>
        </Layout>
    );
}

const Layout = styled.div`
  background: var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-text-color);
`

export default App;
