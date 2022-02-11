import React, { useState, useRef, useContext } from "react";
import sample from "../utils/sample.json";
import EmailEditor from "react-email-editor";
import { MarketingContext } from "../context/emailmarketing_context";
import { AiFillSave, GiNextButton } from "react-icons/all";
import { IconUI } from "../utils/IconUI";
import { white } from "../styles/colors";
import { CampaingView } from "../views/campaing_view";

export const EmailEditorComponent = () => {
  const { marketingState, setMarketingState } = useContext(MarketingContext);
  const [mailEditor, setMailEditor] = useState({
    isLoaded: false,
    provider: false,
    error: null,
  });

  const emailEditorRef = useRef(null);

  const editorHTML = {
    height: 750,
    with: 100,
  };

  const exportHtml = () => {
    //exporta html con css
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      setMarketingState({ ...marketingState, contentHTML: html });
    });
  };

  const onLoad = (sample) => {
    emailEditorRef.current.loadDesign(sample);
  };

  const onReady = () => {
    // editor is ready
  };

  const next = () => {
    if (marketingState.contentHTML != null) {
      setMailEditor({ ...mailEditor, provider: true, isLoaded: true });
    } else {
      setMailEditor({
        ...mailEditor,
        isLoaded: false,
        error: "Tienes que guardar la plantilla del correo para poder avanzar",
      });
    }
  };

  return (
    <>
      {mailEditor.provider ? (
        <CampaingView />
      ) : (
        <>
          <div className="contenedor-dashboard">
            <div className="card">
              <div className="col d-flex justify-content-center">
                {mailEditor.error != null ? (
                  <p className="text-center text-orange">{mailEditor.error}</p>
                ) : (
                  <></>
                )}
              </div>
              <div className="col d-flex">
                <div className="col d-flex justify-content-center">
                  <button className="cta cta--orange" onClick={exportHtml}>
                    <div className="d-flex align-items-center">
                      <IconUI color={white} size={25}>
                        <AiFillSave />
                      </IconUI>
                      <div className="cta_text ps-2">Guardar</div>
                    </div>
                  </button>
                </div>
                <div className="ms-auto">
                  <button className="cta cta--orange" onClick={next}>
                    <div className="d-flex align-items-center">
                      {mailEditor.isLoading ? (
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

            <div className="card bg-white my-2">
              <EmailEditor
                ref={emailEditorRef}
                onLoad={mailEditor.isLoaded ? onLoad(sample) : null}
                onReady={onReady}
                style={editorHTML}
                appearance={{ theme: "dark" }}
                tools={{
                  social: {
                    properties: {
                      value: {
                        iconType: "squared",
                        icons: [
                          { name: "Facebook", url: "https://facebook.com/" },
                          { name: "Twitter", url: "https://twitter.com/" },
                        ],
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
