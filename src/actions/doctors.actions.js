import axiosClient from '../api-client';
export const sendApprovalEmail = async (userData) => {
  try {
    const { data } = await axiosClient.post('/api/admin/sendEmail', userData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
