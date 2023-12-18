/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaymentTransition } from "@/common/interface/item";
import { RootState } from "@/store";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import {
  cancelPayment,
  capturePayment,
  getOrdersPayment,
  refundPayment,
  revertPayment,
} from "@/api/cakes";

export interface State {
  paymentTransition: PaymentTransition[];
}

const initState: State = {
  paymentTransition: [],
};

const getters: GetterTree<State, RootState> = {
  paymentTransition: (state) => state.paymentTransition,
};

const mutations: MutationTree<State> = {
  paymentTransitionLoaded(state, payload: PaymentTransition[]) {
    state.paymentTransition = [...payload];
  },
};

const actions: ActionTree<State, RootState> = {
  async getPaymentTransition({ commit }) {
    try {
      const response = await getOrdersPayment();
      if (
        (response.statusText === "OK" || response.status === 200) &&
        response.data.success
      ) {
        commit("paymentTransitionLoaded", response.data.data);
      } else {
        commit("paymentTransitionLoaded", []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },

  async requestRefund({ dispatch }, payload: any) {
    try {
      const response = await refundPayment(payload);
      if (
        (response.statusText === "OK" || response.status === 200) &&
        response.data.success
      ) {
        dispatch("getPaymentTransition");
      } else {
        dispatch("getPaymentTransition");
      }
    } catch (error) {
      console.error("Error making refund payment:", error);
    }
  },

  async requestCancelPayment({ dispatch }, merchantPaymentId: string) {
    try {
      const response = await cancelPayment(merchantPaymentId);
      if (response.statusText === "Accepted" || response.status === 202) {
        dispatch("getPaymentTransition");
      } else {
        dispatch("getPaymentTransition");
      }
    } catch (error) {
      console.error("Error canceling payment:", error);
    }
  },

  async createCapturePayment({ dispatch }, payload: any) {
    try {
      const response = await capturePayment(payload);
      if (
        (response.statusText === "OK" || response.status === 200) &&
        response.data.success
      ) {
        dispatch("getPaymentTransition");
      } else {
        dispatch("getPaymentTransition");
      }
    } catch (error) {
      console.error("Error making refund payment:", error);
    }
  },

  async requestRevertPayment({ dispatch }, payload: any) {
    try {
      console.log("PAYLOAD===>", payload);
      const response = await revertPayment(payload);
      if (
        (response.statusText === "OK" || response.status === 200) &&
        response.data.success
      ) {
        dispatch("getPaymentTransition");
      } else {
        dispatch("getPaymentTransition");
      }
    } catch (error) {
      console.error("Error making refund payment:", error);
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
