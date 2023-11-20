import axiosInstance from "../axios";

const API_URL = "http://165.227.177.75/gustos_by_users/";

/**
 * Función para agregar preferencias(gustos) de un usuario.
 * @param {formData} newPreferencia 
 * @returns La data enviada desde el backend.
 */
export const RegisterPreferenciaUser = async (newPreferencia) => {
    const response = await axiosInstance.post(API_URL, newPreferencia);
    if (response.status === 200) {
      return await response.data;
    }
  };
/**
 * Función para consultar todas las preferencias de usuario.
 * @returns La data enviada desde el backend.
 */
export const ListPreferencia = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
  /**
   * función para obtener una preferencia en específico.
   * @param {pk} histID 
   * @returns La data enviada desde el backend.
   */
export const getPreferencia = async (ID) => {
    const response = await axiosInstance.get(`${API_URL}${ID}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
  /**
   * función para obtener una preferencia de un usuario en específico.
   * @param {fk} idUser 
   * @returns La data enviada desde el backend.
   */
export const ListPreferenciaUser = async (idUser) => {
    const response = await axiosInstance.post(`${API_URL}list_by_user/`,idUser);
    if (response.status === 200) {
      return await response.data;
    }
  };

/**
 * función para obtener actualizar la preferencia de un usuario.
 * @param {*} id 
 * @param {*} updatePU 
 * @returns La data enviada desde el backend.
 */
export const updatePreferenciaUser = async(id,updatePU) =>{
    const response = await axiosInstance.patch(API_URL+id+"/",updatePU);
    if (response.status === 200) {
        return response.data;
    }
}