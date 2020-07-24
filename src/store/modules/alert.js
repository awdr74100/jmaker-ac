export default {
  strict: true,
  namespaced: true,
  state: {
    messages: [],
  },
  actions: {
    updateMessage({ commit, dispatch }, { message, status }) {
      const timestamp = Date.now();
      commit('UPDATEMESSAGE', { message, status, timestamp });
      dispatch('removeMessageWithTiming', timestamp);
    },
    removeMessageWithTiming({ commit }, timestamp) {
      setTimeout(() => {
        commit('REMOVEMESSAGEWITHTIMING', timestamp);
      }, 3000);
    },
  },
  mutations: {
    UPDATEMESSAGE({ messages }, { message, status, timestamp }) {
      messages.push({ message, status, timestamp });
    },
    REMOVEMESSAGEWITHTIMING({ messages }, timestamp) {
      messages.forEach((item, index) => {
        if (item.timestamp === timestamp) {
          messages.splice(index, 1);
        }
      });
    },
    REMOVEMESSAGE({ messages }, index) {
      messages.splice(index, 1);
    },
  },
};
