import api from '../../client/axios';

export interface GenerateOtpRequest {
  phoneNo: string;
}

export interface GenerateOtpResponse {
  status: number;
  data: any;
  error: any;
}

// NEW
export interface VerifyOtpRequest {
  phoneNo: string;
  otp: string;
  fullName: string;
}

// NEW
export interface VerifyOtpResponse {
  status: number;
  data: {
    accessToken: string;
    tokenType: string;
    userName: string;
    mobile: string;
    role: string;
    userId: string;
    restaurantId: string | null;
    permissions: string[];
  };
  error: any;
}

const authService = {

  generateOtp: (request: GenerateOtpRequest) =>
    api.post<GenerateOtpResponse>(
      '/api/auth/generate-otp',
      request,
    ),

  // NEW
  verifyOtp: (request: VerifyOtpRequest) =>
    api.post<VerifyOtpResponse>(
      '/api/auth/verify-otp',
      request,
    ),
};

export default authService;