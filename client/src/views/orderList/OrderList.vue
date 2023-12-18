<template>
  <div class="order-list">
    <MDBContainer class="mt-5 container">
      <h2>Order List</h2>
      <MDBTable striped hover small>
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Status</th>
            <!-- <th>Actions</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orderList" :key="order._id">
            <td>{{ index + 1 }}</td>
            <td>
              <img
                alt="Mississippi Mud Pie"
                class="order-img"
                :src="getImagePath(order.cake.image)"
              />
            </td>
            <td>{{ $t(order.cake.title) }}</td>
            <td>￥ {{ order.cake.price }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.cake.price * order.quantity }}</td>
            <td :class="getStatusClass(order.status)">
              {{
                order.status == "AUTHORIZED"
                  ? "Onhold"
                  : order.status == "COMPLETED"
                  ? "SUCCESS"
                  : order.status
              }}
            </td>
            <!-- <td v-if="order.status === 'CREATED'">
              <MDBBtn color="success" @click="nativePayment"> Pay </MDBBtn>
            </td> -->
          </tr>
        </tbody>
      </MDBTable>
      <p class="no-data" v-if="orderList.length == 0">There is no order yet.</p>
    </MDBContainer>
  </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { useStore, mapGetters } from "vuex";
import { MDBContainer, MDBTable } from "mdb-vue-ui-kit";
import router from "../../router";

export default {
  name: "OrdersList",
  components: {
    MDBContainer,
    MDBTable,
  },
  computed: {
    ...mapGetters("orderList", ["orderList"]),
  },
  setup() {
    const store = useStore();
    const getImagePath = (name: string) => {
      return require(`../../assets/images/${name}`);
    };
    const nativePayment = () => {
      store
        .dispatch("cart/requestNativePayment")
        .then((response: any) => {
          if (response.statusText === "OK" || response.status === 200) {
            router.push("/payment-transition");
          } else {
            alert(response.data.resultInfo.message);
          }
        })
        .catch(() => {
          console.log(
            "Order is rejected since similar order has been already accepted"
          );
        });
    };
    onMounted(async () => {
      try {
        await store.dispatch("orderList/getOrderList");
      } catch (error) {
        console.error("Error in onMounted:", error);
      }
    });
    return {
      getImagePath,
      nativePayment,
    };
  },
  methods: {
    getStatusClass(status: string) {
      switch (status) {
        case "FAILED":
          return "failed";
        case "EXPIRED":
          return "failed";
        case "CREATED":
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
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
.order-list {
  padding-top: 80px;

  .no-data {
    text-align: center;
  }

  .container {
    max-width: 100vw;
    min-width: 100vw;
    width: 100vw;
  }
  .order-img {
    width: 40px;
    height: auto;
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
}
</style>
