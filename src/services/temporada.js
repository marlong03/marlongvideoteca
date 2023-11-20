import axiosInstance from "../axios";

const API_URL = "http://165.227.177.75/temporadas/";

/**
 * Función para consultar todas las temporadas registradas en la base de datos.
 * @returns Data enviada desde el backend
 */
export const ListTemporadas = async () => {
  const response = await axiosInstance.get(API_URL);
  if (response.status === 200) {
    return await response.data;
  }
};

export const RegisterTemporada = async (newTemporada) => {
  const response = await axiosInstance.post(API_URL, newTemporada);
  if (response.status === 200) {
    return await response.data;
  }
};

export const getTemporada = async (temporadaID) => {
  const response = await axiosInstance.get(`${API_URL}${temporadaID}`);
  if (response.status === 200) {
    return await response.data;
  }
};

export const updateTemporada = async(id,updTemporada) =>{
  const response = await axiosInstance.patch(API_URL+id+"/",updTemporada);
  if (response.status === 200) {
      return response.data;
  }
}