import { getAssetPath } from "@/core/helpers/assets";

interface ITransaction {
  safeId: string;
  receiptNumber: string;
  type: "PAYMENT" | "REFUND" | "OTHER"; // Add other possible types if needed
  sendAmount: number;
  transactionCharge: number;
  partnerCharge: number;
  exchangeRate: number;
  amountConverted: number;
  discountAmount: number;
  amountPaid: number;
  sendCurrency: string;
  receiveAmount: number;
  receiveCurrency: string;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  senderIdType: string | null;
  senderIdNumber: string | null;
  recipientName: string | null;
  paymentStatus: "pending" | "success" | "failed"; // Add other possible statuses if needed
  payoutStatus: "pending" | "success" | "failed"; // Add other possible statuses if needed
  isFlagged: boolean;
  paymentInitDate: string; // Change type to Date if using Date object
  paymentCompletedDate: string | null; // Change type to Date if using Date object
  payoutInitDate: string | null; // Change type to Date if using Date object
  payoutCompletedDate: string | null; // Change type to Date if using Date object
  socketId: string | null;
  riskScore: number | null;
  referralCode: string;
  isReferralRedeemed: boolean;
  isThreeDsEnabled: boolean;
  threeDsStatus: string | null;
  callbackUrl: string;
  createdAt: string; // Change type to Date if using Date object
  updatedAt: string; // Change type to Date if using Date object
}




export type { ITransaction };

