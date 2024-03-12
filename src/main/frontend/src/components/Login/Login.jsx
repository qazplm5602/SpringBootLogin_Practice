import Background from "../Recycle/BackgroundBox";
import Section from "../Recycle/Section";
import style from './login.module.css';

export default function Login() {
    return <Background className={style.background}>
        <Section title={"로그인"} isContainer={true} className={style.loginSection}>
            
        </Section>
    </Background>;
}