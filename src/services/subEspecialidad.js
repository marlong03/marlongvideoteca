import axiosInstance from "../axios";

const API_URL = "http://165.227.177.75/subespecialidades/";

/**
 * Función para consultar todas las categorias registradas en la base de datos.
 * @returns Data enviada desde el backend
 */
export const ListSubEspecialidades = async () => {
  const response = await axiosInstance.get(API_URL);
  if (response.status === 200) {
    return await response.data;
  }
};

export const RegisterSubEspecialidad = async (newSubEspecialidad) => {
  const response = await axiosInstance.post(API_URL, newSubEspecialidad);
  if (response.status === 200) {
    return await response.data;
  }
};

export const getSubEspecialidad = async (SubespecialidadID) => {
  const response = await axiosInstance.get(`${API_URL}${SubespecialidadID}`);
  if (response.status === 200) {
    return await response.data;
  }
};

export const updateSubEspecialidad = async(id,updSubEspecialidad) =>{
  const response = await axiosInstance.patch(API_URL+id+"/",updSubEspecialidad);
  if (response.status === 200) {
      return response.data;
  }
}