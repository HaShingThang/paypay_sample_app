import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import OrderPayment from "@/views/orderPayment/OrderPayment.vue";
import OrderReview from "@/views/orderReview/OrderReview.vue";
import OrderList from "@/views/orderList/OrderList.vue";
import PaymentTransition from "@/views/paymentTransition/PaymentTransition.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/orderreview",
    name: "orderreview",
    component: OrderReview,
  },
  {
    path: "/orderpayment/:id",
    name: "orderpayment",
    component: OrderPayment,
  },
  {
    path: "/orders",
    name: "orderlist",
    component: OrderList,
  },
  {
    path: "/payment-transition",
    name: "paymenttransition",
    component: PaymentTransition,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
