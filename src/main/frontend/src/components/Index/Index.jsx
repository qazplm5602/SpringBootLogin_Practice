import { useSelector } from "react-redux";
import style from './index.module.css';
import loginStyle from './login.module.css';
import Background from "../Recycle/BackgroundBox";
import Button from "../Recycle/Button";
import { Link } from "react-router-dom";
import Section from "../Recycle/Section";
import Input from "../Recycle/Input";
import { useEffect, useRef, useState } from "react";
import { mutate } from 'swr';

export default function Index() {
    const login = useSelector(value => value.login);
    const [loginShow, SetLoginShow] = useState(false);

    const textClass = [style.welcome];
    if (!login.load) {
        textClass.push(login.logined ? style.login : style.logout);
    } else {
        textClass.push(style.wait);
    }

    const logoutBtn = function() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        mutate("/api/v1/my");
    }

    return <Background className={style.background}>
        <span className={textClass.join(" ")}>
            {login.load && "loading..."}
            {(!login.load) && (login.logined ? <>Welcome! <span className={style.name}>{login.name}</span> user</> : "Please, Login U!")}
        </span>

        {/* <Link style={{textDecorationLine: "none"}} to={"/login"}> */}
            <Button text={`로그${login.logined ? "아웃" : "인"}`} className={style.loginBtn} style={{display: "block"}} onClick={() => (login.logined ? logoutBtn() : SetLoginShow(true))} />
        {/* </Link> */}

        <LoginBox showState={[loginShow, SetLoginShow]} />
    </Background>;
}

function LoginBox({showState}) {
    const waitHandler = useRef();
    const [none, setNone] = useState(!showState[0]);
    const [show, setShow] = useState(showState[0]);

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [btnDisable, setBtnDisable]= useState(false);

    const [allStop, SetAllStop] = useState(false);

    const [errorT, setErrorT] = useState("");

    const bgClass = [loginStyle.background];
    if (!show)
        bgClass.push(loginStyle.hide);

    const bgClick = function() {
        if (allStop) return;
        showState[1](false);
    }
    const boxClick = function(e) {
        e.stopPropagation();
    }
    const loginClick = async function() {
        if (allStop) return;

        SetAllStop(true);
        setErrorT("");
        const data = await fetch("/api/v1/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                password
            })
        }).then(data => data.json()).catch(() => {});

        SetAllStop(false);
        if (data === undefined) {
            setErrorT("서버와 연결을 실패하였습니다.");
            return;
        }

        console.log(data);
        if (!data.result) {
            setErrorT(data.content);
            return;
        }

        bgClick();
        localStorage.setItem("accessToken", data.tokens.accessToken);
        localStorage.setItem("refreshToken", data.tokens.refreshToken);
        mutate("/api/v1/my");
    }

    useEffect(() => {
        if (waitHandler.current)
            clearTimeout(waitHandler.current);

        if (showState[0]) {
            setNone(false);
            waitHandler.current = setTimeout(() => {
                setShow(true);
            }, 20);
        } else {
            setShow(false);
            waitHandler.current = setTimeout(() => {
                setNone(true);
            }, 250);
        }
    }, [showState[0]]);

    useEffect(() => {
        setBtnDisable(id.length == 0 || password.length == 0);
    }, [id, password]);

    if (none) return;

    return <Background className={bgClass.join(" ")} onClick={bgClick}>
        <Section title="로그인" isContainer={true} onClick={boxClick} className={loginStyle.loginSection}>
            <Input className={loginStyle.inputContainer} disabled={allStop} value={id} onChange={e => setId(e.target.value)} title="아이디" placeholder="아이디를 입력해주세요." type="text" />
            <Input className={loginStyle.inputContainer} disabled={allStop} value={password} onChange={e => setPassword(e.target.value)} title="비밀번호" placeholder="비밀번호를 입력해주세요." type="password" />

            <span className={loginStyle.errorT}>{errorT}</span>
            <Button className={loginStyle.btn} text="로그인" onClick={loginClick} disabled={btnDisable || allStop} />
        </Section>
    </Background>;
}