<template>
          <div
    class="flex-column flex-lg-row-auto w-100 w-xl-250px mb-10"
    id="kt_view_summary"
    data-kt-sticky="true"
    data-kt-sticky-name="view-subscription-summary"
    data-kt-sticky-offset="{default: false, lg: '200px'}"
    data-kt-sticky-width="{lg: '250px', xl: '300px'}"
    data-kt-sticky-left="auto"
    data-kt-sticky-top="150px"
    data-kt-sticky-animation="false"
    data-kt-sticky-zindex="95"
  >
    <div class="card mb-5 mb-xl-8">
      <div class="card-body pt-5">
        <div class="d-flex flex-stack fs-4 py-3">
          <div
            class="fw-bold rotate collapsible"
            data-bs-toggle="collapse"
            href="#kt_customer_view_details"
            role="button"
            aria-expanded="false"
            aria-controls="kt_customer_view_details"
          >
            More
            <span class="ms-2 rotate-180"
            ><i class="ki-duotone ki-down fs-3">
              </i></span
            >
          </div>
         
        </div>
        <div class="separator separator-dashed my-3"></div>
        <div id="kt_customer_view_details" class="collapse show">
          <div class="py-5 fs-6">

            <div class="text-gray-600">
                <li v-for="(menuItem, index) in menuList" :key="index" class="py-2">
                  <router-link to={{ menuItem.url }}>{{ menuItem.name }}</router-link>
                </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "side-menu",
  props: {
    menuList: { type: Array},
  },
});
</script>

