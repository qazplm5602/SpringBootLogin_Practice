const defaultStore = {
    logined: false,
    id: "test",
    name: "domi",
}

export default function(store = defaultStore, action) {
    if (action !== "login.update") // 그냥 데이터만 줭
        return store;

    const newStore = {...store}; // 불변성 ㅁㄴㅇㄹ
    
    
    return newStore;
}