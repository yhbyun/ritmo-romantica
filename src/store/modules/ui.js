import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    sidebarOpen: false
}

// getters
const getters = {
    sidebarOpen: state => state.sidebarOpen
}

// actions
const actions = {
    toggleSidebar ({ commit, state }) {
        commit(types.TOGGLE_SIDEBAR)
    },
    close ({ commit, state }) {
        commit('close')
    }
}

// mutations
const mutations = {
    [types.TOGGLE_SIDEBAR] (state) {
        state.sidebarOpen = !state.sidebarOpen
    },
    close (state) {
        state.sidebarOpen = false
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
