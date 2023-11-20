import axiosInstance from "../axios";

const API_URL = "http://165.227.177.75/ubicaciones/";

/**
 * Función para registrar una ubicación.
 * @param {formData} newUbicacion
 * @returns La data enviada desde el backend.
 */
export const RegisterUbicacion = async (newUbicacion) => {
    const response = await axiosInstance.post(API_URL, newUbicacion);
    if (response.status === 200) {
      return await response.data;
    }
  };
/**
 * Función para consultar todas las ubicaciones
 * @returns La data enviada desde el backend.
 */
export const ListUbicacion = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
/**
 * Función para consultar todas las ubicaciones de un historial de usuario en específico.
 * @param {fk} histUser_id 
 * @returns data enviada desde el backend.
 */
export const ListUbicacionHist = async (histUser_id) => {
    const response = await axiosInstance.post(`${API_URL}list_by_historial/`,histUser_id);
    if (response.status === 200) {
      return await response.data;
    }
  };

/**
 * Función para actulizar una ubicación.
 * @param {pk} id
 * @param {formData} updateUbicacion 
 * @returns La data enviada desde el backend.
 */
export const updateUbicacion = async(id,updateUbicacion) =>{
    const response = await axiosInstance.patch(API_URL+id+"/",updateUbicacion);
    if (response.status === 200) {
        return response.data;
    }
}