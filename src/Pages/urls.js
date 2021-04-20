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
let getByUserIdURL = "https://api.thewholesalegroup.com/v1/inventory/?userId=";
let getByLoadIdURL = "https://api.thewholesalegroup.com/v1/inventory/?loadId=";
let inventoryURL = "https://api.thewholesalegroup.com/v1/inventory/edit/";
let manifestURL = "https://api.thewholesalegroup.com/v1/inventory/manifest/";
let imageURL = "https://api.thewholesalegroup.com/v1/inventory/image/";

if (development) {
    inventoryURL = "https://api.thewholesalegroup.com/test/v1/inventory/edit/";
    manifestURL = "https://api.thewholesalegroup.com/test/v1/inventory/manifest/";
    url = "https://api.thewholesalegroup.com/test/v1/inventory/";
    getByIdURL = "https://api.thewholesalegroup.com/test/v1/inventory/?id=";
    getByUserIdURL =
        "https://api.thewholesalegroup.com/test/v1/inventory/?userId=";
    getByLoadIdURL =
        "https://api.thewholesalegroup.com/test/v1/inventory/?loadId=";
    imageURL = "https://api.thewholesalegroup.com/test/v1/inventory/image/";
}

export {
    inventoryURL,
    manifestURL,
    url,
    getByIdURL,
    getByUserIdURL,
    getByLoadIdURL,
    imageURL,
};
