import fileUploadService from '../services/fileUpload/fileUploadService';

const FileUploadRepository = {
  uploadImage: async (
    uri: string,
    fileName: string,
    mimeType: string,
    folder: string,
  ) => {
    return fileUploadService.uploadImage(
      uri,
      fileName,
      mimeType,
      folder,
    );
  },
};

export default FileUploadRepository;