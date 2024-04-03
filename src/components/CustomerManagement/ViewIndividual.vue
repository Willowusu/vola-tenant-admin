<template>
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->

      <!--begin::Action-->
      <!-- <a href="/metronic8/demo1/account/settings.html" class="btn btn-sm btn-primary align-self-center">Edit Profile</a>    -->
      <!--end::Action-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">Full Name</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-gray-800"
            >{{ individualDetails[0]?.firstName }}
            {{ individualDetails[0]?.lastName }}</span
          >
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">Email</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 fv-row">
          <span class="fw-semibold text-gray-800 fs-6">{{
            individualDetails[0]?.email
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">
          Contact Phone

          <span
            class="ms-1"
            data-bs-toggle="tooltip"
            aria-label="Phone number must be active"
            data-bs-original-title="Phone number must be active"
            data-kt-initialized="1"
          >
            <i class="ki-duotone ki-information fs-7"
              ><span class="path1"></span><span class="path2"></span
              ><span class="path3"></span
            ></i>
          </span>
        </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bold fs-6 text-gray-800 me-2">{{
            individualDetails[0]?.phone
          }}</span>
          <span class="badge badge-success">Verified</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->
      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">Address </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 fv-row">
          <div class="fw-semibold text-gray-800 fs-6">
            {{ individualDetails[0]?.addressLine1 || "Not Available" }}
          </div>
          <div class="fw-semibold text-gray-800 fs-6">
            {{ individualDetails[0]?.addressLine2 || "Not Available" }}
          </div>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted"
          >City | State | Zip</label
        >
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <a href="#" class="fw-semibold fs-6 text-gray-800 text-hover-primary"
            >{{ individualDetails[0]?.city || "Not Available" }} |
            {{ individualDetails[0]?.state || "Not Available" }} |
            {{ individualDetails[0]?.zipcde || "Not Available" }}</a
          >
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->
      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">Date of birth </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 fv-row">
          <span class="fw-semibold text-gray-800 fs-6">{{
            individualDetails[0]?.dateOfBirth || "Not Available"
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->
      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">Gender </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 fv-row">
          <span class="fw-semibold text-gray-800 fs-6">{{
            individualDetails[0]?.gender || "Not Available"
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->
      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">Compliance level </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 fv-row">
          <span class="fw-semibold text-gray-800 fs-6">{{
            individualDetails[0]?.complianceLevel || "Not Available"
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->
    </div>
    <!--end::Card body-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios"; // Import Axios library
import Swal from "sweetalert2"; // Import SweetAlert library
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import api from "@/utils/api";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "view-individual",
  props: {
    cardClasses: String,
  },
  components: {
    Datatable,
  },
  setup() {
    //for testing purposes
    const tenantId = "996e2445-3eac-4e0c-94be-9c0fc241d62d";
    const route = useRoute();
    const individualDetails = ref([]);
    const individualId = route.params.id;

    // Fetch data from the API and update tableData1
    const fetchData = async () => {
      try {
        const customersFilter = {
          search: "",
          filter: {
            tenantId: tenantId,
            accountId: "",
            sendingCountryId: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zipcode: "",
            gender: "",
          },
        };
        const response = await api.post("/tenant-customers", customersFilter);
        individualDetails.value = response.data.data.rows.filter(
          (individuals) => individuals.safeId == individualId
        ); // Assuming API response is an array of objects matching your table structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData function when the component is mounted
    onMounted(() => {
      fetchData();
    });

    return {
      individualDetails,
    };
  },
});
</script>
