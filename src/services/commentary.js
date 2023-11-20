import axiosInstance from "../axios";

const API_URL = "http://165.227.177.75/commentaries/";

/**
 * Función para agregar un nuevo comentario a un video.
 * @param {formdata} newCommentary 
 * @returns data enviada desde el backend
 */
export const RegisterCommentary = async (newCommentary) => {
    const response = await axiosInstance.post(API_URL, newCommentary);
    if (response.status === 200) {
      return await response.data;
    }
  };
/**
 * Función para entontrar todos los comentarios realizados.
 * @returns data enviada desde el backend-
 */
export const ListCommentaries = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    if (response.status === 200) {
      return await response.data;
    }
  };

export const ListCommentaryVideo = async (idVideo) => {
    const response = await axiosInstance.post(`${API_URL}list_by_video/`,idVideo);
    if (response.status === 200) {
      return await response.data;
    }
    else { 
        console.log("error");
        return await response.data;
    }
  };
/**
 * Función para obtener un comentario en específico.
 * @param {pk} commentaryID 
 * @returns data enviada desde el backend
 */
export const getCommentary = async (commentaryID) => {
    const response = await axiosInstance.get(`${API_URL}${commentaryID}`);
    if (response.status === 200) {
      return await response.data;
    }
  };

/**
 * Función para actualizar un comentario .
 * @param {pk} id 
 * @param {formdata} updCommentary 
 * @returns data enviada desde el backend
 */
export const updateCommentary = async(id,updCommentary) =>{
    const response = await axiosInstance.patch(API_URL+id+"/",updCommentary);
    if (response.status === 200) {
        return response.data;
    }
}