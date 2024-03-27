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
            <h2>App Management</h2>
          </div>
          <!--end::Card title-->

          <!--begin::Toolbar-->
          <div class="card-toolbar m-0">
            <!--begin::Tab nav-->
            <ul class="nav nav-stretch fs-5 fw-semobold nav-line-tabs nav-line-tabs-2x border-transparent"
              role="tablist">
              <li class="nav-item" role="presentation">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#createApplication">+ Add
                  application</button>
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
            <div id="kt_customer_details_invoices_1" class="py-0 tab-pane fade active show" role="tabpanel">
              <Datatable :header="tableHeader" :data="tableData1" :items-per-page="5"
                :items-per-page-dropdown-enabled="false">
                <template v-slot:name="{ row: application }">
                  {{ application.name }}
                </template>
                <template v-slot:description="{ row: application }">
                  {{ application.description }}
                </template>
                <template v-slot:platform="{ row: application }">
                  {{ application.platform }}
                </template>
                <template v-slot:reference="{ row: application }">
                  {{ application.reference }}
                </template>
                <template v-slot:createdAt="{ row: application }">
                  {{ application.createdAt }}
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


  <div class="modal bg-white fade" tabindex="-1" id="createApplication">
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
              <label for="applicationName">Name</label>
              <input type="text" class="form-control form-control-solid" id="applicationName"
                placeholder="Enter name of application" v-model="formData.name">
            </div>
            <div class="form-group">
              <label for="applicationDescription">Description</label>
              <input type="text" class="form-control form-control-solid" id="applicationDescription"
                placeholder="Application description" v-model="formData.description">
            </div>
            <div class="form-group my-3">
              <label for="applicationPlatform">Platform</label>
              <select class="form-control form-control-solid" id="applicationPlatform" v-model="formData.platform">
                <option value="mobile">Mobile</option>
                <option value="api">API</option>
              </select>
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
        columnName: "Name",
        columnLabel: "name",
        sortEnabled: false,
      },
      {
        columnName: "Description",
        columnLabel: "description",
        sortEnabled: false,
      },
      {
        columnName: "Platform",
        columnLabel: "platform",
        sortEnabled: false,
      },
      {
        columnName: "Reference",
        columnLabel: "reference",
        sortEnabled: false,
      },
      {
        columnName: "Created At",
        columnLabel: "createdAt",
      },
    ]);
    const tableData1 = ref([]); // Initialize tableData1 as an empty array

    const formData = ref({
      name: "",
      description: "",
      platform: "",
    });

    // Fetch data from the API and update tableData1
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://38.242.248.142:5000/applications/",
          {
            "search": "",
            "filter": {
              "tenantId": "996e2445-3eac-4e0c-94be-9c0fc241d62d",
              "name": "",
              "description": "",
              "platform": "",
              "status": "",
              "username": "",
              "reference": ""
            }
          }
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

    // New method to handle "Save changes" button click
    const confirmSaveChanges = async () => {
      // Show SweetAlert confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to save changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, save changes',
        cancelButtonText: 'No, cancel',
      });
      // Check user's response
      if (result.isConfirmed) {
        // If user confirms, proceed with form submission
        submitForm();

      }
    }

    // New method to handle form submission
    const submitForm = async () => {
      try {


        // Make API call to save form data
        const response = await axios.post('https://38.242.248.142:5000/applications/', formData.value);

        if (response.data.status === "success") {
          // Show success message
          await Swal.fire({
            title: 'Success!',
            text: 'Application created successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(async (result) => {
            //this alert should have the created application details
            await Swal.fire({
              title: 'Success!',
              text: 'Application created successfully.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          })
        } else {
          await Swal.fire({
            title: 'Error!',
            text: 'Failed to create application. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }

        // Close modal after successful form submission
      } catch (error) {
        // Show error message if API call fails
        console.error('Error creating application:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to create application. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }


    return {
      tableHeader,
      tableData1,
      show,
      isLoading,
      confirmSaveChanges,
      formData,
      submitForm
    };
  },
});
</script>
