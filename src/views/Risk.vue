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
        { name: "Individuals", url: "/risk-individuals" },
        { name: "Businesses", url: "/risk-businesses" },
      ],
    };
  },
  });
  </script>