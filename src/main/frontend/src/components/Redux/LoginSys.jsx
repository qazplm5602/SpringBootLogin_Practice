import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const fetcher = async function(url) {
    const headers = {};
    
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) { // 띠용 에세스 토큰 어디감자🍟🍟🍟
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken == null) return { result: false };

        const response = await fetch("/api/v1/retryLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                refreshToken
            })
        }).then(data => data.json()).catch(() => {});
        
        if (response === undefined || !response.result) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return { result: false };
        }

        localStorage.setItem("accessToken", response.tokens.accessToken);
        accessToken = response.tokens.accessToken;
    }

    if (accessToken !== null)
        headers.Authorization = `Bearer ${accessToken}`;

    return fetch(url, {headers}).then(data => data.json());
}

export default function LoginSys() {
    const { data, error, isLoading, mutate } = useSWR("/api/v1/my", fetcher);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data && data.status === 500) { // 서버터짐 (사실 jwt 에서 터짐)
            localStorage.removeItem("accessToken");
            mutate();
            return;
        }

        dispatch({
            type: "login.update",
            load: isLoading,
            data
        });
    }, [data, error, isLoading]);
}