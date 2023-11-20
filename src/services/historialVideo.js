import axiosInstance from "../axios";

const API_URL = "http://165.227.177.75/historialVideo/";

/**
 * Función para registrar un historial de video.
 * @param {dataform} newHistorial
 * @returns data enviada desde el backend.
 */
export const RegisterHistorialVideo = async (newHistorial) => {
    const response = await axiosInstance.post(API_URL, newHistorial);
    if (response.status === 200) {
      console.log(response.data);
      return await response.data;
    }
  };
/**
 * Función para consultar todos los historiales.
 * @returns data enviada desde el backend.
 */
export const ListHistorial = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
/**
 * Función para obtener un historial en específico.
 * @param {pk} histID 
 * @returns data enviada desde el backend.
 */
export const getHistorial = async (histID) => {
    const response = await axiosInstance.get(`${API_URL}${histID}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
/**
 * Función para obtener el historial de un video en específico.
 * @param {fk} idVideo 
 * @returns data enviada desde el backend.
 */
export const ListHistorialVideo = async (idVideo) => {
    const response = await axiosInstance.post(`${API_URL}list_by_video/`,idVideo);
    if (response.status === 200) {
      return await response.data;
    }
  };

/**
 * Función para actualizar un historial de video.
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