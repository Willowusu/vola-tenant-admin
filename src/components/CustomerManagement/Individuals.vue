<template>
  <template>
    <button
      class="btn btn-sm btn-primary ms-3 px-4 py-3"
      @click="() => (show = true)"
    >
      <i class="ki-outline ki-plus-square fs-2"></i>
      <span>Add Payment Method</span>
    </button>
  </template>

  <div class="mb-5 hover-scroll-x">
    <div class="d-grid">
      <div :class="`card pt-2 ${cardClasses}`">
        <!--begin::Card header-->
        <div class="card-header border-0">
          <!--begin::Card title-->
          <div class="card-title">
            <h2>Individuals</h2>
          </div>
          <!--end::Card title-->

          <!--begin::Toolbar-->
          <div class="card-toolbar m-0">
            <!--begin::Tab nav-->
            <ul
              class="nav nav-stretch fs-5 fw-semobold nav-line-tabs nav-line-tabs-2x border-transparent"
              role="tablist"
            >
              <li class="nav-item" role="presentation">
                <a
                  id="kt_referrals_year_tab"
                  class="nav-link text-active-primary active"
                  data-bs-toggle="tab"
                  role="tab"
                  href="#kt_customer_details_invoices_1"
                >
                  This Year
                </a>
              </li>
            </ul>
            <!--end::Tab nav-->
          </div>
          <!--end::Toolbar-->
        </div>
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body pt-0">
          <!--begin::Tab Content-->
          <div id="kt_referred_users_tab_content" class="tab-content">
            <div
              id="kt_customer_details_invoices_1"
              class="py-0 tab-pane fade active show"
              role="tabpanel"
            >
              <Datatable
                :header="tableHeader"
                :data="tableData1"
                :items-per-page="5"
                :items-per-page-dropdown-enabled="false"
              >
                <template v-slot:firstName="{ row: customer }">
                  {{ customer.firstName }}
                </template>
                <template v-slot:lastName="{ row: customer }">
                  {{ customer.lastName }}
                </template>
                <template v-slot:email="{ row: customer }">
                  {{ customer.email }}
                </template>
                <template v-slot:phone="{ row: customer }">
                  {{ customer.phone }}
                </template>
                <template v-slot:action="{ row: customer }">
                  <select
                    class="form-select form-select-solid"
                    aria-label="Select example"
                    @change="handleAction(customer, $event.target.value)"
                  >
                    <option>....</option>
                    <option value="1">View</option>
                    <option value="2">Update</option>
                    <option value="3">Password reset mail</option>
                    <option value="4">Reset account password</option>
                    <option value="5">Delete</option>
                  </select>
                </template>
              </Datatable>
            </div>
          </div>
          <!--end::Tab Content-->
        </div>
        <!--end::Card body-->
      </div>
    </div>
  </div>

  <FullModal v-model="show" width="900px" :hide-header="true">
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
                  <div class="row"></div>
                </div>
              </div>

              <div class="card-footer d-flex flex-end flex-row-fluid px-15">
                <button
                  type="button"
                  class="btn btn-secondary me-5"
                  data-bs-dismiss="modal"
                  @click="() => (show = false)"
                >
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

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios"; // Import Axios library
import Swal from "sweetalert2"; // Import SweetAlert library
import Datatable from "@/components/kt-datatable/KTDataTable.vue";

export default defineComponent({
  name: "users-view",
  props: {
    cardClasses: String,
  },
  components: {
    Datatable,
  },
  setup() {
    const show = ref(false);
    const isLoading = ref(true); // Loading indicator state

    const tableHeader = ref([
      // Your existing table header definition
      {
        columnName: "First Name",
        columnLabel: "firstName",
        sortEnabled: false,
      },
      {
        columnName: "Last Name",
        columnLabel: "lastName",
        sortEnabled: false,
      },
      {
        columnName: "Email",
        columnLabel: "email",
        sortingField: "email",
        sortEnabled: false,
      },
      {
        columnName: "Phone",
        columnLabel: "phone",
        sortEnabled: false,
      },
      {
        columnName: "Action",
        columnLabel: "action",
      },
    ]);
    const tableData1 = ref([]); // Initialize tableData1 as an empty array

    // Fetch data from the API and update tableData1
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://38.242.248.142:5000/tenant-customers"
        );
        tableData1.value = response.data.data.rows; // Assuming API response is an array of objects matching your table structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData function when the component is mounted
    onMounted(() => {
      fetchData();
    });

    // Method to handle password reset action
    const handlePasswordResetMail = (customerEmail: string) => {
      Swal.fire({
        title: "Confirm Email",
        text: `Send password reset link to ${customerEmail}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Send",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.post(
              "https://38.242.248.142:5000/tenant-customers/send-password-reset-mail",
              { email: customerEmail }
            );
            if (response.data.status === "success") {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Reset password email sent",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: response.data.message,
              });
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong!",
            });
          }
        }
      });
    };

    const handleDeleteAccount = (customer: object) => {
      Swal.fire({
        title: "Confirm Delete Account",
        text: `Delete account for ${customer.email}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(
              `https://38.242.248.142:5000/tenant-customers/${customer.safeId}`
            );
            if (response.data.status === "success") {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Account deleted",
              });

              setTimeout(() => {
                location.reload();
              }, 3000);
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: response.data.message,
              });
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong!",
            });
          }
        }
      });
    };

    const handleUpdateUser = (customer: object) => {
      show.value = true; // Set show variable to true to show the modalgithub
    };

    // Method to handle actions based on dropdown selection
    const handleAction = (customer: object, action: string) => {
      switch (action) {
        case "1":
          // View action logic
          break;
        case "2":
          // Update action logic
          handleUpdateUser(customer);
          break;
        case "3":
          // Password reset mail action logic
          handlePasswordResetMail(customer.email);
          break;
        case "4":
          // Reset account password action logic
          break;
        case "5":
          // Delete action logic
          handleDeleteAccount(customer);
          break;
        default:
          break;
      }
    };

    return {
      tableHeader,
      tableData1,
      handlePasswordResetMail,
      handleDeleteAccount,
      handleAction,
      show,
      isLoading,
    };
  },
});
</script>
