import React from 'react';

import _ from 'lodash';

import Icon from '@appitsy/forms/components/Basic/Icon';
import {
  Renderer,
  RendererProps,
} from '@appitsy/forms/components/Renderer/Renderer';
import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';
import { TableSchema } from '@appitsy/forms/types/DataComponentSchema';
import { Types } from '@appitsy/forms/types/Types';
import styled from '@emotion/styled';
import Styled from '@emotion/styled';

import { DraggableDroppableComponent } from './DraggableDroppableComponent';
import { DroppableComponent } from './DroppableComponent';
import { PreviewComponentSchema } from './PreviewComponent';

const StyledPage = Styled.div`
    display: flex;
    flex-direction: column;
    padding: 7px;
`;
const DropFieldsHere = styled.div`
  background-color: lightgrey;
  padding: 10px;
  margin: 0px;
  flex: 1;
  text-align: center;
`;

const StyledDraggableDroppableComponent = styled(DraggableDroppableComponent)`
  padding: 7px;
  background-color: ${(props) => props.isEditing ? '#ffffb3' : ''};
`;

const StyledDroppableComponent = styled(DroppableComponent)`
  display: flex;
  align-items: stretch;
`;

export type ComponentSchemaWithId = ComponentSchema & {
  id: string;
  isEditing: boolean;
  previewComponent?: PreviewComponentSchema;
  components?: ComponentSchemaWithId[];
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
  dropFieldsHereComponent = (<DropFieldsHere>Drop fields here!</DropFieldsHere>);

  renderDesignerComponent = (component: ComponentSchemaWithId) => {
    let renderedComponent;
    const key = `${component.id}` 
    switch (component.type) {
      case Types.Columns: {
        const columnsComponentSchema = component as any;
        let columns = super.renderComponent(columnsComponentSchema, key);
        renderedComponent = columns;
        break;
      }
      case Types.Panel: {
        let panelComponentSchema = component as any;
        panelComponentSchema.display = { ...panelComponentSchema.display, expandable: false };
        let panel = super.renderComponent(panelComponentSchema, key);
        renderedComponent = panel;
        break;
      }
      case Types.Tabs: 
        let tabsComponentSchema = component as any;
        let tabs = super.renderComponent(tabsComponentSchema, key);
        renderedComponent = tabs;
        break;
      case Types.Table: 
        let tableComponentSchema = _.cloneDeep(component) as TableSchema;
        if (!tableComponentSchema.display) {
          tableComponentSchema.display = {};
        }

        tableComponentSchema.display.atleastOneRow = true;
        tableComponentSchema.display.allowAddRemove = false;
        tableComponentSchema.display.allowSorting = false;
        renderedComponent = super.renderComponent(tableComponentSchema, key);
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
        previewComponent={component.components ? undefined : component.previewComponent}
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
    if (this.props.schema.length === 0) {
      return [ this.dropFieldsHereComponent ];
    }
    return this.props.schema.map((component) => this.renderDesignerComponent(component));
  }

  renderChildComponents(childComponents?: ComponentSchemaWithId[], parentPath?: string, parentComponent?: ComponentSchemaWithId): JSX.Element[] {
    if (parentPath === undefined || parentComponent === undefined) {
      return [];
    }


    const inner = childComponents?.map((panelChild) => this.renderDesignerComponent(panelChild)) || [];

    // ---- SPECIFIC COMPONENT OVERRIDE ----
    if (parentComponent.type === Types.Table || parentComponent.type === Types.Columns) {
      return [
        ...inner,
        (
        <StyledDroppableComponent 
          id={parentComponent.id} 
          onDrop={this.props.onDrop}
          previewComponent={parentComponent.previewComponent}
          addPreview={this.props.addPreview}
        >
          {this.dropFieldsHereComponent}
        </StyledDroppableComponent>
      )];
    } 

    return [(
      <StyledDroppableComponent 
        id={parentComponent.id} 
        onDrop={this.props.onDrop}
        previewComponent={parentComponent.previewComponent}
        addPreview={this.props.addPreview}
      >
        <div style={{flex: '1'}}>
          { inner.length !== 0 ? inner : this.dropFieldsHereComponent }
        </div>
      </StyledDroppableComponent>
    )];
  }

  renderRoot() {
    return (
      <StyledPage>
        { this.renderChildren() }
      </StyledPage>
    );
  }
}
