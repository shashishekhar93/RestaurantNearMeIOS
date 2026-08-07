import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

import {SessionData} from '../api/services/auth/authService'; // Adjust path if required

const KEYCHAIN_SERVICE = 'restaurants_near_me';

const KEY_USER_ID = 'user_id';
const KEY_USER_NAME = 'user_name';
const KEY_MOBILE = 'mobile';
const KEY_ROLE = 'role';
const KEY_RESTAURANT_ID = 'restaurant_id';
const KEY_TOKEN_TYPE = 'token_type';
const KEY_PERMISSIONS = 'permissions';

export const SessionManager = {

  // ---------------------------------------------------------
  // Save Session
  // ---------------------------------------------------------

  async saveSession(data: SessionData): Promise<void> {

    // Store Access Token securely in Keychain
    await Keychain.setGenericPassword(
      KEYCHAIN_SERVICE,
      data.accessToken,
    );

    // Store remaining data in AsyncStorage
    await AsyncStorage.setItem(
      KEY_USER_ID,
      data.userId,
    );

    await AsyncStorage.setItem(
      KEY_USER_NAME,
      data.userName,
    );

    await AsyncStorage.setItem(
      KEY_MOBILE,
      data.mobile,
    );

    await AsyncStorage.setItem(
      KEY_ROLE,
      data.role,
    );

    await AsyncStorage.setItem(
      KEY_TOKEN_TYPE,
      data.tokenType,
    );

    await AsyncStorage.setItem(
      KEY_RESTAURANT_ID,
      data.restaurantId ?? '',
    );

    await AsyncStorage.setItem(
      KEY_PERMISSIONS,
      JSON.stringify(data.permissions),
    );
  },

  // ---------------------------------------------------------
  // Access Token
  // ---------------------------------------------------------

  async getAccessToken(): Promise<string | null> {

    const credential = await Keychain.getGenericPassword();

    if (!credential) {
        return null;
    }
    console.log("1. Inside getAccessToken");

    console.log("2. Keychain =", Keychain);

    console.log("3. getGenericPassword =", Keychain.getGenericPassword);

    console.log("4. credential =", credential);
    return credential.password;
},

  // ---------------------------------------------------------
  // User Id
  // ---------------------------------------------------------

  async getUserId(): Promise<string | null> {

    return await AsyncStorage.getItem(
      KEY_USER_ID,
    );
  },

  // ---------------------------------------------------------
  // User Name
  // ---------------------------------------------------------

  async getUserName(): Promise<string | null> {

    return await AsyncStorage.getItem(
      KEY_USER_NAME,
    );
  },

  // ---------------------------------------------------------
  // Mobile
  // ---------------------------------------------------------

  async getMobile(): Promise<string | null> {

    return await AsyncStorage.getItem(
      KEY_MOBILE,
    );
  },

  // ---------------------------------------------------------
  // Role
  // ---------------------------------------------------------

  async getRole(): Promise<string | null> {

    return await AsyncStorage.getItem(
      KEY_ROLE,
    );
  },

  // ---------------------------------------------------------
  // Token Type
  // ---------------------------------------------------------

  async getTokenType(): Promise<string | null> {

    return await AsyncStorage.getItem(
      KEY_TOKEN_TYPE,
    );
  },

  // ---------------------------------------------------------
  // Restaurant Id
  // ---------------------------------------------------------

  async getRestaurantId(): Promise<string | null> {

    return await AsyncStorage.getItem(
      KEY_RESTAURANT_ID,
    );
  },

  // ---------------------------------------------------------
  // Permissions
  // ---------------------------------------------------------

  async getPermissions(): Promise<string[]> {

    const permissions =
      await AsyncStorage.getItem(
        KEY_PERMISSIONS,
      );

    return permissions
      ? JSON.parse(permissions)
      : [];
  },

  // ---------------------------------------------------------
  // Login Status
  // ---------------------------------------------------------

  async isLoggedIn(): Promise<boolean> {

    const token =
      await this.getAccessToken();

    return token !== null;
  },

  // ---------------------------------------------------------
  // Logout
  // ---------------------------------------------------------

  async logout(): Promise<void> {

    try {

      await Keychain.resetGenericPassword();

      await AsyncStorage.removeItem(
        KEY_USER_ID,
      );

      await AsyncStorage.removeItem(
        KEY_USER_NAME,
      );

      await AsyncStorage.removeItem(
        KEY_MOBILE,
      );

      await AsyncStorage.removeItem(
        KEY_ROLE,
      );

      await AsyncStorage.removeItem(
        KEY_TOKEN_TYPE,
      );

      await AsyncStorage.removeItem(
        KEY_RESTAURANT_ID,
      );

      await AsyncStorage.removeItem(
        KEY_PERMISSIONS,
      );

    } catch (e) {

      console.log(
        'Logout Error:',
        e,
      );
    }
  },
};


// import * as Keychain from 'react-native-keychain';

// const KEY = 'restaurants_user';

// export const SessionManager = {

//   async saveUser(data: any) {

//     await Keychain.setGenericPassword(
//       KEY,
//       JSON.stringify(data),
//     );
//   },

//   async getUser() {

//     const credentials =
//       await Keychain.getGenericPassword();

//     if (!credentials) {
//       return null;
//     }

//     return JSON.parse(credentials.password);
//   },

//   async getToken() {
//     try {
//         const user = await this.getUser();
//         return user?.accessToken ?? null;
//     } catch {
//         return null;
//         }
//     },

//   async logout() {
//     try {
//         await Keychain.resetGenericPassword();
//     } catch (e) {
//         console.log('Logout Error', e);
//     }

// }

// };