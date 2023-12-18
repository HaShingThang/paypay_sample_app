<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div class="orderreview">
    <div class="orderreview-contents">
      <div class="main-content">
        <div class="shopping-cart">
          <p class="cart-heading">{{ $t("cake_shop.shopping_cart") }}</p>
          <div
            class="cart-contents bottom-border"
            :key="index"
            v-for="(item, index) in cartItems"
          >
            <div class="cart-image">
              <img
                alt="Mississippi Mud Pie"
                class="cart-image-content"
                :src="getImagePath(item.image)"
              />
            </div>
            <div class="cart-text">
              <h3 class="title" v-bind:title="$t(item.title)">
                {{ $t(item.title) }}
              </h3>
              <div class="cart-quantity">
                <button class="btn-qty" @click="decreaseQuantity(item)">
                  -
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button class="btn-qty" @click="increaseQuantity(item)">
                  +
                </button>
              </div>
            </div>
            <div class="cart-price">￥{{ item.price }}</div>
            <div class="cart-close" @click="removeFromCart(item._id)">
              <img
                alt="Mississippi Mud Pie"
                src="@/assets/images/close_btn.png"
              />
            </div>
          </div>
          <div class="clear-cart">
            <p></p>
            <button v-if="cartItems.length" @click="clearAllCart()">
              Clear All Cart
            </button>
            <button v-else>
              <router-link class="home-link" to="/"
                >Continue Shopping</router-link
              >
            </button>
          </div>
        </div>
        <div class="order-description">
          <div class="review-order">
            <p class="order-heading">{{ $t("cake_shop.review_order") }}</p>
            <div class="order-details">
              <div
                class="item-details"
                :key="index"
                v-for="(item, index) in cartItems"
              >
                <p class="item-text">{{ $t(item.title) }}</p>
                <p class="item-price">
                  ￥{{ item.price.toFixed(2) }} * {{ item.quantity }} =
                  {{ (item.price * item.quantity).toFixed(2) }}
                </p>
              </div>
            </div>
            <div class="order-total">
              <div class="subtotal">
                <p class="subtotal-text">{{ $t("cake_shop.sub_total") }}</p>
                <p class="subtotal-price">￥{{ getSum.toFixed(2) }}</p>
              </div>
              <div class="delivery">
                <p class="delivery-text">{{ $t("cake_shop.delivery") }}</p>
                <p class="delivery-price">￥0</p>
              </div>
            </div>
            <div class="total-amount">
              <p class="total-amount-text">{{ $t("cake_shop.total") }}</p>
              <p class="total-amount-price">￥{{ getSum.toFixed(2) }}</p>
            </div>
            <div class="pre-auth">
              <input
                type="checkbox"
                id="preAuth"
                value="preAuth"
                name="preAuth"
                v-model="preAuth"
              />
              <label for="preAuth">PreAuth</label>
            </div>
          </div>
          <div class="order-button" @click="handlePayment(preAuth)">
            <button class="paypay-logo">
              <img alt="Paypay" src="@/assets/images/logo_paypay.svg" />
              <span class="button-style">{{ $t("cake_shop.pay") }}</span>
            </button>
          </div>
          <div class="link-account" @click="accountLink">
            <button class="link-btn">Link Your Pay Pay Account</button>
          </div>
          <div class="link-account" @click="nativePayment">
            <button class="link-btn">Native Payment</button>
          </div>
          <div class="link-account" @click="continuePayment">
            <button class="link-btn">Continue Payment</button>
          </div>
          <div class="link-account" @click="pendingPayment">
            <button class="link-btn">Pending Payment</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "../../router";
import { iItem } from "../../common/interface/item";
import { defineComponent } from "vue";
import { useStore, mapGetters } from "vuex";

