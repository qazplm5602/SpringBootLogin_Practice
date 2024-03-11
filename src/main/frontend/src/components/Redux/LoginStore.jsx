const defaultStore = {
    logined: false,
    id: "test",
    name: "domi",
}

export default function(store = defaultStore, action) {
    return store;
}