export const tokenVerifyURL =
    "https://api.thewholesalegroup.com/v1/account/token/verify/";
export const tokenRefreshURL =
    "https://api.thewholesalegroup.com/v1/account/token/refresh/";
export const emailVerificationURL =
    "https://api.thewholesalegroup.com/v1/account/register/verify/";

export const loginURL = "https://api.thewholesalegroup.com/v1/account/login/";
export const logoutURL = "https://api.thewholesalegroup.com/v1/account/logout/";
export const registerURL =
    "https://api.thewholesalegroup.com/v1/account/register/";

export const userURL = "https://api.thewholesalegroup.com/v1/account/user/";
export const userUpdateURL =
    "https://api.thewholesalegroup.com/v1/account/user/update/";
export const passwordChangeURL =
    "https://api.thewholesalegroup.com/v1/account/password/change/";

export const resetPasswordEmailURL =
    "https://api.thewholesalegroup.com/v1/account/password/reset/email/";
export const resetPasswordURL =
    "https://api.thewholesalegroup.com/v1/account/password/reset/";

export const superuserURL =
    "https://api.thewholesalegroup.com/v1/superuser/users/";

export const development = true;

let inventoryV2GetURL = "https://api.thewholesalegroup.com/v2/inventory/";
let inventoryV2GetByIdURL = "https://api.thewholesalegroup.com/v2/inventory/?id=";
let inventoryV2GetBySellerIdURL = "https://api.thewholesalegroup.com/v2/inventory/?sellerId=";
let inventoryV2GetByBuyerIdURL = "https://api.thewholesalegroup.com/v2/inventory/?buyerId=";
let inventoryV2URL = "https://api.thewholesalegroup.com/v2/inventory/edit/";
let inventoryV2FilesURL = "https://api.thewholesalegroup.com/v2/inventory/files/";

if (development) {
    inventoryV2GetURL = "http://143.110.225.28/v2/inventory/";
    inventoryV2GetByIdURL = "http://143.110.225.28/v2/inventory/?id=";
    inventoryV2GetBySellerIdURL = "http://143.110.225.28/v2/inventory/?sellerId=";
    inventoryV2GetByBuyerIdURL = "http://143.110.225.28/v2/inventory/?buyerId=";
    inventoryV2URL = "http://143.110.225.28/v2/inventory/edit/";
    inventoryV2FilesURL = "http://143.110.225.28/v2/inventory/files/";
}

export {
    inventoryV2GetURL,
    inventoryV2GetByIdURL,
    inventoryV2GetBySellerIdURL,
    inventoryV2GetByBuyerIdURL,
    inventoryV2URL,
    inventoryV2FilesURL,
};
