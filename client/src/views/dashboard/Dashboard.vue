// components/views/dashboard/Dashboard.vue

<template>
  <div class="dashboard">
      <div class="dashboard-items">
        <div class="header-image">
          <p class="header-text">
            {{ $t("cake_shop.header_text_one") }}
            <br />
            {{ $t("cake_shop.header_text_two") }}
          </p>
        </div>
        <div class="header-bar"></div>
        <div class="dashboard-content">
          <div class="main-content">
            <div class="main-image">
              <img alt="Cake" src="@/assets/images/cakelogo.png" />
            </div>
            <p class="main-text">{{ $t("cake_shop.main_text") }}</p>
            <div class="main-cakes">
              <div class="cake-contents">
                <ProductItem
                  v-for="(item, index) in allItems"
                  :key="index"
                  :props="item"
                ></ProductItem>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { useStore, mapGetters } from "vuex";
import ProductItem from "../../components/item/ProductItem.vue";

export default {
  name: "AdminDashboard",
  components: { ProductItem },
  computed: mapGetters("items", ["allItems"]),
  setup() {
    const store = useStore();
    onMounted(async () => {
      try {
        await store.dispatch("items/fetchCakes");
      } catch (error) {
        console.error("Error in onMounted:", error);
      }
    });
  },
};
</script>

<style lang="scss">
@import "@/styles/variables";

.dashboard {
  padding-top: 70px;
  .dashboard-items {
    position: relative;
    top: -107px;

    .header-image {
      background-image: url("./../../assets/images/banner.png");
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      .header-text {
        font-size: 30px;
        font-weight: bold;
        padding: 181px 0px 110px 7%;
      }
    }

    .header-bar {
      height: 4px;
      background-color: $yellow;
    }

    .dashboard-content {
      .main-content {
        background-image: url("./../../assets/images/Oval.png"),
          url("./../../assets/images/ovalright.png");
        background-position: left top, right top;
        background-repeat: no-repeat, no-repeat;
        padding: 46px 7% 170px 7%;
        background-color: $lightgrey;

        .main-image {
          text-align: center;
          padding-bottom: 16px;
        }

        .main-text {
          text-align: center;
          font-weight: bold;
          color: $grey;
          font-size: 40px;
          padding-bottom: 37px;
        }

        .main-cakes {
          display: flex;
          justify-content: center;

          .cake-contents {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
        }
      }
    }
  }

  .cakes-padding {
    padding-left: 20px;
  }

  .bottom-padding {
    padding-bottom: 20px;
  }
}
</style>
