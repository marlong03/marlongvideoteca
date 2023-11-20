import axiosInstance from "../axios";

const API_URL = "http://165.227.177.75/historialUser/";

/**
 * Función para agregar un nuevo historial de usuario.
 * @param {formdata} newHistorial 
 * @returns data enviada desde el backend
 */
export const RegisterHistorialUser = async (newHistorial) => {
    const response = await axiosInstance.post(API_URL, newHistorial);
    if (response.status === 200) {
      return await response.data;
    }
  };
/**
 * Función para entontrar todos los historiales de usuarios.
 * @returns data enviada desde el backend-
 */
export const ListHistorial = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    if (response.status === 200) {
      return await response.data;
    }
  };

export const ListHistorial4Comments = async () => {
    const response = await axiosInstance.get(`${API_URL}list_4_comments/`);
    if (response.status === 200) {
      return await response.data;
    }
  };
  
/**
 * Función para obtener un historial en específico.
 * @param {pk} histID 
 * @returns data enviada desde el backend
 */
export const getHistorial = async (histID) => {
    const response = await axiosInstance.get(`${API_URL}${histID}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
/**
 * Función para listar el historial de un usuario en específico.
 * @param {fk} idUser 
 * @returns data enviada desde el backend
 */
export const ListHistorialUser = async (idUser) => {
    const response = await axiosInstance.post(`${API_URL}list_by_user/`,idUser);
    if (response.status === 200) {
      return await response.data;
    }
  };

/**
 * Función para actualizar un historial de usuario.
 * @param {pk} id 
 * @param {formdata} updateHU 
 * @returns data enviada desde el backend
 */
export const updateHistorialUser = async(id,updateHU) =>{
    const response = await axiosInstance.patch(API_URL+id+"/",updateHU);
    if (response.status === 200) {
        return response.data;
    }
}