export default defineComponent({
  name: "OrderReview",
  computed: {
    ...mapGetters("cart", ["cartItems", "getSum"]),
  },
  data() {
    return {
      preAuth: false,
    };
  },
  setup() {
    const store = useStore();

    const removeFromCart = (id: number) => {
      store.commit("cart/removeFromCart", id);
    };

    const getImagePath = (name: string) => {
      return require(`../../assets/images/${name}`);
    };

    const handlePayment = (preAuth: boolean) => {
      store.dispatch("cart/requestPayment", preAuth);
    };

    const increaseQuantity = (item: iItem) => {
      if (item.quantity < 4) {
        store.commit("cart/increaseQuantity", item._id);
      }
    };

    const decreaseQuantity = (item: iItem) => {
      if (item.quantity > 1) {
        store.commit("cart/decreaseQuantity", item._id);
      }
    };

    const clearAllCart = () => {
      store.commit("cart/clearAllCart");
    };

    const accountLink = () => {
      store.dispatch("cart/requestAccountLink");
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

    const continuePayment = () => {
      store
        .dispatch("cart/requestContinuePayment")
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

    const pendingPayment = () => {
      store
        .dispatch("cart/requestPendingPayment")
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

    return {
      getImagePath,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      handlePayment,
      clearAllCart,
      accountLink,
      nativePayment,
      continuePayment,
      pendingPayment
    };
  },
});
</script>

<style lang="scss">
@import "@/styles/variables";

.orderreview {
  padding-top: 70px;
  .orderreview-contents {
    background-image: url("./../../assets/images/Oval.png"),
      url("./../../assets/images/ovalright.png");
    background-position: left top, right top;
    background-repeat: no-repeat, no-repeat;
    padding: 60px 3% 220px 7%;
    background-color: $lightgrey;

    .main-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      overflow: auto;
      position: relative;

      .shopping-cart {
        .cart-heading {
          font-size: 24px;
          font-weight: bold;
          color: $grey;
          padding-bottom: 16px;
        }
        .clear-cart {
          padding-top: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          button {
            border: 1px solid $red;
            outline: none;
            padding: 8px 16px;
            cursor: pointer;
            border-radius: 10px;
            font-weight: 500;
            transition: 0.5s ease-in-out;
            &:hover {
              background: $red;
              color: $white;
              border: 1px solid transparent;
            }
            .home-link {
              text-decoration: none;
              color: $darkgrey;
              &:hover {
                color: $white;
              }
            }
          }
        }
      }

      .order-description {
        .review-order {
          border-radius: 16px;
          background-color: $white;
          box-shadow: 0 9px 46px 8px rgba(17, 22, 26, 0.08),
            0 11px 15px -7px rgba(17, 22, 26, 0.2);
          padding: 18px 25px 50px 25px;

          .order-heading {
            font-size: 30px;
            font-weight: bold;
            color: $grey;
            padding-bottom: 28px;
          }

          .order-details {
            border-bottom: 2px solid $bold;

            .item-details {
              display: flex;
              justify-content: space-between;
              padding-bottom: 25px;

              .item-text {
                font-size: 18px;
                color: $lightblack;
                width: 50%;
              }

              .item-price {
                font-size: 16px;
                font-weight: 300;
                color: $darkash;
              }
            }
          }

          .order-total {
            border-bottom: 2px solid $bold;
            padding-top: 20px;

            .subtotal {
              display: flex;
              justify-content: space-between;
              padding-bottom: 20px;

              .subtotal-text {
                font-size: 18px;
                color: $lightblack;
              }

              .subtotal-price {
                font-size: 20px;
                font-weight: 500;
                color: $darkash;
              }
            }

            .delivery {
              display: flex;
              justify-content: space-between;
              padding-bottom: 20px;

              .delivery-text {
                font-size: 18px;
                color: $lightblack;
              }

              .delivery-price {
                font-size: 20px;
                font-weight: 500;
                color: $darkash;
              }
            }
          }

          .pre-auth {
            display: flex;
            flex-direction: row;
            gap: 10px;
            input {
              cursor: pointer;
            }
          }

          .total-amount {
            display: flex;
            justify-content: space-between;
            padding-top: 30px;

            .total-amount-text {
              font-size: 18px;
              font-weight: bold;
              color: $red;
            }

            .total-amount-price {
              font-size: 20px;
              font-weight: 500;
              color: $red;
            }
          }
        }

        .order-button {
          margin-top: 31px;
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
            rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
            rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

          .paypay-logo {
            cursor: pointer;
            padding: 20px 100px;
            border: none;
            background-color: $red;
            border-radius: 10px;
            margin-right: 1px;
            .button-style {
              padding-left: 10px;
              color: $white;
              font-weight: 600;
            }
          }
        }
        .link-account {
          text-align: center;
          padding-top: 20px;
          .link-btn {
            background-color: $white;
            padding: 10px 20px;
            border: 1px solid $red;
            border-radius: 20px;
            color: $red;
            font-weight: 600;
            transition: 0.6s ease;
            &:hover {
              background-color: $red;
              color: $white;
            }
          }
        }
        .paypay-click {
          margin-top: 14px;
          font-size: 14px;
          color: $lightpurple;
        }
      }
    }
  }

  .cart-contents {
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    padding-top: 32px;

    .cart-image {
      .cart-image-content {
        max-height: 100px;
        max-width: 120px;
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }

    .cart-text {
      display: flex;
      flex-direction: column;
      padding-left: 2%;
      color: $black;
      width: 40%;
      text-overflow: ellipsis;
      overflow: hidden;
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      .btn-qty {
        width: 30px;
        padding: 2px 0;
        border-radius: 6px;
        border: 1px solid $grey;
        cursor: pointer;
      }
      .quantity {
        font-size: 16px;
        font-weight: bold;
        padding: 0 8px;
      }
    }

    .cart-price {
      font-size: 20px;
      font-weight: bold;
      color: $red;
      padding-left: 3%;
    }

    .cart-close {
      padding-left: 10%;
      cursor: pointer;
      padding-top: 1%;
    }
  }

  .bottom-border {
    border-bottom: 1px solid $lightash;
  }
}
</style>
