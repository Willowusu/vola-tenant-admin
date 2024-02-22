<template>
    <!--begin::Card-->
    <div class="card shadow-sm">
        <div class="card-header">
            <h3 class="card-title">Transaction Details</h3>
            <div class="card-toolbar">
                <select name="status" data-control="select2" data-hide-search="true"
                    class="form-select form-select-white form-select-sm w-125px">
                    <option value="Active" selected="">Active</option>
                    <option value="Approved">In Progress</option>
                    <option value="Declined">To Do</option>
                    <option value="In Progress">Completed</option>
                </select>
            </div>
        </div>
        <div class="card-body">
            <div class="row my-5">
                <div class="col-6 fw-bold">Receipt Number:</div>
                <div class="col-6">{{ transactionDetails?.receiptNumber || 'Not Available' }}</div>
            </div>
            <div class="row">
                <div class="col-6 fw-bold">Creation Date:</div>
                <div class="col-6">{{transactionDetails?.createdAt || 'Not Available' }}</div>
            </div>
            <div class="row my-5">
                <div class="col-6 fw-bold">Payment Initialization Date:</div>
                <div class="col-6">{{transactionDetails?.paymentInitDate || 'Not Available'}}</div>
            </div>
            <div class="row">
                <div class="col-6 fw-bold">Payment Completed Date:</div>
                <div class="col-6">{{transactionDetails?.paymentCompletedDate || 'Not Available'}}</div>
            </div>
            <div class="row my-5">
                <div class="col-6 fw-bold">Payout Initialization Date:</div>
                <div class="col-6">{{transactionDetails?.payoutInitDate || 'Not Available' }}</div>
            </div>
            <div class="row">
                <div class="col-6 fw-bold">Payout Completed Date:</div>
                <div class="col-6">{{transactionDetails?.payoutCompletedDate || 'Not Available' }}</div>
            </div>
            <div class="row my-5">
                <div class="col-6 fw-bold">Amount Paid:</div>
                <div class="col-6">{{transactionDetails?.amountPaid}} {{ transactionDetails?.sendCurrency }}</div>
            </div>
            <div class="row ">
                <div class="col-6 fw-bold">Transfer Fee:</div>
                <div class="col-6">{{transactionDetails?.transactionCharge }} {{ transactionDetails?.sendCurrency }}</div>
            </div>
            <div class="row my-5">
                <div class="col-6 fw-bold">Amount Converted:</div>
                <div class="col-6">{{transactionDetails?.amountConverted}} {{ transactionDetails?.sendCurrency }}</div>
            </div>
            <div class="row">
                <div class="col-6 fw-bold">Sender Name:</div>
                <div class="col-6">{{transactionDetails?.senderName || 'Not Available' }}</div>
            </div>
            <div class="row my-5">
                <div class="col-6 fw-bold">Sender Email:</div>
                <div class="col-6">{{transactionDetails?.senderEmail || 'Not Available' }}</div>
            </div>
            <div class="row">
                <div class="col-6 fw-bold">Recipient Name:</div>
                <div class="col-6">{{ transactionDetails?.recipientName || 'Not Available' }}</div>
            </div>
            <div class="row my-5">
                <div class="col-6 fw-bold">Payment Status:</div>
                <div class="col-6">
                    <span :class="getStatusBadgeClass(transactionDetails?.paymentStatus)">
                        {{ transactionDetails?.paymentStatus || 'Not Available' }}
                    </span>
                    
                </div>
            </div>
            <div class="row">
                <div class="col-6 fw-bold">Payout Status:</div>
                <div class="col-6">
                    <span :class="getStatusBadgeClass(transactionDetails?.payoutStatus)">
                        {{ transactionDetails?.payoutStatus || 'Not Available' }}
                    </span>
                    
                </div>
            </div>

        </div>
        <div class="card-footer small">
            This money remittance service (the “Service”) is offered by XYZ Money Transfer Limited (XYZ, “we” or “us”). The
            Service is provided through the website and mobile application of XYZ. XYZ is a company registered in Country &
            Country with registered offices at 9 XYZ Road, Town, City, Country. XYZ Money Transfer Ltd is Registered and
            Regulated by the Financial Conduct Authority (FCA) under the Payment Service Regulations 2017 for the provision
            of payment services. FCA Registration Number: 123456. ContinXYZental Money Transfer Ltd is registered in Country
            and Country with Company registration number: 0987654. Money Laundering Regulation Number (MSB):
            XBH000000000828.
        </div>
    </div>
    <!--end::Card-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from 'vue-router'; // Import useRoute from vue-router
import type { ITransaction } from "@/core/data/transactions";


export default defineComponent({
    name: "kt-details",

    setup() {
        let transactionId: string | undefined | string[];
        const route = useRoute(); // Use useRoute to access route object
        const transactionDetails = ref<ITransaction | null>(null); // Initialize as null

         const getStatusBadgeClass = (status: string): string => {
            switch (status) {
                case "pending":
                    return "badge bg-warning";
                case "success":
                    return "badge bg-success";
                case "failed":
                    return "badge bg-danger";
                default:
                    return "badge bg-secondary";
            }
        };


        try {

            onMounted(async () => {
                transactionId = route.params.id; // Access transactionId from route.params
                const response = await fetch('http://localhost:3000/' + transactionId);
                const responseDetails = await response.json();
                if (responseDetails.status === "success") {
                    transactionDetails.value = responseDetails.data
                }
            });

        } catch (error) {
            console.log(error)
        }

        return {
            getAssetPath,
            transactionId, // Expose transactionId to the template
            transactionDetails,
            getStatusBadgeClass
        };
    },
});
</script>

