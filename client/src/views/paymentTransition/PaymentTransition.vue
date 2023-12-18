<template>
  <div class="transition-list">
    <MDBContainer class="mt-5 container">
      <h2>Payment Transition</h2>
      <MDBTable striped hover small>
        <thead>
          <tr>
            <th>No</th>
            <!-- <th>Payment ID</th> -->
            <th>Merchant Payment ID</th>
            <th>Payment Method</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Detail</th>
            <th>User View</th>
            <th>Admin View</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(payment, index) in paymentTransition"
            :key="payment.data.paymentId"
          >
            <td>{{ index + 1 }}</td>
            <!-- <td>{{ payment.data.paymentId }}</td> -->
            <td>{{ payment.data.merchantPaymentId }}</td>
            <td>{{ payment.data.paymentMethods[0].type }}</td>
            <td>￥{{ payment.data.paymentMethods[0].amount.amount }}</td>
            <td :class="getStatusClass(payment.data.status)">
              {{
                payment.data.status == "COMPLETED"
                  ? "SUCCESS"
                  : payment.data.status == "AUTHORIZED"
                  ? "Onhold"
                  : payment.data.status
              }}
            </td>
            <td>
              <router-link
                :to="{
                  name: 'orderpayment',
                  params: { id: payment.data.merchantPaymentId },
                }"
              >
                <MDBBtn color="secondary"> View</MDBBtn>
              </router-link>
            </td>
            <td>
              <MDBBtn
                class="btn"
                :disabled="
                  payment.data.status === 'FAILED' ||
                  payment.data.status === 'REFUNDED' ||
                  payment.data.status === 'CANCELED'
                "
                @click="cancelPayment(payment.data)"
                color="danger"
              >
                Cancel</MDBBtn
              >
            </td>
            <td>
              <MDBBtn
                class="btn"
                @click="refundPayment(payment.data)"
                color="info"
                :disabled="
                  payment.data.status === 'REFUNDED' ||
                  payment.data.status === 'AUTHORIZED' ||
                  payment.data.status === 'FAILED' ||
                  payment.data.status === 'CANCELED'
                "
              >
                Refund</MDBBtn
              >
              <MDBBtn
                class="btn"
                @click="capturePayment(payment.data)"
                color="success"
                :disabled="
                  payment.data.status === 'REFUNDED' ||
                  payment.data.status === 'FAILED' ||
                  payment.data.status !== 'AUTHORIZED' ||
                  payment.data.status === 'CANCELED'
                "
              >
                Capture Payment</MDBBtn
              >
              <MDBBtn
                class="btn"
                @click="revertPayment(payment.data)"
                color="dark"
                :disabled="payment.data.status !== 'AUTHORIZED'"
              >
                Revert Payment</MDBBtn
              >
            </td>
          </tr>
        </tbody>
      </MDBTable>
      <p class="no-data" v-if="paymentTransition.length == 0">There is no payment yet.</p>
    </MDBContainer>
  </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { useStore, mapGetters } from "vuex";
import { MDBContainer, MDBTable, MDBBtn } from "mdb-vue-ui-kit";

export default {
  name: "PaymentTransition",
  components: {
    MDBContainer,
    MDBTable,
    MDBBtn,
  },

  computed: {
    ...mapGetters("paymentTransition", ["paymentTransition"]),
  },

  setup() {
    const store = useStore();
    onMounted(async () => {
      try {
        await store.dispatch("paymentTransition/getPaymentTransition");
      } catch (error) {
        console.error("Error in onMounted:", error);
      }
    });
    const getStatusClass = (status: string) => {
      switch (status) {
        case "FAILED":
          return "failed";
        case "Pending":
          return "pending";
        case "SUCCESS":
          return "success";
        case "COMPLETED":
          return "success";
        case "REFUNDED":
          return "success";
        default:
          return "default";
      }
    };

    const cancelPayment = async (payment: any) => {
      try {
        if (
          payment.status === "REFUNDED" ||
          payment.status === "FAILED" ||
          payment.status === "CANCELED"
        ) {
          return;
        }
        await store.dispatch(
          "paymentTransition/requestCancelPayment",
          payment.merchantPaymentId
        );
      } catch (error) {
        console.error("Error canceling payment:", error);
      }
    };

    const refundPayment = async (payment: any) => {
      try {
        if (
          payment.status === "REFUNDED" ||
          payment.status === "FAILED" ||
          payment.status === "CANCELED"
        ) {
          return;
        }
        const payload = {
          merchantRefundId: payment.merchantPaymentId,
          paymentId: payment.paymentId,
          amount: {
            amount: payment.paymentMethods[0].amount.amount,
            currency: payment.paymentMethods[0].amount.currency,
          },
          reason: "Refund for payment",
        };
        await store.dispatch("paymentTransition/requestRefund", payload);
      } catch (error) {
        console.error("Error refunding payment:", error);
      }
    };

    const capturePayment = async (payment: any) => {
      if (
        payment.status === "REFUNDED" ||
        payment.status === "FAILED" ||
        payment.status === "SUCCESS"
      ) {
        return;
      }
      const payload = {
        merchantPaymentId: payment.merchantPaymentId,
        amount: payment.paymentMethods[0].amount,
        orderDescription: "Order Shipped, Cake with toppings",
      };
      await store.dispatch("paymentTransition/createCapturePayment", payload);
    };

    const revertPayment = async (payment: any) => {
      if (payment.status !== "AUTHORIZED") {
        return;
      }
      const payload = {
        merchantRevertId: payment.merchantPaymentId,
        paymentId: payment.paymentId,
        reason: "test revert payment",
      };
      await store.dispatch("paymentTransition/requestRevertPayment", payload);
    };

    return {
      getStatusClass,
      cancelPayment,
      refundPayment,
      capturePayment,
      revertPayment,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
.transition-list {
  padding-top: 80px;
  .no-data{
    text-align: center;
  }
  .container {
    max-width: 100vw;
    min-width: 100vw;
    width: 100vw;
  }
  .status {
    font-weight: 600;
    text-transform: uppercase;
  }
  .failed {
    color: $danger;
    text-transform: uppercase;
  }
  .pending {
    color: $warning;
    text-transform: uppercase;
  }
  .success {
    color: $success;
    text-transform: uppercase;
  }
  .default {
    color: $primary;
    text-transform: uppercase;
  }
  .btn {
    &:disabled {
      background: $darkash;
      cursor: not-allowed !important;
    }
  }
}
</style>
