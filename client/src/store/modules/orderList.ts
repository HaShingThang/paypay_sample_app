/* eslint-disable @typescript-eslint/no-explicit-any */
import { iOrderItem } from "@/common/interface/item";
import { RootState } from "@/store";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { getOrders } from "@/api/cakes";

export interface State {
  orderItems: iOrderItem[];
}

const initState: State = {
  orderItems: [],
};

const getters: GetterTree<State, RootState> = {
  orderList: (state) => state.orderItems,
};

const mutations: MutationTree<State> = {
  ordersLoaded(state, payload: iOrderItem[]) {
    state.orderItems = [...payload];
  },
};

const actions: ActionTree<State, RootState> = {
  async getOrderList({ commit }) {
    try {
      const response = await getOrders();
      if (
        (response.statusText === "OK" || response.status === 200) &&
        response.data.success
      ) {
        commit("ordersLoaded", response.data.data);
      } else {
        commit("ordersLoaded", []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
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
