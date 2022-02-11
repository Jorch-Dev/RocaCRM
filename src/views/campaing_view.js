import React, { useState, useContext, useEffect } from "react";
import { ApiService } from "../services/api_service";
import { SiMarketo, AiOutlineClose, BiMailSend } from "react-icons/all";
import { IconUI } from "../utils/IconUI";
import { white } from "../styles/colors";
import { EmailSettingsView } from "./emailsettings_view";
import { MarketingContext } from "../context/emailmarketing_context";
import Modal from "react-bootstrap/Modal";

export const CampaingView = () => {
  const { marketingState, setMarketingState } = useContext(MarketingContext);
  const [CompaingDesing, setcampaingDesing] = useState({
    funnels: [],
    idFunel: null,
    searchlistas: [],
    listitem: [],
    removeitem: [],
    error: null,
    isLoading: false,
    envio: null,
    modalIsOpen: false,
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
      setMarketingState({ ...marketingState, sendItems: newArray });
    }
  };

  const removeTags = (indexToRemove) => {
    const newArray = CompaingDesing.listitem.filter((x) => x != indexToRemove);

    const newArrayDelete = CompaingDesing.listitem.filter(
      (x) => x == indexToRemove
    );

    CompaingDesing.removeitem.unshift(newArrayDelete);
    marketingState.deleteItems.unshift(newArrayDelete);
    setcampaingDesing({
      ...CompaingDesing,
      listitem: newArray,
    });
    setMarketingState({ ...marketingState, sendItems: newArray });
  };

  const addEmail = (e) => {
    if (e.target.value !== "") {
      const newArray = CompaingDesing.listitem;
      newArray.unshift(e.target.value);

      setcampaingDesing({ ...CompaingDesing, listitem: newArray });
      e.target.value = "";
      setMarketingState({ ...marketingState, sendItems: newArray });
    }
  };

  const tipoenvio = (id) => {
    if (id != null) {
      setcampaingDesing({ ...CompaingDesing, envio: id });
      setMarketingState({
        ...marketingState,
        envioRapido: id === 1 ? true : false,
      });
    }
  };

  const emailsettings = () => {
    setcampaingDesing({ ...CompaingDesing, modalIsOpen: true, error: null });
    setMarketingState({ ...marketingState, emailSettings: true });
  };

  const closeModal = () => {
    setcampaingDesing({ ...CompaingDesing, modalIsOpen: false });
    setMarketingState({ ...marketingState, emailSettings: false });
  };

  const getdate = (e) => {
    console.log(e);
  };

  const gettime = (e) => {
    console.log(e);
  };

  return (
    <>
      <div className="d-none d-lg-flex h-100">
        <div className="col h-100 overflow-auto">
          <div className="contenedor-dashboard d-flex flex-column">
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
                          <span className="tags-title">{i}</span>
                          <i
                            className="tags-closeicon"
                            onClick={() => removeTags(i)}
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
                          <i className="tags-closeicon">
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

        <div className="d-block">
          <div className="card mt-2">
            <div className="d-flex justify-content-center">
              <div className="text-book text-primary text-bold">
                Opciones de envío
              </div>
            </div>

            <div className="d-flex my-3">
              <div className="col form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="rbsendnow"
                  name="flexRadioDefault"
                  onClick={() => tipoenvio(1)}
                />
                <label className="form-check-label">Envíar ahora</label>
              </div>

              <div className="col form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="rbsendlater"
                  name="flexRadioDefault"
                  onClick={() => tipoenvio(2)}
                />
                <label className="form-check-label">Programar un envío</label>
              </div>
            </div>

            <div className="d-flex flex-column mt-3">
              {CompaingDesing.envio === null ? (
                <></>
              ) : CompaingDesing.envio === 2 ? (
                <>
                  <div className="col d-flex my-2">
                    <div className="col">
                      <input
                        type="date"
                        className="form-control"
                        onChange={(e) => getdate(e)}
                      />
                    </div>
                    <div className="col">
                      <input
                        className="form-control"
                        type="time"
                        onChange={(e) => gettime(e)}
                      />
                    </div>
                  </div>
                  <div className="col d-flex justify-content-center items-align-center mt-5">
                    <button className="cta cta--blue">
                      <div className="d-flex align-items-center">
                        <IconUI color={white}>
                          <SiMarketo />
                        </IconUI>
                        <div className="cta_text ps-2">Programar</div>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <div className="col d-flex justify-content-center items-align-center">
                  <button className="cta cta--blue">
                    <div className="d-flex align-items-center">
                      <IconUI color={white}>
                        <BiMailSend />
                      </IconUI>
                      <div className="cta_text ps-2">Envíar</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
            <hr />

            <div className="col">
              <div className="d-flex mt-auto">
                <div className="col">
                  <div className="btn-group">
                    <button
                      className="btn bg-light-blue btn-sm dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="text-light">Configuración avanzada</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item" onClick={emailsettings}>
                        Configuración de correo electrónico
                      </li>
                      <li className="dropdown-item">Versión web</li>
                    </ul>
                  </div>
                </div>
                <div className="col d-flex">
                  <div className="btn-group ms-auto">
                    <button
                      className="btn bg-light-blue btn-sm dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="text-light">Opciones</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item">Editar</li>
                      <li className="dropdown-item">Enviar correo de prueba</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-lg-none h-100">
        <div className="col h-100 overflow-auto">
          <div className="contenedor-dashboard d-flex flex-column">
            <div className="card bg-white d-block p-1 my-2">
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

            <div className="card bg-white d-block p-1 my-3">
              Enviar a:
              <div className="col tags_container">
                <ul className="tags_list">
                  {CompaingDesing.listitem != null ? (
                    <>
                      {CompaingDesing.listitem.map((i, count) => (
                        <li key={count} className="tags">
                          <span className="tags-title">{i}</span>
                          <i
                            className="tags-closeicon"
                            onClick={() => removeTags(i)}
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
                          <i className="tags-closeicon">
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

        <div className="d-block">
          <div className="card mt-2">
            <div className="d-flex justify-content-center">
              <div className="text-book text-primary text-bold">
                Opciones de envío
              </div>
            </div>

            <div className="d-flex my-3">
              <div className="col form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="rbsendnow"
                  name="flexRadioDefault"
                  onClick={() => tipoenvio(1)}
                />
                <label className="form-check-label">Envíar ahora</label>
              </div>

              <div className="col form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="rbsendlater"
                  name="flexRadioDefault"
                  onClick={() => tipoenvio(2)}
                />
                <label className="form-check-label">Programar un envío</label>
              </div>
            </div>

            <div className="d-flex flex-column mt-3">
              {CompaingDesing.envio === null ? (
                <></>
              ) : CompaingDesing.envio === 2 ? (
                <>
                  <div className="col d-flex flex-column my-2">
                    <div className="col">
                      <input
                        type="date"
                        className="form-control"
                        onChange={(e) => getdate(e)}
                      />
                    </div>
                    <div className="col">
                      <input
                        className="form-control"
                        type="time"
                        onChange={(e) => gettime(e)}
                      />
                    </div>
                  </div>
                  <div className="col d-flex justify-content-center items-align-center mt-5">
                    <button className="cta cta--blue">
                      <div className="d-flex align-items-center">
                        <IconUI color={white}>
                          <SiMarketo />
                        </IconUI>
                        <div className="cta_text ps-2">Programar</div>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <div className="col d-flex justify-content-center items-align-center">
                  <button className="cta cta--blue">
                    <div className="d-flex align-items-center">
                      <IconUI color={white}>
                        <BiMailSend />
                      </IconUI>
                      <div className="cta_text ps-2">Envíar</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
            <hr />

            <div className="col">
              <div className="d-flex flex-column">
                <div className="col d-flex justify-content-center">
                  <div className="btn-group">
                    <button
                      className="btn bg-light-blue btn-sm dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="text-light">Configuración avanzada</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item" onClick={emailsettings}>
                        Configuración de correo electrónico
                      </li>
                      <li className="dropdown-item">Versión web</li>
                    </ul>
                  </div>
                </div>
                <br />
                <div className="col d-flex justify-content-center">
                  <div className="btn-group">
                    <button
                      className="btn bg-light-blue btn-sm dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="text-light">Opciones</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item">Editar</li>
                      <li className="dropdown-item">Enviar correo de prueba</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal show={CompaingDesing.modalIsOpen} onHide={closeModal} size="lg">
        <Modal.Header className="bg-blue" closeButton>
          <Modal.Title className="text-light">
            Configuraciones del correo electrónico
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmailSettingsView
            modal={CompaingDesing}
            setModal={setcampaingDesing}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

{
  /* <div className="col h-100 mt-2">
  <div className="homemenu bg-white d-block p-1">
  <div className="col my-1">
    <div className="text-book text-primary text-bold text-center">
      Opciones de envío
    </div>
    <div className="col d-flex my-3">
      <div className="col form-check">
        <input
          className="form-check-input"
          type="radio"
          id="rbsendnow"
          name="flexRadioDefault"
          onClick={() => tipoenvio(1)}
        />
        <label className="form-check-label">Envíar ahora</label>
      </div>

      <div className="col form-check">
        <input
          className="form-check-input"
          type="radio"
          id="rbsendlater"
          name="flexRadioDefault"
          onClick={() => tipoenvio(2)}
        />
        <label className="form-check-label">Programar un envío</label>
      </div>
    </div>

    <div className="col my-3">
      {CompaingDesing.envio === 2 ? (
        <>
          <div className="col d-flex my-2">
            <div className="col">
              <input type="date" className="form-control" />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="time"
                id="appt"
                name="appt"
              />
            </div>
          </div>
          <div className="col d-flex justify-content-center items-align-center mt-5">
            <button className="cta cta--blue">
              <div className="d-flex align-items-center">
                <IconUI color={white}>
                  <SiMarketo />
                </IconUI>
                <div className="cta_text ps-2">Programar</div>
              </div>
            </button>
          </div>
        </>
      ) : (
        <div className="col d-flex justify-content-center items-align-center">
          <button className="cta cta--blue">
            <div className="d-flex align-items-center">
              <IconUI color={white}>
                <BiMailSend />
              </IconUI>
              <div className="cta_text ps-2">Envíar</div>
            </div>
          </button>
        </div>
      )}
    </div>
    </div>

    <hr />

    <div className="col mt-auto">
      <div className="d-flex">
        <div className="col">
          <div className="btn-group ms-auto">
            <button
              className="btn bg-light-blue btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="text-light">Configuración avanzada</span>
            </button>
            <ul className="dropdown-menu">
              <li className="dropdown-item" onClick={emailsettings}>
                Configuración de correo electrónico
              </li>
              <li className="dropdown-item">...</li>
            </ul>
          </div>
        </div>
        <div className="col d-flex">
          <div className="btn-group ms-auto">
            <button
              className="btn bg-light-blue btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="text-light">Opciones</span>
            </button>
            <ul className="dropdown-menu">
              <li className="dropdown-item">Editar</li>
              <li className="dropdown-item">...</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>; */
}
