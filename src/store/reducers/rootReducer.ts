const initState = {
    users: [
        {
            id: 1, name: "John Smith"
        },
        {
            id: 2, name: "Tom Bill"
        }
    ]
}

const rootReducer = (state: typeof initState = initState, action: any) => {
    switch (action.type) {
        case 'DELETE_USER':
            console.log("Delete in redux");
            let users = state.users;
            users = users.filter(x => x.id !== action.payload.id)

            return {...state, users}
            
        case 'ADD_USER':
            console.log("Add in redux");
            let id = Math.floor(Math.random() * 10001)
            let user = {id: id, name: `Name-${id}`}
            return {...state, users: [...state.users, user]}
        default:
            break;
    }
    // console.log(JSON.stringify(action));
    

    return state;
}

export default rootReducer; 