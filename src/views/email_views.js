import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../context/user_context";
import sample from '../utils/sample.json';
import EmailEditor from "react-email-editor";

export const EmailViews = () => {
  const { userState } = useContext(UserContext);
  const [mailEditor, setMailEditor] = useState({isLoaded: false})

  const emailEditorRef = useRef(null);

  const editorHTML = {
    height: 700,
  };

  const exportHtml = () => {
    //exporta html con css
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };

  const exportjsl = () => {
    //aqui se tendra la logica para guardarlo en un documento json
    emailEditorRef.current.editor.saveDesign((design) => {
      console.log(design)
      alert(
        "Se exporto correctamente el diseño"
      );
    });
  };

  const onLoad = (sample) => {
    emailEditorRef.current.loadDesign(sample);
  };

  const onReady = () => {
    // editor is ready
    setMailEditor({...mailEditor, isLoaded:true})
  };

  return (
    <div className="contenedor-dashboard">
      <div className="d-flex flex-column">
        <div className="position-relative p-1">
          <div className="text-big text-primary text-bold">Bienvenido</div>
          <div className="text-secondary text-0">
            {userState.usuario !== null ? (
              <span className="text-0">
                {userState.usuario.Usr_Name} {userState.usuario.Usr_Lastname}
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="card bg-white d-block p-1 my-2">
          <div className="d-flex justify-content-center">
            <div className="col border">
              <button className="btn btn-primary" onClick={exportHtml}>
                Exporta tu HTML
              </button>
            </div>
            <div className="col border">
              <button className="btn btn-success" onClick={exportjsl}>
                Guarda tu diseño
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-white my-2">
          <EmailEditor
            ref={emailEditorRef}
            onLoad={mailEditor.isLoaded ? onLoad(sample) : null}
            //onLoad={onLoad}
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
    </div>
  );
};
