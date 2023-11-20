import axiosInstance from "../axios";

const API_URL = "http://165.227.177.75/series/";

/**
 * Función para consultar todas las series registradas en la base de datos.
 * @returns Data enviada desde el backend
 */
export const ListSeries = async () => {
  const response = await axiosInstance.get(API_URL);
  if (response.status === 200) {
    return await response.data;
  }
};

export const RegisterSerie = async (newSerie) => {
  const response = await axiosInstance.post(API_URL, newSerie);
  if (response.status === 200) {
    return await response.data;
  }
};

export const getSerie = async (serieID) => {
  const response = await axiosInstance.get(`${API_URL}${serieID}`);
  if (response.status === 200) {
    return await response.data;
  }
};

export const updateSerie = async(id,updSerie) =>{
  const response = await axiosInstance.patch(API_URL+id+"/",updSerie);
  if (response.status === 200) {
      return response.data;
  }
}