import { useSelector } from "react-redux";
import style from './index.module.css';
import loginStyle from './login.module.css';
import Background from "../Recycle/BackgroundBox";
import Button from "../Recycle/Button";
import { Link } from "react-router-dom";
import Section from "../Recycle/Section";
import Input from "../Recycle/Input";
import { useEffect, useRef, useState } from "react";

export default function Index() {
    const login = useSelector(value => value.login);
    const [loginShow, SetLoginShow] = useState(false);

    const textClass = [style.welcome];
    if (!login.load) {
        textClass.push(login.logined ? style.login : style.logout);
    } else {
        textClass.push(style.wait);
    }

    return <Background className={style.background}>
        <span className={textClass.join(" ")}>
            {login.load && "loading..."}
            {(!login.load) && (login.logined ? <>Welcome! <span className={style.name}>{login.name}</span> user</> : "Please, Login U!")}
        </span>

        {/* <Link style={{textDecorationLine: "none"}} to={"/login"}> */}
            <Button text={"로그인"} className={style.loginBtn} style={{display: "block"}} onClick={() => SetLoginShow(true)} />
        {/* </Link> */}

        <LoginBox showState={[loginShow, SetLoginShow]} />
    </Background>;
}

function LoginBox({showState}) {
    const waitHandler = useRef();
    const [none, setNone] = useState(!showState[0]);
    const [show, setShow] = useState(showState[0]);

    const bgClass = [loginStyle.background];
    if (!show)
        bgClass.push(loginStyle.hide);

    useEffect(() => {
        if (waitHandler.current)
            clearTimeout(waitHandler.current);

        if (showState[0]) {
            setNone(false);
            waitHandler.current = setTimeout(() => {
                setShow(true);
            }, 10);
        } else {
            setShow(false);
            waitHandler.current = setTimeout(() => {
                setNone(true);
            }, 250);
        }
    }, [showState[0]]);

    if (none) return;

    return <Background className={bgClass.join(" ")}>
        <Section title="로그인" isContainer={true} className={loginStyle.loginSection}>
            <Input className={loginStyle.inputContainer} title="아이디" placeholder="아이디를 입력해주세요." type="text" />
            <Input className={loginStyle.inputContainer} title="비밀번호" placeholder="비밀번호를 입력해주세요." type="password" />

            <span className={loginStyle.errorT}>가나다라마바사</span>
            <Button className={loginStyle.btn} text="로그인" disabled />
        </Section>
    </Background>;
}