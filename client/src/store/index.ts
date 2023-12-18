import { createStore } from "vuex";
import items, { State as ItemsState } from "./modules/items";
import cart, { State as CartState } from "./modules/cart";
import orderDetail, { State as OrderState } from "./modules/orderDetail";
import orderList, { State as OrderListState } from "./modules/orderList";
import paymentTransition, {
  State as PaymentTransitionState,
} from "./modules/paymentTransition";
import init, { State as InitState } from "./modules/init";

export interface RootState {
  items: ItemsState;
  cart: CartState;
  orderList: OrderListState;
  orderDetail: OrderState;
  paymentTransition: PaymentTransitionState;
  init: InitState;
}

export default createStore<RootState>({
  modules: {
    items,
    cart,
    init,
    orderList,
    orderDetail,
    paymentTransition,
  },
});
