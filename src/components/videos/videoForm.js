import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import Select from "react-select";
import * as VideoServer from "../../services/videoServer";
import * as CategoriaServer from "../../services/category";
import * as EspecialidadServer from "../../services/especialidad";
import * as SubEspecialidadServer from "../../services/subEspecialidad";
import * as SerieServer from "../../services/serie";
import * as TemporadaServer from "../../services/temporada";

//components
//import Select from "@mui/material/Select";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
/**
 * Función para realizar las operaciones necesarias para crear o editar un video. 
 * @returns Componente con el formulario para Agregar nuevo video o editar un video.
 */
const VideoForm = () => {
  const history = useNavigate();
  const params = useParams();

  const animatedComponents = makeAnimated();

  const initialState = {
    id: 0,
    code_esp: "",
    code_engl: "",
    title_espanol: "",
    title_english: "",
    title_cap_esp: "",
    title_cap_english: "",
    description_esp: "",
    description_english: "",
    tipe_of_video: 1,
    languages: [1],
    categorias: [1],
    especialidades: [1],
    subEspecialidades: [1],
    serie: 0,
    temporada: 0,
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [video, setVideo] = useState(initialState);
  const [categorias, setCategorias] = useState();
  const [especialidades, setEspecialidades] = useState();
  const [subEspecialidades, setSubEspecialidades] = useState();
  const [series, setSeries] = useState();
  const [temporadas, setTemporadas] = useState();
  const [isSerieSelectEnabled, setIsSerieSelectEnabled] = useState(false);
  const [isTempSelectEnabled, setIsTempSelectEnabled] = useState(false);

  const optionesTipoVideo = [
    { value: '1', label: 'Video' },
    { value: '2', label: 'Serie' },
    { value: '3', label: 'Casos' },
  ];

  const handleSelectTypeVideo = (selectedValue, fielName) => {
    setVideo({ ...video, [fielName]: selectedValue.value });
    
    if (selectedValue.value == 2){
      setIsSerieSelectEnabled(true);
    }
    else{
      setIsSerieSelectEnabled(false)
      setIsTempSelectEnabled(false)
    }
  };

  /**
   * Actualiza el estado del idioma seleccionado en el formulario.
   * @param {*} e 
   */
  const handleSelectIdioma = (e) => {
    let target = e.target;
    let name = target.name;

    let value = Array.from(target.selectedOptions, (option) => option.value);
    setVideo({ ...video, [name]: value });
  };
  /**
   * Actualiza el estado de la categoria seleccionada en el formulario.
   * @param {*} e 
   */
  const handleSelectCategoryEspSub= (selectedValues, fielName) => {
    let value = Array.from(selectedValues, (option) => option.value);
    setVideo({ ...video, [fielName]: value });
  };

  const handleSelectSerie = (selectedValue, fielName) => {    
    setVideo({ ...video, [fielName]: selectedValue.value });
    
    if (selectedValue.value == 0){
      setIsTempSelectEnabled(false);
    }
    else{
      setIsTempSelectEnabled(true)
    }
  };
  const handleSelectTem = (selectedValue, fielName) => {    
    setVideo({ ...video, [fielName]: selectedValue.value });
  }
  /**
   * Actualiza el estado de demás campos seleccionados en el formulario.
   * @param {*} e 
   */
  const handleInputChange = (e) => {
    let target = e.target;
    let name = target.name;
    if (name === "image") {
      setSelectedFile(e.target.files[0]);
    }
    else if (name === "min_image"){
      setSelectedFile2(e.target.files[0]);
    }
    else {
      setVideo({ ...video, [name]: e.target.value });
    }
  };
  /**
   * Guarda la información llenada en el formulario y la envia al backend para su registro o actualización.
   * Al finalizar si el proceso es exitoso redirecciona al index.
   * @param {*} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    let featured_image;
    let min_image;
    const formData = new FormData();

    if (selectedFile) {
      featured_image = selectedFile;
      formData.append("featured_image", featured_image);

    }
    if (selectedFile2) {
      min_image = selectedFile2;
      formData.append("min_image", min_image);
    }

    try {
      //let res;
      formData.append("code_esp", video.code_esp);
      formData.append("code_engl", video.code_engl);
      formData.append("title_espanol", video.title_espanol);
      formData.append("title_english", video.title_english);
      formData.append("title_cap_esp", video.title_cap_esp);
      formData.append("title_cap_english", video.title_cap_english);
      formData.append("description_esp", video.description_esp);
      formData.append("description_english", video.description_english);
      formData.append("tipe_of_video", video.tipe_of_video);
      formData.append("temporada", video.temporada);


      for (let i = 0; i <= video.languages.length - 1; i++) {
        formData.append("languages", video.languages[i]);
      }
      for (let i = 0; i <= video.categorias.length - 1; i++) {
        formData.append("categorias", video.categorias[i]);
      }
      for (let i = 0; i <= video.especialidades.length - 1; i++) {
        formData.append("especialidad", video.especialidades[i]);
      }
      for (let i = 0; i <= video.subEspecialidades.length - 1; i++) {
        formData.append("subEspecialidad", video.subEspecialidades[i]);
      }
      let res;
      if (!params.id) {
        res = await VideoServer.RegisterVideo(formData);
      } else {
        res = await VideoServer.UpdateVideo(params.id, formData);        
      }
      alert(res.message);
      history("/");
      window.location.reload();
    } catch (error) {
      for (const property in error.response.data) {
        alert(`${property}: ${error.response.data[property]}`);
      }      
    }
  };
  /**
   * Función para obtener el video con sus campos a editar.
   * @param {*} videoID 
   */
  const getVideo = async (videoID) => {
    try {
      const res = await VideoServer.getVideoDT(videoID);
      const data = await res;
      const {
        code_esp,
        code_engl,
        title_espanol,
        title_english,
        title_cap_esp,
        title_cap_english,
        description_esp,
        description_english,
        tipe_of_video,
        languages,
        categorias,
        especialidades,
        subEspecialidades,
        serie,
        temporada,
      } = data;

      setVideo({
        code_esp,
        code_engl,
        title_espanol,
        title_english,
        title_cap_esp,
        title_cap_english,
        description_esp,
        description_english,
        tipe_of_video,
        languages,
        categorias,
        especialidades,
        subEspecialidades
      });
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * función para obtener todas las categorias en la base de datos.
   */
  const getCategorias = async () => {
    try {
      const res = await CategoriaServer.ListCategorias();
      const data = await res;
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getEspecialidades = async () => {
    try {
      const res = await EspecialidadServer.ListEspecialidades()
      const data = await res;
      setEspecialidades(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSubEspecialidades = async () => {
    try {
      const res = await SubEspecialidadServer.ListSubEspecialidades()
      const data = await res;
      setSubEspecialidades(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSeries = async () => {
    try {
      const res = await SerieServer.ListSeries()
      const data = await res;
      setSeries(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTemporadas = async () => {
    try {
      const res = await TemporadaServer.ListTemporadas()
      const data = await res;
      setTemporadas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategorias();
    getEspecialidades();
    getSubEspecialidades();
    getSeries();
    getTemporadas();
    if (params.id) {
      getVideo(params.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (series) {
    var optionsSeries = series.map((opcion) => ({
      value: opcion.id,
      label: opcion.serie,
    }));
  }
  if (temporadas) {
    var optionsTemporadas = temporadas.map((opcion) => ({
      value: opcion.id,
      label: opcion.temporada,
    }));
  }

  if (categorias && especialidades && subEspecialidades) {
    const optionsCategorias = categorias.map((opcion) => ({
      value: opcion.id,
      label: opcion.categoria,
    }));
    const optionsEspecialidades = especialidades.map((opcion) => ({
      value: opcion.id,
      label: opcion.especialidad,
    }));
    const optionsSubEspecialidades = subEspecialidades.map((opcion) => ({
      value: opcion.id,
      label: opcion.subEspecialidad,
    }));
    return (
      <div className="col-md-6 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="tipeOfVideo">
              Tipo de video
            </label>
            <Select
              className="form-select"
              defaultValue={optionesTipoVideo}
              options={optionesTipoVideo}
              onChange={(selectedValue) => handleSelectTypeVideo(selectedValue, 'tipe_of_video')}
            />
          </div>
          {isSerieSelectEnabled && (
          <div className="mb-3">
            <label className="form-label" htmlFor="tipeOfVideo">
              Serie
            </label>
            <Select
              className="form-select"
              defaultValue={video.serie || 0}             
              options={optionsSeries}
              onChange={(selectedValue) => handleSelectSerie(selectedValue, 'serie')}
              />
          </div>
          )}
          {isTempSelectEnabled && (
            <div className="mb-3">
              <label className="form-label" htmlFor="otroCampo">
                Temporada
              </label>
              <Select
              className="form-select"
              defaultValue={video.temporada || 0}             
              options={optionsTemporadas}
              onChange={(selectedValue) => handleSelectTem(selectedValue, 'temporada')}
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label" htmlFor="languages">
              Idiomas del video
            </label>
            <select
              className="form-select"
              id="languages"
              name="languages"
              value={video.languages || null}
              onChange={handleSelectIdioma}
              aria-label="languages"
              multiple={true}
              required
            >
              <option value="1">Español</option>
              <option value="2">Ingles</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="categorias">
              Categorias del video
            </label>
            <Select
              className="form-select"
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={optionsCategorias}
              isClearable
              onChange={(selectedValues) => handleSelectCategoryEspSub(selectedValues, 'categorias')}
              isMulti
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="Especialidades">
              Especialidades del video
            </label>
            <Select
              className="form-select"
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={optionsEspecialidades}
              isClearable
              onChange={(selectedValues) => handleSelectCategoryEspSub(selectedValues, 'especialidades')}
              isMulti
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="SubEspecialidades">
              SubEspecialidades del video
            </label>
            <Select
              className="form-select"
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={optionsSubEspecialidades}
              isClearable
              onChange={(selectedValues) => handleSelectCategoryEspSub(selectedValues, 'subEspecialidades')}
              isMulti
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="codeEsp">
              Código vimeo del video en español
            </label>
            <input
              className="form-control"
              id="code_esp"
              name="code_esp"
              value={video.code_esp || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Código del video en español"
              maxLength="150"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="codeEngl">
              Código vimeo del video en ingles
            </label>
            <input
              className="form-control"
              id="codeEngl"
              name="code_engl"
              value={video.code_engl || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Código del video en ingles"
              maxLength="150"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="titleEspanol">
              Titulo en español
            </label>
            <input
              className="form-control"
              id="titleEspanol"
              name="title_espanol"
              value={video.title_espanol}
              onChange={handleInputChange}
              type="text"
              placeholder="Titulo en español"
              required
              maxLength="150"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="titleEnglish">
              Titulo en Ingles
            </label>
            <input
              className="form-control"
              id="titleEnglish"
              name="title_english"
              value={video.title_english}
              onChange={handleInputChange}
              type="text"
              placeholder="Titulo en Ingles"
              required
              maxLength="150"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="titleCapEsp">
              Titulo del capitulo en Español
            </label>
            <input
              className="form-control"
              id="titleCapEsp"
              name="title_cap_esp"
              value={video.title_cap_esp || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Titulo del capitulo en Español"
              maxLength="150"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="titleCapEnglish">
              Titulo del capitulo en Ingles
            </label>
            <input
              className="form-control"
              id="titleCapEnglish"
              name="title_cap_english"
              value={video.title_cap_english || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Titulo del capitulo en Ingles"
              maxLength="150"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="descriptionEsp">
              Descripción en español
            </label>
            <input
              className="form-control"
              id="descriptionEsp"
              name="description_esp"
              value={video.description_esp || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Descripción en español"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="descriptionEnglish">
              Descripción en ingles
            </label>
            <input
              className="form-control"
              id="descriptionEnglish"
              name="description_english"
              value={video.description_english || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Descripción en ingles"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="featuredImage">
              Imagen para banner
            </label>
            <input
              className="form-control"
              id="featuredImage"
              name="image"
              onChange={handleInputChange}
              type="file"
              placeholder="Imagen para banner"              
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="minImage">
              Imagen para email
            </label>
            <input
              className="form-control"
              id="min_image"
              name="min_image"
              onChange={handleInputChange}
              type="file"
              placeholder="Imagen para Email"                
              />
          </div>

          <div className="d-grid">
            {params.id ? (
              <button
                className="btn btn-primary btn-lg"
                id="submitButton"
                type="submit"
              >
                Update
              </button>
            ) : (
              <button
                className="btn btn-success btn-lg"
                id="submitButton"
                type="submit"
              >
                Guardar
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
};

export default VideoForm;
