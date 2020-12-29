import React, { useState } from 'react';

import { Button } from 'appitsy/components/Basic';
import _ from 'lodash';
import ReactJson from 'react-json-view';

import styled from '@emotion/styled';

import {
  parseTypeFromJson,
  prepareJsonSchema,
} from '../Utilities/ComponentTypes';
import { ComponentSchemaWithId } from './DesignerRenderer';

const SchemaActions = styled.div`
  text-align: right;
  margin-bottom: 10px;
`;

const SchemaActionButton = styled(Button)`
	margin-left: 10px;
`

interface SchemaEditorProps {
	schema: ComponentSchemaWithId[];
  onSchemaChange: (updatedSchema: ComponentSchemaWithId[]) => void;
}

export const SchemaEditor = (props: SchemaEditorProps) => {
	const [isSchemaEditable, setIsSchemaEditable] = useState<boolean>(false);
  const [editingSchema, setEditingSchema] = useState<string>('');
	
	const schema = prepareJsonSchema(props.schema);
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);
  const jsonFormattedString = () => JSON.stringify(schema, null, "  ");

  const startSchemaEditing = () => {
    setIsSchemaEditable(true);
    setEditingSchema(jsonFormattedString());
  };

  const endSchemaEditing = () => {
    setIsSchemaEditable(false);
		setEditingSchema('');
		// we'll have to use eval here
		// so that we can parse relaxed json
    // eslint-disable-next-line no-eval
    const jsonArray = eval(`(${editingSchema})`);
    if (!_.isArray(jsonArray)) {
      throw new Error('JSON Array expected here..');
    }

    const saveSchema = jsonArray.map(x => parseTypeFromJson(x));

    props.onSchemaChange(saveSchema);
  }

	return (
		<>
			<SchemaActions>
				{ 
					isSchemaEditable
						// eslint-disable-next-line react/style-prop-object
						? (<SchemaActionButton name='saveSchema' display={{ leftIcon: 'save' }} onClick={endSchemaEditing} text='Save' style='secondary' />)
						// eslint-disable-next-line react/style-prop-object
						: (<SchemaActionButton name='editSchema' display={{ leftIcon: 'pen' }} onClick={startSchemaEditing} text='Edit' style='secondary' />)
				}
				
				{ /*eslint-disable-next-line react/style-prop-object */ }
				<SchemaActionButton name='copyToClipboard' display={{ leftIcon: 'clipboard' }} onClick={() => copyToClipboard(jsonFormattedString())} text='Copy' style='primary' />
			</SchemaActions>
			<div className="card card-body bg-light">
				{ 
					isSchemaEditable 
						? (<textarea rows={20} value={editingSchema} onChange={(evt) => setEditingSchema(evt.target.value)}> sd </textarea>)
						: (<ReactJson src={schema} />)
				}
			</div>
		</>
	)
}