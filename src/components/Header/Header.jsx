import React from 'react';
import {Avatar, PageHeader} from "antd";
import {useTelegram} from "../../hooks/useTelegram";
import {useLocation, useNavigate} from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {telegram} = useTelegram();

    return (
        <PageHeader
            title={telegram.initDataUnsafe.user.username}
            onBack={location.pathname.includes("test") ? () => navigate("/") : null}
            extra={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
        />
    );
};

export default Header;