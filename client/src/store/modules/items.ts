import { iItem } from "@/common/interface/item";
import { RootState } from "@/store";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { getCakes } from "@/api/cakes";

export interface State {
  all: iItem[];
}

const initState: State = {
  all: [],
};

const getters: GetterTree<State, RootState> = {
  allItems: (state) => state.all,
};

const mutations: MutationTree<State> = {
  cakesLoaded(state, payload: iItem[]) {
    state.all = [...payload];
  },
};

const actions: ActionTree<State, RootState> = {
  async fetchCakes({ commit }) {
    try {
      const response = await getCakes();
      if (response.statusText === "OK" || response.status === 200) {
        commit("cakesLoaded", response.data.data);
      } else {
        commit("cakesLoaded", []);
      }
    } catch (error) {
      console.error("Error fetching cakes:", error);
    }
  },
};

export default {
  state: initState,
  getters,
  mutations,
  actions,
  namespaced: true,
};
