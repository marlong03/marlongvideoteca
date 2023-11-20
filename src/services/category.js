import axiosInstance from "../axios";

const API_URL = "http://165.227.177.75/categorias/";

/**
 * Función para consultar todas las categorias registradas en la base de datos.
 * @returns Data enviada desde el backend
 */
export const ListCategorias = async () => {
  const response = await axiosInstance.get(API_URL);
  if (response.status === 200) {
    return await response.data;
  }
};

export const RegisterCategory = async (newCategory) => {
  const response = await axiosInstance.post(API_URL, newCategory);
  if (response.status === 200) {
    return await response.data;
  }
};

export const getCategory = async (categoryID) => {
  const response = await axiosInstance.get(`${API_URL}${categoryID}`);
  if (response.status === 200) {
    return await response.data;
  }
};

export const updateCategory = async(id,updCategory) =>{
  const response = await axiosInstance.patch(API_URL+id+"/",updCategory);
  if (response.status === 200) {
      return response.data;
  }
}