import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            count : 0,
            user: {}
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        user(state,data) {
            console.log(state);
            console.log(data);
            state.user = data;
        }
    }
})

export default store;