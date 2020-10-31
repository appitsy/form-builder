import styled from "@emotion/styled";
import React, { useState } from "react";
import ComponentList from "./ComponentList";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DroppableRenderer } from "./DroppableRenderer";
import { getDefaultPropsForType } from "../Utilities/ComponentTypes";
import cloneDeep from "lodash-es/cloneDeep";
import { ComponentSchemaWithId } from "./DesignerRenderer";

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
  const [schema, setSchema] = useState<ComponentSchemaWithId[]>([]);

  const onDrop = (component: any) => {
    if (component.operation === "drop") {
      let newComponent = getDefaultPropsForType(component.type, "1");

      if (newComponent === null) {
        return;
      }

      setSchema([...schema, { ...newComponent, id: new Date().getMilliseconds().toString() }]);
    } 
  };

  const onDelete = (path: any) => {
    /// TODO: NESTED with splitting dots
    const schemaCopy = schema.filter((component) => component.name !== path);
    setSchema(schemaCopy);
  };

  const moveComponent = (id: string, atIndex: number) => {
    const index = findComponent(id);
    const schemaCopy = cloneDeep(schema);
    const component = schemaCopy.splice(index, 1)[0];
    schemaCopy.splice(atIndex, 0, component);
    setSchema(schemaCopy);
  };

  const findComponent = (id: string) => {
    const component = schema.filter((c) => `${c.id}` === id)[0];
    return schema.indexOf(component);
  }

  return (
    <DesignerPage>
      <DndProvider backend={HTML5Backend}>
        <ComponentListContainer className="bg-light">
          <ComponentList />
        </ComponentListContainer>

        <DesignerPreview>
          <DroppableRenderer
            schema={schema}
            data={data}
            onDrop={onDrop}
            onDelete={onDelete}
            moveComponent={moveComponent}
            findComponent={findComponent}
          />
        </DesignerPreview>
      </DndProvider>
    </DesignerPage>
  );
};

export default Designer;
