import React from 'react';
import {Avatar, PageHeader} from "antd";
import {useTelegram} from "../../hooks/useTelegram";
import {useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {telegram} = useTelegram();

    return (
        <StyledHeader
            title={`@${telegram.initDataUnsafe.user.username}`}
            onBack={location.pathname.includes("test") ? () => navigate("/") : null}
            extra={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
        />
    );
};

const StyledHeader = styled(PageHeader)`
  background: var(--tg-theme-bg-color);
  height: 52px;
  padding: 8px 24px;
`

export default Header;