import React, {useEffect, useState} from 'react';
import {List, Spin, Tag} from "antd";
import {useNavigate} from "react-router-dom";

const TestList = () => {
    const navigate = useNavigate();
    const [tests, setTests] = useState([]);

    const getTests = () => {
        fetch("/tests/tests.json")
            .then(res => res.json())
            .then(json => setTests(json));
    }

    useEffect(() => {
        getTests();
    }, []);

    return tests.length ?
        <List
            dataSource={tests}
            style={{
                width: "100%",
                height: "100%",
            }}
            header={
                <div style={{padding: "0 15px"}}>
                    <h2>Спіс тэстаў</h2>
                </div>
            }
            renderItem={
                test =>
                    <List.Item
                        key={test.id}
                        onClick={() => navigate(`/test/${test.id}`)}
                        style={{padding: "10px 15px"}}
                    >
                        <h3>{test.title}</h3>
                        <div style={{display: "flex"}}>
                            <Tag color="magenta">{test.subject}</Tag>
                            <Tag color="green">{test.questions.length} пытанняў</Tag>
                        </div>
                    </List.Item>
            }
        />
        :
        <Spin/>
};

export default TestList;