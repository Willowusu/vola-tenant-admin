<template>
  <FullModal v-model="show" width="900px">
    <div v-if="isLoading">
      <!-- Display a loading indicator here -->
      Loading...
    </div>


    <div v-else>
      <!--begin::Form-->
      <div id="kt_add_payment_methods_form">
        <!--begin::Step 1-->
        <div class="current" data-kt-stepper-element="content">
          <!--begin::Wrapper-->
          <div class="w-100">
            <!--begin::Heading-->
            <div class="pb-5">
              <!--begin::Title-->
              <h2 class="fw-bold d-flex align-items-center text-dark">
                Choose the Payment Method Type
              </h2>
              <!--end::Title-->

              <!--begin::Notice-->
              <div class="text-gray-400 fw-semobold fs-6">
                How will the funds will be debited
              </div>
              <!--end::Notice-->
            </div>
            <!--end::Heading-->
            <div class="card">
              <div class="card-body p-15">
                <div class="fv-row">
                  <div class="row">
                    <!-- Iterate over payment methods and render options -->
                
                  </div>
                </div>
              </div>

              <div class="card-footer d-flex flex-end flex-row-fluid px-15">
                <button type="button" class="btn btn-secondary me-5" data-bs-dismiss="modal" @click="() => show = false">
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Step 1-->
      </div>
    </div>
  </FullModal>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FullModal from "@/components/CustomerManagement/FullModal.vue";
import Swal from "sweetalert2";

defineProps<{
  show: boolean,
}>();


</script>




