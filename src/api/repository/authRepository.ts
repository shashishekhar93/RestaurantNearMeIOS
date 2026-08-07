import authService from '../services/auth/authService';

const authRepository = {

    generateOtp: async (phoneNo: string) => {
        const response = await authService.generateOtp({ phoneNo });
        return response.data;
    },

    verifyOtp: async (
        phoneNo: string,
        otp: string,
        fullName: string = '',
    ) => {
        const response = await authService.verifyOtp({
            phoneNo,
            otp,
            fullName,
        });

        return response.data;
    },

};

export default authRepository;