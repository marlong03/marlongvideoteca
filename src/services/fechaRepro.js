import axiosInstance from "../axios";

const API_URL = "http://165.227.177.75/fechaReprods/";

/**
 * Función para registrar una nueva fecha de reproducción, este tiene relación con el historial de video e historial de usuario.
 * @param {formdata} newFecha 
 * @returns data enviada desde el backend.
 */
export const RegisterFechaRepro = async (newFecha) => {
    const response = await axiosInstance.post(API_URL, newFecha);
    if (response.status === 200) {
      return await response.data;
    }
  };
/**
 * Función para consultar todas las fechas de reproduccion.
 * @returns data enviada desde el backend-
 */
export const ListFechaRepro = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
/**
 * Función para consultar una fecha de reproducción en específico.
 * @param {pk} histID primary key
 * @returns data enviada desde el backend
 */
export const getFechaRepro = async (histID) => {
    const response = await axiosInstance.get(`${API_URL}${histID}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
/**
 * Función para consultar la fecha de reproducción correspondiente a un usuario y video.
 * @param {formdata} data 
 * @returns data enviada desde el backend
 */
export const ListFechaReprox2 = async (data) => {
    const response = await axiosInstance.post(`${API_URL}list_by_user_video/`,data);
    if (response.status === 200) {
      return await response.data;
    }
  };

/**
 * Función para actualizar una fecha de reproducción.
 * @param {pk} id 
 * @param {formdata} updateHU 
 * @returns data enviada desde el backend
 */
export const updateHistorialVideo = async(id,updateHU) =>{
    const response = await axiosInstance.patch(API_URL+id+"/",updateHU);
    if (response.status === 200) {
        return response.data;
    }
}