import React, {useEffect, useState} from 'react';
import {List, Spin, Tag} from "antd";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const {Item} = List;

const TestList = () => {
    const navigate = useNavigate();
    const [tests, setTests] = useState([]);

    const appendTests = () => {
        fetch("/tests/tests.json")
            .then(res => res.json())
            .then(json => setTests(json));
    }

    useEffect(() => {
        appendTests();
    }, []);

    return tests.length ?
        <StyledList
            dataSource={tests}
            header={
                <div style={{padding: "0 15px"}}>
                    <h2>Спіс тэстаў</h2>
                </div>
            }
            renderItem={
                test =>
                    <Item
                        key={test.id}
                        onClick={() => navigate(`/test/${test.id}`)}
                        style={{padding: "10px 15px"}}
                    >
                        <h3>{test.title}</h3>
                        <div style={{display: "flex"}}>
                            <Tag color="#F06964">{test.subject}</Tag>
                            <Tag color="#56B3F5">{test.questions.length} пытанняў</Tag>
                        </div>
                    </Item>
            }
        />
        :
        <Spin/>
};

const StyledList = styled(List)`
  background: var(--tg-theme-bg-color);
  width: 100%;
  height: 100%;
  border-radius: 5px;
`

export default TestList;