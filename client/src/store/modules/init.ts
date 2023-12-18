// init.ts
import { RootState } from "@/store";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import pp from "@paypay/mini-app-js-sdk";

export interface State {
  jws: string;
  initialized: boolean;
}

const initState: State = {
  jws: "",
  initialized: false,
};

const getters: GetterTree<State, RootState> = {
  jws: (state) => state.jws,
  initialized: (state) => state.initialized,
};

const mutations: MutationTree<State> = {
  jws(state, newJWS) {
    state.jws = newJWS;
  },
  setInitialized(state, status) {
    state.initialized = status;
  },
};

const actions: ActionTree<State, RootState> = {
  async initializePayPaySDK({ commit }) {
    try {
      await new Promise<void>((resolve, reject) => {
        pp.init({
          clientId: "a_G98zsqFWsf",
          env: "sandbox",
          success() {
            pp.getUAID({
              success: (res) => {
                console.log("UAIDSUCCESS=====>", res);
                commit("jws", res.jws);
                commit("setInitialized", true);
                resolve();
              },
              fail: (error) => {
                console.log("UAID=====>", error);
                reject(error);
              },
              complete: () => {
                console.log("=====================>completed");
              },
            });
          },
          fail(error) {
            console.error("PayPay SDK initialization failed", error);
            commit("jws", "");
            reject(error);
          },
        });
      });
    } catch (error) {
      console.error("Error during initialization:", error);
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
