import { useSelector } from "react-redux";

export default function Index() {
    const login = useSelector(value => value.login);
    return <div>{JSON.stringify(login)}</div>;
}