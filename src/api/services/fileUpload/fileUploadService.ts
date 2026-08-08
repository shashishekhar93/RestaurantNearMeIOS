import axios from 'axios';

import {SessionManager} from '../../../utils/SessionManager';

export interface UploadImageResponse {
  file: string | null;
  message: string | null;
}

const empedanceApi = axios.create({
  baseURL: 'https://empedance.com',
  timeout: 30000,
});

const fileUploadService = {
  uploadImage: async (
    uri: string,
    fileName: string,
    mimeType: string,
    folder: string,
  ): Promise<UploadImageResponse> => {
    const token =
      await SessionManager.getAccessToken();

    const formData = new FormData();

    formData.append('file', {
      uri,
      name: fileName,
      type: mimeType,
    } as any);

    formData.append(
      'folder',
      folder,
    );

    const response =
      await empedanceApi.post<UploadImageResponse>(
        '/api/file-upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

    return response.data;
  },
};

export default fileUploadService;