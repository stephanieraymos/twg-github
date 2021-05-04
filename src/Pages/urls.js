export const development = true;

let inventoryV2GetURL = "https://api.thewholesalegroup.com/v2/inventory/";
let inventoryV2GetByIdURL =
  "https://api.thewholesalegroup.com/v2/inventory/?id=";
let inventoryV2GetBySellerIdURL =
  "https://api.thewholesalegroup.com/v2/inventory/?sellerId=";
let inventoryV2GetByBuyerIdURL =
  "https://api.thewholesalegroup.com/v2/inventory/?buyerId=";
let inventoryV2URL = "https://api.thewholesalegroup.com/v2/inventory/edit/";
let inventoryV2FilesURL =
  "https://api.thewholesalegroup.com/v2/inventory/files/";

let tokenVerifyURL =
  "https://api.thewholesalegroup.com/v1/account/token/verify/";
let tokenRefreshURL =
  "https://api.thewholesalegroup.com/v1/account/token/refresh/";
let emailVerificationURL =
  "https://api.thewholesalegroup.com/v1/account/register/verify/";

let loginURL = "https://api.thewholesalegroup.com/v1/account/login/";
let logoutURL = "https://api.thewholesalegroup.com/v1/account/logout/";
let registerURL = "https://api.thewholesalegroup.com/v1/account/register/";

let userURL = "https://api.thewholesalegroup.com/v1/account/user/";
let userUpdateURL = "https://api.thewholesalegroup.com/v1/account/user/update/";
let passwordChangeURL =
  "https://api.thewholesalegroup.com/v1/account/password/change/";

let resetPasswordEmailURL =
  "https://api.thewholesalegroup.com/v1/account/password/reset/email/";
let resetPasswordURL =
  "https://api.thewholesalegroup.com/v1/account/password/reset/";

let superuserURL = "https://api.thewholesalegroup.com/v1/superuser/users/";

if (development) {
  inventoryV2GetURL = "http://143.110.225.28/v2/inventory/";
  inventoryV2GetByIdURL = "http://143.110.225.28/v2/inventory/?id=";
  inventoryV2GetBySellerIdURL = "http://143.110.225.28/v2/inventory/?sellerId=";
  inventoryV2GetByBuyerIdURL = "http://143.110.225.28/v2/inventory/?buyerId=";
  inventoryV2URL = "http://143.110.225.28/v2/inventory/edit/";
  inventoryV2FilesURL = "http://143.110.225.28/v2/inventory/files/";

  tokenVerifyURL = "http://143.110.225.28/account/token/verify/";
  tokenRefreshURL = "http://143.110.225.28/account/token/refresh/";
  emailVerificationURL = "http://143.110.225.28/account/register/verify/";

  loginURL = "http://143.110.225.28/account/login/";
  logoutURL = "http://143.110.225.28/account/logout/";
  registerURL = "http://143.110.225.28/account/register/";

  userURL = "http://143.110.225.28/account/user/";
  userUpdateURL = "http://143.110.225.28/account/user/update/";
  passwordChangeURL = "http://143.110.225.28/account/password/change/";

  resetPasswordEmailURL = "http://143.110.225.28/account/password/reset/email/";
  resetPasswordURL = "http://143.110.225.28/account/password/reset/";

  superuserURL = "http://143.110.225.28/superuser/users/";
}

export {
  inventoryV2GetURL,
  inventoryV2GetByIdURL,
  inventoryV2GetBySellerIdURL,
  inventoryV2GetByBuyerIdURL,
  inventoryV2URL,
  inventoryV2FilesURL,
  tokenVerifyURL,
  tokenRefreshURL,
  emailVerificationURL,
  loginURL,
  logoutURL,
  registerURL,
  userURL,
  userUpdateURL,
  passwordChangeURL,
  resetPasswordEmailURL,
  resetPasswordURL,
  superuserURL,
};
