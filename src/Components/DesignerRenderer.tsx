import React from 'react';
import { Renderer, RendererProps } from "appitsy/components/Renderer/Renderer";
import Styled from '@emotion/styled';
import { ComponentSchema } from 'appitsy/types/ComponentSchema';
import { Types } from 'appitsy/types/Types';
import { DroppableComponent } from './DroppableComponent';
import { DraggableDroppableComponent } from './DraggableDroppableComponent';
import styled from '@emotion/styled';
import Icon from 'appitsy/components/Basic/Icon';
import { PreviewComponentSchema } from './PreviewComponent';
import ReactTooltip from 'react-tooltip';

const StyledPage = Styled.div`
    display: flex;
    flex-direction: column;
    padding: 7px;
`;
const DropFieldsHere = styled.div`
  background-color: lightgrey;
  padding: 10px;
  margin: 0px;
`;

const StyledDraggableDroppableComponent = styled(DraggableDroppableComponent)`
    padding: 7px;
    background-color: ${(props) => props.isEditing ? '#ffffb3' : ''};
`;

export type ComponentSchemaWithId = ComponentSchema & {
  id: string;
  isEditing: boolean;
  canHaveChildComponents: boolean;
  components? : ComponentSchemaWithId[];
  previewComponent?: PreviewComponentSchema;
}

interface DesignerRendererProps extends RendererProps {
  schema: ComponentSchemaWithId[];
  onEdit(componentId: string): void;
  onDelete(componentId: string): void;
  onDrop(component: any): void;
  addPreview(componentType: string, adjacentComponentId: string, after: boolean): void;
  moveComponent: (id: string, newPath: string) => void;
  moveAdjacent: (id: string, adjacentComponentId: string, after: boolean) => void;
}

export class DesignerRenderer extends Renderer<DesignerRendererProps> {
  renderDesignerComponent = (component: ComponentSchemaWithId) => {
    let renderedComponent;
    const key = `${component.id}` 
    switch (component.type) {
      case Types.Panel: 
        let panelComponentSchema = component as any;
        panelComponentSchema.display = { ...panelComponentSchema.display, expandable: false };
        let panel = super.renderComponent(panelComponentSchema, key);
        renderedComponent = panel;
        break;
      case Types.Tabs: 
        let tabsComponentSchema = component as any;
        let tabs = super.renderComponent(tabsComponentSchema, key);
        renderedComponent = tabs;
        break;
      default:
        renderedComponent = super.renderComponent(component, key);
        break;
    }

    const editAction = (
      <div onClick={() => this.props.onEdit(component.id)}><Icon icon='pen'/></div>
    );

    const deleteAction = (
      <div onClick={() => this.props.onDelete(component.id)}><Icon icon='trash-alt'/></div>
    );

    return (
      <StyledDraggableDroppableComponent 
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
        isEditing={component.isEditing}
        editAction={editAction}
        deleteAction={deleteAction}
      >
        { renderedComponent }
      </StyledDraggableDroppableComponent>
    );
  }

  renderChildren() {
    return this.props.schema.map((component) => this.renderDesignerComponent(component));
  }

  renderChildComponents(childComponents?: ComponentSchemaWithId[], parentPath?: string, parentComponent?: ComponentSchemaWithId): JSX.Element[] {
    if (parentPath === undefined || parentComponent === undefined) {
      return [];
    }

    var inner = undefined;
    if (childComponents && childComponents.length > 0) {
      inner = (
        <div>
          {childComponents.map((panelChild) => this.renderDesignerComponent(panelChild))}
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

  addReactTooltip(children: JSX.Element[]): React.ReactNode {
    /*
        Issue: Tried multiple things
        If we remove/move the below code, either the tooltips stop working
        Or tooltips stop working with showing up just one weird border at the bottom
        of the screen. But I think we can live with this for now.
    */
    children.push(<span data-tip={"asd"} />);
    children.push(<ReactTooltip />);
    return children;
  }

  renderRoot() {
    return (
      <StyledPage>
        { this.addReactTooltip(this.renderChildren()) }
      </StyledPage>
    );
  }
}
