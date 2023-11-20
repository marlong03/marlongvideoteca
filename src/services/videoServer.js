import axiosInstance from "../axios";

const API_URL = "http://165.227.177.75/videos/";

/**
 * Función para consultar con el backend la lista de todos los videos sin filtrar.
 * @returns La data enviada desde el backend. 
 */
export const ListVideos = async () => {
  const response = await axiosInstance.get(`${API_URL}`);
  if (response.status === 200) {
    return await response.data;
  }
};
/**
 * Función para consultar con el backend la lista de videos con el tipo Peliculas.
 * @returns La data enviada desde el backend. 
 */
export const ListPeliculas = async () => {
  const response = await axiosInstance.get(`${API_URL}listPeliculas/`);
  if (response.status === 200) {
    return await response.data;
  }
}
/**
 * Función para consultar con el backend la lista de videos con el tipo Series.
 * @returns La data enviada desde el backend. 
 */
export const ListSeries = async () => {
  const response = await axiosInstance.get(`${API_URL}listSeries/`);
  if (response.status === 200) {
    return await response.data;
  }
}
/**
 * Función para consultar con el backend la lista de videos con el tipo Casos.
 * @returns La data enviada desde el backend. 
 */
export const ListCasos = async () => {
  const response = await axiosInstance.get(`${API_URL}listCasos/`);
  if (response.status === 200) {
    return await response.data;
  }
}
/**
 * Función para consultar con el backend un video con el id específico.
 * @returns La data enviada desde el backend. 
 */
export const getVideo = async (videoID) => {
  const response = await axiosInstance.get(`${API_URL}${videoID}`);
  if (response.status === 200) {
    return await response.data;
  }
};
/**
 * Función para consultar con el backend un video con el id específico. Esta función se usa para tener los datos del video en el formulario de update.
 * @returns La data enviada desde el backend. 
 */
export const getVideoDT = async (videoID) => {
  const response = await axiosInstance.get(API_URL + "retrieve/" + videoID);
  if (response.status === 200) {
    return response.data;
  }
};
/**
 * Función Post para enviar los datos del formulario de registro de un nuevo video.
 * @returns La data enviada desde el backend. 
 */
export const RegisterVideo = async (newVideo) => {
  const response = await axiosInstance.post(API_URL, newVideo);
  if (response.status === 200) {
    return await response.data;
  }
  else if(response.status === 409) {
    return await response.data;
  }
};
/**
 * Función para actualizar un video.
 * @returns La data enviada desde el backend. 
 */
export const UpdateVideo = async (videoID, updateVideo) => {
  const response = await axiosInstance.put(
    API_URL + videoID + "/",
    updateVideo
  );
  console.log(response);
  if (response.status === 200) {
    return await response.data;
  }
};

export const partialUpdateVideo = async(id,PupdateVideo) =>{
  const response = await axiosInstance.patch(API_URL+id+"/",PupdateVideo);
  if (response.status === 200) {
      return response.data;
  }
}
/**
 * Función para eliminar un video.
 * @returns La data enviada desde el backend. 
 */
export const DeleteVideo = async (videoID) => {
  return await axiosInstance.delete(`${API_URL}${videoID}`);

};
