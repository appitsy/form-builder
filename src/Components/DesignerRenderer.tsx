import React from 'react';
import { Renderer, RendererProps } from "appitsy/dist/components/Renderer/Renderer";
import Styled from '@emotion/styled';
import { ComponentSchema } from 'appitsy/dist/types/ComponentSchema';
import { Types } from 'appitsy/dist/types/Types';
import { DroppableComponent } from './DroppableComponent';
import { DraggableDroppableComponent } from './DraggableDroppableComponent';
import styled from '@emotion/styled';
import { ROOT_ID } from './Designer';

const StyledPage = Styled.div`
    display: flex;
    flex-direction: column;
    padding: 7px;
    .appitsy-component {
        margin: 7px;
        width: calc(100% - 14px);
    }
`;

const StyledDraggableDroppableComponent = styled(DraggableDroppableComponent)`
    background-color: white;
    margin: 10px 10px 0px 10px;
`;

export type ComponentSchemaWithId = ComponentSchema & {
  id: string;
  components?: ComponentSchemaWithId[];
}

interface DesignerRendererProps extends RendererProps {
  schema: ComponentSchemaWithId[];
  onDelete(componentId: string): void;
  onDrop(component: any): void;
  moveComponent: (id: string, newPath: string) => void;
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

    return (
      <StyledDraggableDroppableComponent 
        id={component.id} 
        key={component.id} 
        type={component.type} 
        operation='move' 
        moveComponent={this.props.moveComponent} 
      >
        <>
          <button onClick={() => this.props.onDelete(component.id)}>Delete</button>
          { renderedComponent }
        </>
      </StyledDraggableDroppableComponent>
    );
  }

  renderChildren() {
    return this.props.schema.map((component) => this.renderDesignerComponent(component)
    );
  }

  renderLayoutChildren(childComponents: ComponentSchemaWithId[], parentComponent: ComponentSchemaWithId) {
    return [(
      <DroppableComponent id={parentComponent.id} onDrop={this.props.onDrop}>
        <div style={{minWidth: '100px'}}>
          {childComponents.map((panelChild) => this.renderDesignerComponent(panelChild, parentComponent))}
        </div>
      </DroppableComponent>
    )];
  }

  renderRoot() {
    return <StyledPage>{this.renderChildren()}</StyledPage>;
  }
}
