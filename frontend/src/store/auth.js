import Vuex from "vuex";

export function createStore() {
    return new Vuex.Store({
        state: {
            user: null,
            loadState: {
                loading: true,
                errored: false,
            },
            isLoggedIn: false,
        },
        getters: {
            showAuthLoadScreen(state) {
                return state.loadState.loading || state.loadState.errored;
            },
            showLoginScreen(state) {
                return !(state.loadState.loading || state.loadState.errored) && !state.isLoggedIn;
            },
            isLoggedIn(state) {
                return state.isLoggedIn;
            },
        },
        mutations: {
            setUser(state, { error, loading, loggedIn, data }) { 
                state.loadState.loading = loading;
                state.loadState.errored = error;
                state.isLoggedIn = !!loggedIn;
                state.user = data;
            },
        },
        actions: {
            async loadUser({ commit }) {
                commit("setUser", { error: false, loading: true, data: null });
                try {
                    const res = await fetch(`${window._env_.FRONTEND_API_URL}/api/v1/users/@me`, {
                        method: "GET",
                    })
                    
                    if (res.status === 401) {
                        commit("setUser", { error: false, loading: false, data: null, loggedIn: false });
                        return;
                    }

                    const body = await res.json();

                    if (!body.status) {
                        commit("setUser", { error: true, loading: false, data: null });
                        return;
                    }

                    commit("setUser", { error: false, loading: false, data: body.data });
                    return;
                } catch (err) {
                    commit("setUser", { error: true, loading: false, data: null });
                    return;
                }
            }
        }
    })
}