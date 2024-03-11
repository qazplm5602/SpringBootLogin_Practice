const defaultStore = {
    logined: false,
    loading: false,
    id: "test",
    name: "domi",
}

export default function(store = defaultStore, action) {
    if (action.type !== "login.update") // 그냥 데이터만 줭
        return store;

    const newStore = {...store}; // 불변성 ㅁㄴㅇㄹ
    newStore.loading = action.load;
    if (!action.load) { // 읭 로딩중이 아님
        if (action.data === undefined || !action.data.result) { // 로그인 실패
            newStore.logined = false;
            newStore.id = null;
            newStore.name = null;
        } else {
            newStore.logined = true;
            newStore.id = action.data.id;
            newStore.name = action.data.name;
        }
    }
    
    return newStore;
}