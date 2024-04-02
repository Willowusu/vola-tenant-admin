<style>
.form-control {
  width: 300px;
}
</style>
<template>
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
                    <option value="2" >Update</option>
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

    <div class="modal bg-white fade" tabindex="-1" id="updateCustomer">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content shadow-none">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>

          <!--begin::Close-->
            <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
              <i class="ki-duotone ki-cross fs-2x"><span class="path1"></span><span class="path2"></span></i>
            </div>
          <!--end::Close-->
          </div>

          <div class="modal-body d-flex align-items-center justify-content-center">
            <form :model="formData">
              <div class="form-group my-3">
                <label for="customerEmail">Email</label>
                <input type="email" class="form-control form-control-solid" id="customerEmail"
                  placeholder="" v-model="formData.email">
              </div>
              <div class="form-group my-3">
                <label for="customerFirstName">First name</label>
                <input type="text" class="form-control form-control-solid" id="customerFirstName"
                  placeholder="Enter name of application" v-model="formData.firstName">
              </div>
              <div class="form-group my-3">
                <label for="customerLastName">Last name</label>
                <input type="text" class="form-control form-control-solid" id="customerLastName"
                  placeholder="Enter name of application" v-model="formData.lastName">
              </div>
              <div class="form-group my-3">
                <label for="customerPhone">Phone</label>
                <input type="tel" class="form-control form-control-solid" id="customerPhone"
                  placeholder="" v-model="formData.phone">
              </div>
              <div class="form-group my-3">
                <label for="customerAddressLine1">Address line 1</label>
                <input type="text" class="form-control form-control-solid" id="customerAddressLine1"
                  placeholder="" v-model="formData.addressLine1">
              </div>
              <div class="form-group my-3">
                <label for="customerAddressLine2">Address line 2</label>
                <input type="text" class="form-control form-control-solid" id="customerAddressLine2"
                  placeholder="" v-model="formData.addressLine2">
              </div>
              <div class="form-group my-3">
                <label for="customerCity">City</label>
                <input type="text" class="form-control form-control-solid" id="customerCity"
                  placeholder="" v-model="formData.city">
              </div>
              <div class="form-group">
                <label for="customerState">State</label>
                <input type="text" class="form-control form-control-solid" id="customerState"
                  placeholder="" v-model="formData.state">
              </div>
              <div class="form-group">
                <label for="customerZipCode">Zipcode/Postcode</label>
                <input type="text" class="form-control form-control-solid" id="customerZipCode"
                  placeholder="" v-model="formData.zipcode">
              </div>
              <div class="form-group">
                <label for="customerGender">Gender</label>
                <select class="form-control form-control-solid" id="customerGender" v-model="formData.gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="customerDateOfBirth">Date of birth</label>
                <input type="date" class="form-control form-control-solid" id="customerDateOfBirth"
                  placeholder="" v-model="formData.dateOfBirth">
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="confirmSaveChanges">Save changes</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios"; // Import Axios library
import Swal from "sweetalert2"; // Import SweetAlert library
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import api from "@/utils/api";


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

    const formData = ref({
       email: "",
      firstName: "",
      lastName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipcode: "",
      gender: "",
      dateOfBirth: ""
    });
    const tableData1 = ref([]); // Initialize tableData1 as an empty array

    // Fetch data from the API and update tableData1
    const fetchData = async () => {
      try {
        const response = await api.post("/tenant-customers");
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

    const handleUpdateCustomer = (customer: object) => {
      show.value=true;// Set show variable to true to show the modal
    };

    // Method to handle actions based on dropdown selection
    const handleAction = (customer: object, action: string) => {
      switch (action) {
        case "1":
          // View action logic
          break;
        case "2":
          // Update action logic
          handleUpdateCustomer(customer);
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

    console.log(show.value)

    return {
      tableHeader,
      tableData1,
      handlePasswordResetMail,
      handleDeleteAccount,
      handleUpdateCustomer,
      handleAction,
      show,
      isLoading,
      formData,
};
  },
});
</script>
