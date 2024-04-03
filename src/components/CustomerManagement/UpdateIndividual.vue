<style>
.form-control {
  width: 300px;
}
</style>
<template>
  <div class="d-flex align-items-center justify-content-center">
    <form :model="formData">
      <div class="row py-6">
        <div class="form-group col-4">
          <label for="customerEmail">Email</label>
          <input
            type="email"
            class="form-control"
            id="customerEmail"
            placeholder=""
            v-model="formData.email"
          />
        </div>
        <div class="form-group col-4">
          <label for="customerFirstName">First name</label>
          <input
            type="text"
            class="form-control"
            id="customerFirstName"
            placeholder=""
            v-model="formData.firstName"
          />
        </div>
        <div class="form-group col-4">
          <label for="customerLastName">Last name</label>
          <input
            type="text"
            class="form-control"
            id="customerLastName"
            placeholder=""
            v-model="formData.lastName"
          />
        </div>
      </div>
      <div class="row py-6">
        <div class="form-group col-4">
          <label for="customerPhone">Phone</label>
          <input
            type="tel"
            class="form-control"
            id="customerPhone"
            placeholder=""
            v-model="formData.phone"
          />
        </div>
        <div class="form-group col-4">
          <label for="customerAddressLine1">Address line 1</label>
          <input
            type="text"
            class="form-control"
            id="customerAddressLine1"
            placeholder=""
            v-model="formData.addressLine1"
          />
        </div>
        <div class="form-group col-4">
          <label for="customerAddressLine2">Address line 2</label>
          <input
            type="text"
            class="form-control"
            id="customerAddressLine2"
            placeholder=""
            v-model="formData.addressLine2"
          />
        </div>
      </div>
      <div class="row py-6">
        <div class="form-group col-4">
          <label for="customerCity">City</label>
          <input
            type="text"
            class="form-control"
            id="customerCity"
            placeholder=""
            v-model="formData.city"
          />
        </div>
        <div class="form-group col-4">
          <label for="customerState">State</label>
          <input
            type="text"
            class="form-control"
            id="customerState"
            placeholder=""
            v-model="formData.state"
          />
        </div>
        <div class="form-group col-4">
          <label for="customerZipCode">Zipcode/Postcode</label>
          <input
            type="text"
            class="form-control"
            id="customerZipCode"
            placeholder=""
            v-model="formData.zipcode"
          />
        </div>
      </div>
      <div class="row py-6">
        <div class="form-group col-4">
          <label for="customerGender">Gender</label>
          <select
            class="form-control"
            id="customerGender"
            v-model="formData.gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group col-4">
          <label for="customerDateOfBirth">Date of birth</label>
          <input
            type="date"
            class="form-control"
            id="customerDateOfBirth"
            placeholder=""
            v-model="formData.dateOfBirth"
          />
        </div>
      </div>
    </form>
  </div>

  <div class="d-flex justify-content-center py-6">
    <button type="button" class="btn btn-primary" @click="confirmSaveChanges">
      Save changes
    </button>
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
  name: "update-individual",
  props: ["customer"],
  setup(props) {
    //for testing purposes
    const tenantId = "996e2445-3eac-4e0c-94be-9c0fc241d62d";
    const route = useRoute();
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
      dateOfBirth: "",
    });

    const confirmSaveChanges = async () => {
      // Your logic for saving changes
      Swal.fire({
        title: "Update user",
        text: "Are you sure you want to update this user?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Send",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await api.patch(
              `/tenant-customers/${route.params.id}`,
              formData
            );
            if (response.data.status === "success") {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Tenant Customer updated",
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

    return {
      formData,
      confirmSaveChanges,
    };
  },
});
</script>
