import React, { useState, useRef } from "react";
import sample from '../utils/sample.json';
import EmailEditor from "react-email-editor";

export const emaileditor_component = () => {
  const [mailEditor, setMailEditor] = useState({ isLoaded: false });

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
      console.log(design);
      alert("Se exporto correctamente el diseño");
    });
  };

  const onLoad = (sample) => {
    emailEditorRef.current.loadDesign(sample);
  };

  const onReady = () => {
    // editor is ready
    setMailEditor({ ...mailEditor, isLoaded: true });
  };
  return (
    <div className="w-100">
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
  );
};
