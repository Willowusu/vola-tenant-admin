<template>
    <div class="d-flex flex-column flex-xl-row">

<SideMenu :menuList="yourMenuListData"></SideMenu>

  <div class="flex-lg-row-fluid ms-lg-15">
    <router-view></router-view>
  </div>
</div>

</template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import SideMenu from "@/components/SideMenu.vue"
  
  export default defineComponent({
    name: "finance-view",
    props: {
      cardClasses: String,
    },
    components: {
      SideMenu
    },
      data() {
    return {
      // Your data that you want to pass to the side-menu component
      yourMenuListData: [
        { name: "Rates", url: "/rates" },
        { name: "Threshold Limit", url: "/threshold-limit" },
        { name: "Risk Score", url: "/risk-score" },
        { name: "Application Management", url: "/app-management" },
        { name: "Payment Gateways", url: "/payment-gateways" },
        { name: "Payout Partners", url: "/payout-partners" },
        { name: "Mailers", url: "/mailers" },
        { name: "Countries", url: "/countries" },
        { name: "User Management", url: "/user-management" },
        { name: "Risk Checks", url: "/risk-checks" },
        { name: "Logs", url: "/logs" },
      ],
    };
  },
  });
  </script>
  
  


  

