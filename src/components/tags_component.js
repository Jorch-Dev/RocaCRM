import React from "react";
import { FiMoreVertical } from "react-icons/all";

export const tags_component = () => {
  return (
    <div>
      <div className="blockmenu">
        <div className="px-3 pt-3 pb-3 tp-border-b">
          <div className="d-flex align-items-center">
            <IconUI size={22} color={blue}>
              <FiMoreVertical />
            </IconUI>
            <div className="text-primary text-small text-bold text-0 px-2">
              Configuraciones
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
