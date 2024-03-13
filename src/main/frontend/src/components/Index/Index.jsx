import { useSelector } from "react-redux";
import style from './index.module.css';
import loginStyle from './login.module.css';
import Background from "../Recycle/BackgroundBox";
import Button from "../Recycle/Button";
import { Link } from "react-router-dom";
import Section from "../Recycle/Section";

export default function Index() {
    const login = useSelector(value => value.login);
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

        <Link style={{textDecorationLine: "none"}} to={"/login"}>
            <Button text={"로그인"} className={style.loginBtn} style={{display: "block"}} />
        </Link>

        <LoginBox />
    </Background>;
}

function LoginBox() {
    return <Background className={loginStyle.background}>
        <Section title="로그인" isContainer={true} className={loginStyle.loginSection}>

        </Section>
    </Background>;
}