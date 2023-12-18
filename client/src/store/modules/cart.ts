import { iItem } from "@/common/interface/item";
import { RootState } from "@/store";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import {
  accountLink,
  makeContinuePayment,
  makeNativePayment,
  makePayment,
  makePendingPayment,
} from "@/api/cakes";

export interface State {
  selectedItems: iItem[];
}

const initState: State = {
  selectedItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
};

const getters: GetterTree<State, RootState> = {
  cartItems: (state) => state.selectedItems,
  hasItemInCart: (state) => (id: number) => {
    return !!state.selectedItems.find((item) => item._id === id);
  },
  getSum: (state) =>
    state.selectedItems.reduce((acc, item: iItem) => {
      acc += item.price * item.quantity;
      return acc;
    }, 0),
};

const mutations: MutationTree<State> = {
  addToCart(state, newItem) {
    const itemCopy = { ...newItem, quantity: 1 };
    state.selectedItems.push(itemCopy);
    localStorage.setItem("cartItems", JSON.stringify(state.selectedItems));
  },
  removeFromCart(state, id) {
    state.selectedItems = state.selectedItems.filter((item) => item._id !== id);
    localStorage.setItem("cartItems", JSON.stringify(state.selectedItems));
  },
  increaseQuantity(state, id) {
    const item = state.selectedItems.find((item) => item._id === id);
    if (item && item.quantity < 4) {
      item.quantity++;
      item.price * item.quantity;
      localStorage.setItem("cartItems", JSON.stringify(state.selectedItems));
    }
  },
  decreaseQuantity(state, id) {
    const item = state.selectedItems.find((item) => item._id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
      item.price * item.quantity;
      localStorage.setItem("cartItems", JSON.stringify(state.selectedItems));
    }
  },
  clearAllCart(state) {
    state.selectedItems = [];
    localStorage.removeItem("cartItems");
  },
};

const actions: ActionTree<State, RootState> = {
  async requestPayment({ state }, preAuth: boolean) {
    try {
      const response = await makePayment({
        orderItems: state.selectedItems.map((item) => ({
          name: item.title,
          category: "pastries",
          image: item.image,
          quantity: item.quantity,
          productId: item._id,
          unitPrice: {
            amount: item.price,
            currency: "JPY",
          },
        })),
        amount: {
          amount: state.selectedItems.reduce((acc, item: iItem) => {
            acc += item.price * item.quantity;
            return acc;
          }, 0),
          currency: "JPY",
        },
        isAuthorization: preAuth,
      });

      if (response.statusText === "OK" || response.status === 200) {
        window.open(response.data.data.url, "_blank");
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  },
  async requestAccountLink() {
    try {
      const response = await accountLink();
      if (response.statusText === "Created" || response.status === 201) {
        location.href = response.data.data.linkQRCodeURL;
        const params = new URLSearchParams(response.data);
        const responseToken = params.get("responseToken");

        // Step three: Store responseToken in localStorage
        if (responseToken) {
          localStorage.setItem("userAuthorizationId", responseToken);
        }

        // Example usage to retrieve responseToken later
        const storedResponseToken = localStorage.getItem("userAuthorizationId");
        console.log(storedResponseToken);
        // window.open(response.data.data.url, "_blank");
      } else {
        alert(`Something Went Wrong!`);
      }
    } catch (error) {
      alert(`Error making payment:${error}`);
    }
  },
  async requestNativePayment({ state }) {
    try {
      const response = await makeNativePayment({
        orderItems: state.selectedItems.map((item) => ({
          name: item.title,
          category: "pastries",
          image: item.image,
          quantity: item.quantity,
          productId: item._id,
          unitPrice: {
            amount: item.price,
            currency: "JPY",
          },
        })),
        amount: {
          amount: state.selectedItems.reduce((acc, item: iItem) => {
            acc += item.price * item.quantity;
            return acc;
          }, 0),
          currency: "JPY",
        },
      });
      return response;
    } catch (error) {
      alert(`Order is rejected since similar order has been already accepted`);
      throw error;
    }
  },

  async requestContinuePayment({ state }) {
    try {
      const response = await makeContinuePayment({
        orderItems: state.selectedItems.map((item) => ({
          name: item.title,
          category: "pastries",
          image: item.image,
          quantity: item.quantity,
          productId: item._id,
          unitPrice: {
            amount: item.price,
            currency: "JPY",
          },
        })),
        amount: {
          amount: state.selectedItems.reduce((acc, item: iItem) => {
            acc += item.price * item.quantity;
            return acc;
          }, 0),
          currency: "JPY",
        },
      });
      return response;
    } catch (error) {
      alert(`Something went wrong!`);
      throw error;
    }
  },

  async requestPendingPayment({ state }) {
    try {
      const response = await makePendingPayment({
        orderItems: state.selectedItems.map((item) => ({
          name: item.title,
          category: "pastries",
          image: item.image,
          quantity: item.quantity,
          productId: item._id,
          unitPrice: {
            amount: item.price,
            currency: "JPY",
          },
        })),
        amount: {
          amount: state.selectedItems.reduce((acc, item: iItem) => {
            acc += item.price * item.quantity;
            return acc;
          }, 0),
          currency: "JPY",
        },
      });
      return response;
    } catch (error) {
      alert(`Something went wrong!`);
      throw error;
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
