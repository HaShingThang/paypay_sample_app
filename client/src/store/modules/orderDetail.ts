import { iOrderItem, iUnitPrice } from "@/common/interface/item";
import { RootState } from "@/store";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { getOrderStatus } from "@/api/cakes";

export interface State {
  amount: iUnitPrice;
  orderItems: iOrderItem[];
  merchantPaymentId: string;
}

const initState = {
  amount: null,
  orderItems: [],
  merchantPaymentId: "",
};

const getters: GetterTree<State, RootState> = {
  orderStatus: (state) => ({ ...state }),
};

const mutations: MutationTree<State> = {
  updateOrderStatus(state, data) {
    state.amount = data.amount;
    state.orderItems = data.orderItems;
    state.merchantPaymentId = data.merchantPaymentId;
  },
};

const actions: ActionTree<State, RootState> = {
  async fetchOrderStatus({ commit }, id) {
    try {
      const response = await getOrderStatus(id);
      console.log("RESPONSR==>>>>", response);
      if (response.statusText === "OK" || response.status === 200) {
        commit("updateOrderStatus", {
          amount: response.data.data.amount,
          orderItems: response.data.data.orderItems,
          merchantPaymentId: response.data.data.merchantPaymentId,
        });
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
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
