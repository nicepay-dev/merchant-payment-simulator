import type { PayMethodCode, Status } from "../types";

export const STATUS_MAPS: Record<PayMethodCode, Record<string, Status>> = {
  "01": { // Credit Card
    "0": "success",
    "1": "reversed", // Void
    "2": "reversed", // Refund
    "8": "failed",
    "9": "pending",  // Initialization
  },
  "02": { // Virtual Account
    "0": "success", // Paid
    "1": "reversed", // Reversal
    "3": "pending",  // Unpaid
    "4": "expired",
  },
  "03": { // CVS
    "0": "success", // Paid
    "3": "pending",  // Unpaid
    "4": "expired",
    "5": "pending",  // Ready to Commit (Alfamart)
  },
  "04": { // Direct Debit
    "0": "success",
    "1": "reversed", // Void / Refund
    "3": "pending",  // Unpaid
    "9": "pending",  // Initialization
  },
  "05": { // E-Wallet
    "0": "success", // Paid
    "1": "reversed", // Void
    "2": "reversed", // Refund
    "3": "pending",  // Unpaid
    "4": "pending",  // Processing
    "5": "expired",
    "8": "failed",
    "9": "pending",  // Initiated
  },
  "06": { // Paylater
    "0": "success", // Paid
    "1": "reversed", // Void
    "2": "reversed", // Refund
    "3": "pending",  // Unpaid
    "8": "failed",
    "9": "pending",  // Init
  },
  "08": { // QRIS
    "0": "success",
    "2": "reversed", // Refund
    "3": "pending",  // Unpaid
    "4": "pending",  // Processing
    "5": "expired",
    "6": "failed",   // Payment Failed
  },
};