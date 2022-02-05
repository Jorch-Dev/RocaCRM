import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/user_context";
import { ApiService } from "../services/api_service";
import { AiFillSave, GiNextButton, AiOutlineClose } from "react-icons/all";
import { IconUI } from "../utils/IconUI";
import { white } from "../styles/colors";

export const CampaingView = () => {
  const { userState } = useContext(UserContext);
  const [CompaingDesing, setcampaingDesing] = useState({
    funnels: [],
    idFunel: null,
    searchlistas: [],
    listitem: [],
    removeitem: [],
    error: null,
    isLoading: false,
  });

  useEffect(async () => {
    if (CompaingDesing.funnels.length === 0) {
      setcampaingDesing({ ...CompaingDesing, isLoading: true });
      const objetos = await ApiService("get", "funnel/all");

      if (objetos.status != 200) {
        setcampaingDesing({
          ...CompaingDesing,
          idFunel: null,
          isLoading: false,
          error:
            "Error del sistema, intente de nuevo más tarde o comuníquese con un asesor",
        });
      } else {
        setcampaingDesing({
          ...CompaingDesing,
          isLoading: false,
          funnels: objetos.data.rows,
        });
      }
    }


  }, []);

  const llenaLista = async (e) => {
    if (e.target.value != null) {
      const result = await ApiService(
        "get",
        `user/contact?f=${e.target.value}&o=0&l=100`
      );

      const newArray = result.data.rows.map((x) => x.Con_Email);

      setcampaingDesing({ ...CompaingDesing, listitem: newArray });
    }
  };

  const removeTags = (indexToRemove) => {
    
    const newArray = CompaingDesing.listitem.filter(
      (x) => x != indexToRemove
    );

    const newArrayDelete = CompaingDesing.listitem.filter(
      (x) => x == indexToRemove
    );

    CompaingDesing.removeitem.unshift(newArrayDelete)
    setcampaingDesing({
      ...CompaingDesing,
      listitem: newArray,
    });
  };

  const addEmail = (e) => {
 
    if (e.target.value !== "") {
      const newArray = CompaingDesing.listitem;
      newArray.unshift(e.target.value);
      
      setcampaingDesing({...CompaingDesing, listitem: newArray})
      e.target.value = ""
    }
  };
console.log(CompaingDesing.listitem)
  return (
    <div className="contenedor-dashboard">
      <div className="d-flex flex-column">
      <div className="card">
        <div className="col d-flex justify-content-center">
          {/* {mailEditor.error != null ? (
            <p className="text-center text-orange">{mailEditor.error}</p>
          ) : (
            <></>
          )} */}
        </div>

        <div className="col d-flex">
          <div className="col d-flex justify-content-center">
            <button className="cta cta--orange">
              <div className="d-flex align-items-center">
                <IconUI color={white} size={25}>
                  <AiFillSave />
                </IconUI>
                <div className="cta_text ps-2">Guardar</div>
              </div>
            </button>
          </div>
          <div className="ms-auto">
            <button className="cta cta--orange">
              <div className="d-flex align-items-center">
                {CompaingDesing.isLoading ? (
                  <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    <IconUI color={white} size={25}>
                      <GiNextButton />
                    </IconUI>
                    <div className="cta_text ps-2">Continuar</div>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

        <div className="card bg-white d-block p-1 my-2">
          <div className="d-flex">
            <div className="col">
              <select
                name="selectfunnels"
                id="selectfunnels"
                className="form-input"
                onChange={llenaLista}
              >
                <option value="0" defaultValue>
                  Selecciona tu proyecto
                </option>
                {CompaingDesing.funnels.map((i) => (
                  <option key={i.Fun_ID} value={i.Fun_ID}>
                    {i.Fun_Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="card bg-white d-block p-1 my-3">
          Enviar a:
          <div className="col tags_container">
            <ul className="tags_list">
              {CompaingDesing.listitem != null ? (
                <>
                  {CompaingDesing.listitem.map((i, count) => (
                    <li key={count} className="tags">
                      <span
                        className="tags-title"
                      >
                        {i}
                      </span>
                      <i className="tags-closeicon" onClick={() => removeTags(i)}>
                        <IconUI>
                          <AiOutlineClose />
                        </IconUI>
                      </i>
                    </li>
                  ))}
                </>
              ) : (
                <li>
                  <span>
                    Debe seleccionar al menos un correo para pragramar la
                    campaña
                  </span>
                </li>
              )}
            </ul>
            <input
              name="selectfunnels"
              className="form-input"
              onKeyUp={(e) => (e.key == "Enter" ? addEmail(e) : null)}
              placeholder="presiona inter para agregar elementos"
            ></input>
          </div>
        </div>

        <div className="card bg-white d-block p-1 my-3">
          No enviar a
          <div className="col tags_container">
            <ul className="tags_list">
              {CompaingDesing.removeitem != null ? (
                <>
                  {CompaingDesing.removeitem.map((i, count) => (
                    <li key={count} className="tags">
                      <span className="tags-title">{i}</span>
                      <i
                        className="tags-closeicon"
                      >
                        <IconUI>
                          <AiOutlineClose />
                        </IconUI>
                      </i>
                    </li>
                  ))}
                </>
              ) : (
                <li>
                  <span>
                    Aqui se muestran correos excluidos por baja interacción
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
