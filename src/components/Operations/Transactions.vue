<template>
  <div class="mb-5 hover-scroll-x">
    <div class="d-grid">
      <div :class="`card pt-2 ${cardClasses}`">
        <!--begin::Card header-->
        <div class="card-header border-0">
          <!--begin::Card title-->
          <div class="card-title">
            <h2>Transactions</h2>
          </div>
          <!--end::Card title-->

          <!--begin::Toolbar-->
          <div class="card-toolbar m-0">
            <div class="d-flex align-items-center position-relative my-1">
              <KTIcon
              icon-name="magnifier"
              icon-class="fs-1 position-absolute ms-6"
            /> <input
              type="text"
              v-model="search"
              @input="searchItems()"
              class="form-control form-control-solid w-250px ps-15"
              placeholder="Search Transactions"
            /></div>
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
              <Datatable :header="tableHeader" :data="tableData1" :items-per-page="20"
                :items-per-page-dropdown-enabled="false">
                <template v-slot:receiptNumber="{ row: transaction }">
                  <router-link :to="'/transaction-details/' + transaction.safeId">{{ transaction.receiptNumber }}</router-link>
                  
                </template>
                <template v-slot:type="{ row: transaction }">
                  {{ transaction.type }}
                </template>
                <template v-slot:senderName="{ row: transaction }">
                  {{ transaction.senderName }}
                </template>
                <template v-slot:recipientName="{ row: transaction }">
                  <span v-if="transaction.recipientName">{{ transaction.recipientName }}</span>
                  <span v-else="transaction.recipientName">Not Available</span>
                </template>
                <template v-slot:sendAmount="{ row: transaction }">
                  {{ transaction.sendAmount }} {{ transaction.sendCurrency }}
                </template>
                <template v-slot:createdAt="{ row: transaction }">
                  {{ transaction.createdAt }}
                </template>
                <template v-slot:payoutStatus="{ row: transaction }">
                  {{ transaction.payoutStatus }}
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
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { ITransaction } from "@/core/data/transactions";
import { MenuComponent } from "@/assets/ts/components";
import axios from "axios"; // Import Axios library


export default defineComponent({
  name: "live-transactions-view",
  props: {
    cardClasses: String,
  },
  components: {
    Datatable,
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "Transaction ID",
        columnLabel: "receiptNumber",
        sortEnabled: false,
      },
      {
        columnName: "Transaction Type",
        columnLabel: "type",
        sortEnabled: false,
      },
      {
        columnName: "Sender",
        columnLabel: "senderName",
        sortEnabled: false,
      },
      {
        columnName: "Recipient",
        columnLabel: "recipientName",
        sortingField: "recipientName",
        sortEnabled: false,
      },
      {
        columnName: "Amount",
        columnLabel: "sendAmount",
        sortEnabled: false,
      },
      {
        columnName: "Date",
        columnLabel: "createdAt",
        sortEnabled: false,
      },
      {
        columnName: "Status",
        columnLabel: "payoutStatus",
        sortEnabled: "payoutStatus",
      },
    ]);

    const tableData1 = ref<Array<ITransaction>>([]);
    const initTransactions = ref<Array<ITransaction>>([]);

    const fetchTransactions = async () => {
      try {
        const response = await axios.post('https://38.242.248.142:5000/transactions', {
          "search": "",
          "filter": {
            "tenantId": "b908c605-a609-4a85-8e04-77f1dd06a0f0",
            "tenantCustomerId": "dc47a62d-8101-48aa-8545-9cfd72cdedba",
            "tenantCountryId": "",
            "recipientId": "",
            "paymentPartnerId": "",
            "payoutPartnerId": "",
            "transactionPurposeId": "",
            "countryPaymentMethodId": "",
            "countryPayoutMethodId": "",
            "paymentAccountId": "",
            "receiptNumber": "",
            "sendCurrency": "",
            "receiveCurrency": "",
            "senderName": "",
            "senderPhone": "",
            "senderEmail": "",
            "recipientName": "",
            "paymentStatus": "",
            "payoutStatus": "",
            "socketId": "",
            "referralCode": ""
          }
        });
        const transactionResponse = await response.data;
        if (transactionResponse.status === 'success') {
          tableData1.value = transactionResponse.data.rows;
          initTransactions.value = [...transactionResponse.data.rows];
        }
      } catch (error) {
        console.error(error);
      }
    }

    const search = ref<string>("");
    const searchItems = () => {
      tableData1.value = [...initTransactions.value];
      if (search.value !== "") {
        let results: Array<ITransaction> = [];
        for (let j = 0; j < tableData1.value.length; j++) {
          if (searchingFunc(tableData1.value[j], search.value)) {
            results.push(tableData1.value[j]);
          }
        }
        tableData1.value = [...results];
      }
      MenuComponent.reinitialization();
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (typeof obj[key] === "string" && obj[key].indexOf(value) !== -1) {
          return true;
        }
      }
      return false;
    };


    onMounted(() => {
      fetchTransactions();
    });

    return { tableHeader, tableData1, search, searchItems };
  },
});
</script>

