import * as Keychain from 'react-native-keychain';

const KEY = 'restaurants_user';

export const SessionManager = {

  async saveUser(data: any) {

    await Keychain.setGenericPassword(
      KEY,
      JSON.stringify(data),
    );
  },

  async getUser() {

    const credentials =
      await Keychain.getGenericPassword();

    if (!credentials) {
      return null;
    }

    return JSON.parse(credentials.password);
  },

  async getToken() {
    try {
        const user = await this.getUser();
        return user?.accessToken ?? null;
    } catch {
        return null;
        }
    },

  async logout() {
    try {
        await Keychain.resetGenericPassword();
    } catch (e) {
        console.log('Logout Error', e);
    }

}

};