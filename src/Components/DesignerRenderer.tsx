import React from 'react';
import { Renderer, RendererProps } from "appitsy/dist/components/Renderer/Renderer";
import Styled from '@emotion/styled';
import { ComponentSchema } from 'appitsy/dist/types/ComponentSchema';
import { Types } from 'appitsy/dist/types/Types';
import { DroppableComponent } from './DroppableComponent';
import { DraggableDroppableComponent } from './DraggableDroppableComponent';
import styled from '@emotion/styled';
import { ROOT_ID } from './Designer';
import Icon from 'appitsy/dist/components/BasicComponents/Icon';
import { PreviewComponentSchema } from './PreviewComponent';

const StyledPage = Styled.div`
    display: flex;
    flex-direction: column;
    padding: 7px;
    .appitsy-component {
        margin: 7px;
        width: calc(100% - 14px);
    }
`;
const DropFieldsHere = styled.div`
  background-color: lightgrey;
  padding: 10px;
  margin: 0px;
`;

export type ComponentSchemaWithId = ComponentSchema & {
  id: string;
  canHaveChildComponents: boolean;
  components? : ComponentSchemaWithId[];
  previewComponent?: PreviewComponentSchema;
}

interface DesignerRendererProps extends RendererProps {
  schema: ComponentSchemaWithId[];
  onDelete(componentId: string): void;
  onDrop(component: any): void;
  addPreview(componentType: string, adjacentComponentId: string, after: boolean): void;
  moveComponent: (id: string, newPath: string) => void;
  moveAdjacent: (id: string, adjacentComponentId: string, after: boolean) => void;
}

export class DesignerRenderer extends Renderer<DesignerRendererProps> {
  renderDesignerComponent = (component: ComponentSchemaWithId, parentComponent?: ComponentSchemaWithId) => {
    let renderedComponent;
    const parentId = parentComponent?.id || ROOT_ID;
    const key = `${parentId}-${component.id}` 
    switch (component.type) {
      case Types.Panel: 
        let panelComponentSchema = component as any;
        panelComponentSchema.display = { ...panelComponentSchema.display, expandable: false };
        let panel = super.renderComponent(panelComponentSchema, key);
        renderedComponent = panel;
        break;
      default:
        renderedComponent = super.renderComponent(component, key);
        break;
    }

    const deleteAction = (
      <div onClick={() => this.props.onDelete(component.id)}><Icon icon='trash-alt'/></div>
    );

    return (
      <DraggableDroppableComponent 
        id={component.id} 
        key={component.id} 
        type={component.type} 
        operation='move' 
        onDrop={this.props.onDrop}
        // if this component can render children, we'll skip showing preview
        // in the DraggableDroppableComponent and rather show it in Droppable area 
        // of the component
        previewComponent={component.canHaveChildComponents ? undefined : component.previewComponent}
        addPreview={this.props.addPreview}
        moveComponent={this.props.moveComponent} 
        moveAdjacent={this.props.moveAdjacent}
        deleteAction={deleteAction}
      >
        { renderedComponent }
      </DraggableDroppableComponent>
    );
  }

  renderChildren() {
    return this.props.schema.map((component) => this.renderDesignerComponent(component)
    );
  }

  renderLayoutChildren(childComponents: ComponentSchemaWithId[], parentComponent: ComponentSchemaWithId) {
    var inner = undefined;
    if (childComponents.length > 0) {
      inner = (
        <div>
        {childComponents.map((panelChild) => this.renderDesignerComponent(panelChild, parentComponent))}
        </div>
      );
    } else {
      inner = (
        <DropFieldsHere>Drop fields here!</DropFieldsHere>
      );
    }
    return [(
      <DroppableComponent 
        id={parentComponent.id} 
        onDrop={this.props.onDrop}
        previewComponent={parentComponent.previewComponent}
        addPreview={this.props.addPreview}
      >
        <div style={{minWidth: '100px'}}>
          {inner}
        </div>
      </DroppableComponent>
    )];
  }

  renderRoot() {
    return <StyledPage>{this.renderChildren()}</StyledPage>;
  }
}
