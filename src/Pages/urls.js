export const url = "https://api.thewholesalegroup.com/v1/inventory/";

export const getByIdURL = "https://api.thewholesalegroup.com/v1/inventory/?id=";
export const getByUserIdURL = "https://api.thewholesalegroup.com/v1/inventory/?userId=";
export const getByLoadIdURL = "https://api.thewholesalegroup.com/v1/inventory/?loadId=";

export const tokenVerifyURL = "https://api.thewholesalegroup.com/v1/account/token/verify/";
export const tokenRefreshURL = "https://api.thewholesalegroup.com/v1/account/token/refresh/";
export const emailVerificationURL = "https://api.thewholesalegroup.com/v1/account/register/verify/";

export const loginURL = "https://api.thewholesalegroup.com/v1/account/login/";
export const logoutURL = "https://api.thewholesalegroup.com/v1/account/logout/";
export const registerURL = "https://api.thewholesalegroup.com/v1/account/register/";

export const userURL = "https://api.thewholesalegroup.com/v1/account/user/";
export const userUpdateURL = "https://api.thewholesalegroup.com/v1/account/user/update/"
export const passwordChangeURL = "https://api.thewholesalegroup.com/v1/account/password/change/";

export const resetPasswordEmailURL = "https://api.thewholesalegroup.com/v1/account/password/reset/email/";
export const resetPasswordURL = "https://api.thewholesalegroup.com/v1/account/password/reset/";

export const superuserURL = "https://api.thewholesalegroup.com/v1/superuser/users/"

export const development = true 

if (development) {
    const inventoryURL = "https://api.thewholesalegroup.com/test/v1/inventory/edit/";
    const manifestURL = "https://api.thewholesalegroup.com/test/v1/inventory/manifest/";
} else {
    const inventoryURL = "https://api.thewholesalegroup.com/v1/inventory/edit/";
    const manifestURL = "https://api.thewholesalegroup.com/v1/inventory/manifest/";
}

export const {inventoryURL, manifestURL}