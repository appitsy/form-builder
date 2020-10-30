import styled from "@emotion/styled";
import React, { useState } from "react";
import ComponentList from "./ComponentList";

import { ComponentSchema } from "appitsy/dist/types/ComponentSchema";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DroppableRenderer } from "./DroppableRenderer";
import { getDefaultPropsForType } from "../Utilities/ComponentTypes";
import cloneDeep from 'lodash-es/cloneDeep';
import unset from 'lodash-es/unset';

const DesignerPage = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const ComponentListContainer = styled.div`
  width: 240px;
`;

const DesignerPreview = styled.div`
  flex: 1;
`;

// const getTextField = () => ({
//   name: "text-" + new Date().getMilliseconds(),
//   type: "text",
//   data: {
//     defaultValue: "asd",
//   },
//   validations: {
//     minLength: 10,
//   },
// });

const Designer = () => {
  const [data] = useState<Object>({});
  const [schema, setSchema] = useState<ComponentSchema[]>([]);

  const onDrop = (component: any) => {
    let newComponent = getDefaultPropsForType(component.type, '1');

    if (newComponent === null) {
        return;
    }

    setSchema([...schema, newComponent])
  }

  const onDelete = (path: any) => {
    /// TODO: NESTED with splitting dots
    const schemaCopy = schema.filter(component => component.name !== path);
    setSchema(schemaCopy);
  }

  return (
    <DesignerPage>
        <DndProvider backend={HTML5Backend}>
            <ComponentListContainer className="bg-light">
                <ComponentList />
            </ComponentListContainer>

            <DesignerPreview>
                <DroppableRenderer schema={schema} data={data} onDrop={onDrop} onDelete={onDelete}/>
            </DesignerPreview>
        </DndProvider>
    </DesignerPage>
  );
};

export default Designer;
