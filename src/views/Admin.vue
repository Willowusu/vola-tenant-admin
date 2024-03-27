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
        { name: "Payment Gateway Setup", url: "/payment-gateway-setup" },
        { name: "Payout Gateway Setup", url: "/payout-gateway-setup" },
        { name: "Mailers", url: "/mailers" },
        { name: "User Management", url: "/system-user-management" },
        { name: "Logs", url: "/logs" },
        { name: "Tenant Config", url: "/tenant-config" },
        { name: "Push Notifications", url: "/push-notifications" },
        { name: "Application Management", url: "/app-management" },
      ],
    };
  },
  });
  </script>



  