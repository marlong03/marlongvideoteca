import axiosInstance from "../axios";

const API_URL = "http://165.227.177.75/especialidades/";

/**
 * Función para consultar todas las categorias registradas en la base de datos.
 * @returns Data enviada desde el backend
 */
export const ListEspecialidades = async () => {
  const response = await axiosInstance.get(API_URL);
  if (response.status === 200) {
    return await response.data;
  }
};

export const RegisterEspecialidad = async (newEspecialidad) => {
  const response = await axiosInstance.post(API_URL, newEspecialidad);
  if (response.status === 200) {
    return await response.data;
  }
};

export const getEspecialidad = async (especialidadID) => {
  const response = await axiosInstance.get(`${API_URL}${especialidadID}`);
  if (response.status === 200) {
    return await response.data;
  }
};

export const updateEspecialidad = async(id,updEspecialidad) =>{
  const response = await axiosInstance.patch(API_URL+id+"/",updEspecialidad);
  if (response.status === 200) {
      return response.data;
  }
}