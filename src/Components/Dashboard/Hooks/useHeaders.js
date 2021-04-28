export const useAvailableHeaders = [
  { id: "loadId", numeric: false, label: "Load ID", type: "normal" },
  { id: "created", numeric: false, label: "Created", type: "date" },
  { id: "source", numeric: false, label: "Program", type: "normal" },
  { id: "category", numeric: false, label: "Category", type: "normal" },
  { id: "units", numeric: true, label: "Units", type: "normal" },
  {
    id: "palletCount",
    numeric: true,
    label: "Pallets",
    type: "normal",
  },
  { id: "fob", numeric: false, label: "FOB", type: "normal" },
  {
    id: "retailPrice",
    numeric: true,
    label: "Retail (USD)",
    type: "money",
  },
  { id: "price", numeric: true, label: "Price (USD)", type: "money" },
];

export const useSoldHeaders = [
  { id: "loadId", numeric: false, label: "Load ID", type: "normal" },
  { id: "sold", numeric: false, label: "Sold", type: "date" },
  { id: "source", numeric: false, label: "Program", type: "normal" },
  { id: "category", numeric: false, label: "Category", type: "normal" },
  { id: "units", numeric: true, label: "Units", type: "normal" },
  {
    id: "palletCount",
    numeric: true,
    label: "Pallets",
    type: "normal",
  },
  { id: "fob", numeric: false, label: "FOB", type: "normal" },
  {
    id: "retailPrice",
    numeric: true,
    label: "Retail (USD)",
    type: "money",
  },
  { id: "price", numeric: true, label: "Price (USD)", type: "money" },
  {
    id: "paid",
    numeric: true,
    label: "Payment Status",
    type: "normal",
  },
];

export const useSales24HoursHeaders = [
  { id: "loadId", numeric: false, label: "Load ID", type: "normal" },
  { id: "sold", numeric: false, label: "Sold", type: "date" },
  { id: "source", numeric: false, label: "Program", type: "normal" },
  { id: "category", numeric: false, label: "Category", type: "normal" },
  { id: "units", numeric: true, label: "Units", type: "normal" },
  {
    id: "palletCount",
    numeric: true,
    label: "Pallets",
    type: "normal",
  },
  { id: "fob", numeric: false, label: "FOB", type: "normal" },
  {
    id: "retailPrice",
    numeric: true,
    label: "Retail (USD)",
    type: "money",
  },
  { id: "price", numeric: true, label: "Price (USD)", type: "money" },
  {
    id: "paid",
    numeric: true,
    label: "Payment Status",
    type: "normal",
  },
];

export const useAllInventoryHeaders = [
  { id: "loadId", numeric: false, label: "Load ID", type: "normal" },
  { id: "created", numeric: false, label: "Created", type: "date" },
  { id: "source", numeric: false, label: "Program", type: "normal" },
  { id: "category", numeric: false, label: "Category", type: "normal" },
  { id: "units", numeric: true, label: "Units", type: "normal" },
  {
    id: "palletCount",
    numeric: true,
    label: "Pallets",
    type: "normal",
  },
  { id: "fob", numeric: false, label: "FOB", type: "normal" },
  {
    id: "retailPrice",
    numeric: true,
    label: "Retail (USD)",
    type: "money",
  },
  { id: "price", numeric: true, label: "Price (USD)", type: "money" },
  {
    id: "shippingStatus",
    numeric: true,
    label: "Shipping Status",
    type: "normal",
  },
];

export const useUnpaidHeaders = [
  { id: "loadId", numeric: false, label: "Load ID", type: "normal" },
  { id: "sold", numeric: false, label: "Purchased", type: "date" },
  { id: "source", numeric: false, label: "Program", type: "normal" },
  { id: "category", numeric: false, label: "Category", type: "normal" },
  { id: "units", numeric: true, label: "Units", type: "normal" },
  { id: "palletCount", numeric: true, label: "Pallets", type: "normal" },
  { id: "fob", numeric: false, label: "DOB", type: "normal" },
  { id: "retailPrice", numeric: true, label: "Retail (USD)", type: "money" },
  { id: "price", numeric: true, label: "Price (USD)", type: "money" },
];

export const usePurchasedHeaders = [
  { id: "loadId", numeric: false, label: "Load ID", type: "normal" },
  { id: "sold", numeric: false, label: "Purchased", type: "date" },
  { id: "source", numeric: false, label: "Program", type: "normal" },
  { id: "category", numeric: false, label: "Category", type: "normal" },
  { id: "units", numeric: true, label: "Units", type: "normal" },
  {
    id: "palletCount",
    numeric: true,
    label: "Pallets",
    type: "normal",
  },
  { id: "fob", numeric: false, label: "DOB", type: "normal" },
  {
    id: "retailPrice",
    numeric: true,
    label: "Retail (USD)",
    type: "money",
  },
  { id: "price", numeric: true, label: "Price (USD)", type: "money" },
  {
    id: "shippingStatus",
    numeric: true,
    label: "Shipping Status",
    type: "normal",
  },
];

export const useFinancialHeaders = [
  { id: "year", numeric: false, label: "Year", type: "normal" },
  { id: "revenue", numeric: true, label: "Revenue (USD)", type: "money" },
  {
    id: "fees",
    numeric: true,
    label: "Commissions Paid (USD)",
    type: "money",
  },
  {
    id: "profit",
    numeric: true,
    label: "Gross Profit (USD)",
    type: "money",
  },
  {
    id: "retail",
    numeric: true,
    label: "Retail Values (USD)",
    type: "money",
  },
  {
    id: "recovery",
    numeric: true,
    label: "Recovery Rate (%)",
    type: "percent",
  },
];

export const useFinancialByMonthHeaders = [
  { id: "date", numeric: false, label: "Month", type: "normal" },
  { id: "revenue", numeric: true, label: "Revenue (USD)", type: "money" },
  {
    id: "fees",
    numeric: true,
    label: "Commissions Paid (USD)",
    type: "money",
  },
  {
    id: "profit",
    numeric: true,
    label: "Gross Profit (USD)",
    type: "money",
  },
  {
    id: "retail",
    numeric: true,
    label: "Retail Values (USD)",
    type: "money",
  },
  {
    id: "recovery",
    numeric: true,
    label: "Recovery Rate (%)",
    type: "percent",
  },
];

export const useSellerInventory = [
  { id: "loadId", numeric: false, label: "Load ID", type: "normal" },
  { id: "created", numeric: false, label: "Created", type: "date" },
  { id: "source", numeric: false, label: "Program", type: "normal" },
  { id: "category", numeric: false, label: "Category", type: "normal" },
  { id: "units", numeric: true, label: "Units", type: "normal" },
  {
    id: "palletCount",
    numeric: true,
    label: "Pallets",
    type: "normal",
  },
  { id: "fob", numeric: false, label: "FOB", type: "normal" },
  {
    id: "retailPrice",
    numeric: true,
    label: "Retail (USD)",
    type: "money",
  },
  { id: "price", numeric: true, label: "Price (USD)", type: "money" },
  {
    id: "shippingStatus",
    numeric: true,
    label: "Shipping Status",
    type: "normal",
  },
];
