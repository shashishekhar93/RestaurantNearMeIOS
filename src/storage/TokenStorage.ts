import * as Keychain from 'react-native-keychain';
export const TokenStorage = {
    async saveAuthToken(authToken:string){
        await Keychain.setGenericPassword(
            'authToken',authToken,{
                service : 'authToken'
            },
        );
    },

    async getAuthToken(){
        const credential = await Keychain.getGenericPassword({
            service : 'authToken',
        });
        return credential ? credential.password:null;
    },

    async clearAuthToken(){
        await Keychain.resetGenericPassword({
            service:'authToken',
        });
    },
};