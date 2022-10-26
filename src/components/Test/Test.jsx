import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {
    Button,
    notification,
    Progress,
    Radio,
    Result,
    Spin
} from "antd";
import {useTelegram} from "../../hooks/useTelegram";

const {Group} = Radio;
const token = "5772012816:AAHBxUmq1C3ywx34Un34IVSFHplc5w8DqBA";

const Test = () => {
    const {user} = useTelegram();
    const navigate = useNavigate();
    const {id} = useParams();
    const [test, setTest] = useState();
    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState();
    const [rating, setRating] = useState(0);

    const appendTest = () => {
        fetch("/tests/tests.json")
            .then(res => res.json())
            .then(json => setTest(json.find(test => test.id === id)));
    };

    useEffect(() => {
        appendTest();
    }, []);

    const sendData = () => {
        const text = `Фамилия: ${user.first_name}. Имя: ${user.second_name}. Тест: ${test.title}. Оценка: ${rating}.`;
        fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=572468923&text=${text}`)
            .then(() => {
                setCurrent(current + 1);
                setAnswer(undefined);
            })
            .catch(() => {
                notification.open({
                    type: "error",
                    message: "Памылка, паспрабуйце ящчэ раз",
                    placement: "bottom",
                });
            });
    };

    const goToNextQuestion = () => {
        if (answer) {
            if (answer === test.questions[current].answer) {
                setRating(rating + 1);
            }
            if (current === test.questions.length - 1) {
                sendData();
            } else {
                setCurrent(current + 1);
                setAnswer(undefined);
            }
        } else {
            notification.open({
                type: "warning",
                message: "Абярыце варыянт адказу",
                placement: "bottom",
            });
        }
    }

    return test ?
        <Container>
            <input type="button" onClick={sendData}/>
            <Progress
                percent={Math.round(current * 100 / test.questions.length)}
                showInfo={false}
            />
            {current < test.questions.length && <h4>{test.questions[current].title}</h4>}
            {
                current < test.questions.length ?
                    <Group
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                        value={answer}
                        onChange={e => setAnswer(e.target.value)}
                    >
                        {
                            test.questions[current].options.map(option =>
                                <Radio
                                    key={option.id}
                                    value={option.value}
                                >
                                    {option.value}
                                </Radio>
                            )
                        }
                    </Group>
                    :
                    <Result
                        status="success"
                        title={`Ваша адзнака за пройдзены тэст: ${rating}`}
                        extra={[<ExtraButton onClick={() => navigate("/")}>На галоўную</ExtraButton>]}
                    />
            }
            {
                current < test.questions.length &&
                <StyledButton onClick={() => goToNextQuestion()}>
                    {current === test.questions.length - 1 ? "Завяршыць" : "Наступнае пытанее"}
                </StyledButton>
            }
        </Container>
        :
        <Spin/>
}

const Container = styled.div`
  background: var(--tg-theme-bg-color);
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 20px;
`

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 15px;
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
`

const ExtraButton = styled(Button)`
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
`

export default Test;