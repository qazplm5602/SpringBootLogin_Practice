import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const fetcher = function(url) {
    const headers = {};
    const auth = localStorage.getItem("domiAuth");
    if (auth !== null)
        headers.Authorization = `Bearer ${auth}`;

    return fetch(url, {headers}).then(data => {
        return data.json();
    });
}

export default function LoginSys() {
    const { data, error, isLoading } = useSWR("/api/v1/my", fetcher);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "login.update",
            load: isLoading,
            data
        });
    }, [data, error, isLoading]);
}