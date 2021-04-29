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

let url = "https://api.thewholesalegroup.com/v1/inventory/";
let getByIdURL = "https://api.thewholesalegroup.com/v1/inventory/?id=";
let getBySellerIdURL = "https://api.thewholesalegroup.com/v1/inventory/?sellerId=";
let getByBuyerIdURL = "https://api.thewholesalegroup.com/v1/inventory/?buyerId=";
let inventoryURL = "https://api.thewholesalegroup.com/v1/inventory/edit/";
let manifestURL = "https://api.thewholesalegroup.com/v1/inventory/manifest/";
let imageURL = "https://api.thewholesalegroup.com/v1/inventory/image/";

let inventoryV2GetURL = "https://api.thewholesalegroup.com/v2/inventory/";
let inventoryV2GetByIdURL = "https://api.thewholesalegroup.com/v2/inventory/?id=";
let inventoryV2GetBySellerIdURL = "https://api.thewholesalegroup.com/v2/inventory/?sellerId=";
let inventoryV2GetByBuyerIdURL = "https://api.thewholesalegroup.com/v2/inventory/?buyerId=";
let inventoryV2URL = "https://api.thewholesalegroup.com/v2/inventory/edit/";
let inventoryV2FilesURL = "https://api.thewholesalegroup.com/v2/inventory/files/";

if (development) {
    inventoryURL = "https://api.thewholesalegroup.com/test/v1/inventory/edit/";
    manifestURL = "https://api.thewholesalegroup.com/test/v1/inventory/manifest/";
    url = "https://api.thewholesalegroup.com/test/v1/inventory/";
    getByIdURL = "https://api.thewholesalegroup.com/test/v1/inventory/?id=";
    getBySellerIdURL =
        "https://api.thewholesalegroup.com/test/v1/inventory/?sellerId=";
    getByBuyerIdURL =
        "https://api.thewholesalegroup.com/test/v1/inventory/?buyerId=";
    imageURL = "https://api.thewholesalegroup.com/test/v1/inventory/image/";


    inventoryV2GetURL = "https://api.thewholesalegroup.com/test/v2/inventory/";
    inventoryV2GetByIdURL = "https://api.thewholesalegroup.com/test/v2/inventory/?id=";
    inventoryV2GetBySellerIdURL = "https://api.thewholesalegroup.com/test/v2/inventory/?sellerId=";
    inventoryV2GetByBuyerIdURL = "https://api.thewholesalegroup.com/test/v2/inventory/?buyerId=";
    inventoryV2URL = "https://api.thewholesalegroup.com/test/v2/inventory/edit/";
    inventoryV2FilesURL = "https://api.thewholesalegroup.com/test/v2/inventory/files/";
}

export {
    inventoryURL,
    manifestURL,
    url,
    getByIdURL,
    getBySellerIdURL,
    getByBuyerIdURL,
    imageURL,

    inventoryV2GetURL,
    inventoryV2GetByIdURL,
    inventoryV2GetBySellerIdURL,
    inventoryV2GetByBuyerIdURL,
    inventoryV2URL,
    inventoryV2FilesURL,
};
