import React, { useState } from 'react';

import { Renderer } from '@appitsy/forms';
import { getDisplayNameForType } from '@appitsy/forms/types/Types';
import styled from '@emotion/styled';

const nameAndLabelFormSchema = [
  {
    "type": "text",
    "name": "name",
    "display": {
      "label": "Name",
    },
    "validations": {
      "required": true
    }
  },
  {
    "type": "text",
    "name": "label",
    "display": {
      "label": "Label",
    },
    "validations": {
      "required": true
    }
  },
  {
    "text": "OK",
    "style": "primary",
    "type": "button",
    "name": "ok",
    "display": {
      "label": "Button",
    }
  },
  {
    "text": "Cancel",
    "style": "secondary",
    "type": "button",
    "name": "cancel",
    "display": {
      "label": "Button"
    }
  }
];

const Heading = styled.h5`
  text-align: center;
  margin: 8px 0px;
`;

interface NewComponentConfirmFormProps {
	componentId: string;
	componentType: string;
	onConfirm: (name: string, label: string) => void;
	onCancel: () => void;
}

export const NewComponentConfirmForm = (props: NewComponentConfirmFormProps) => {
	const [data, setData] = useState({});
	const onSubmit = (data: any, buttonName: string) => {
		if (buttonName === 'ok') {
			props.onConfirm(data.name, data.label)
		} else if (buttonName === 'cancel') {
			props.onCancel();
		}
	}

	return (
    <>
      <Heading>New Component: {getDisplayNameForType(props.componentType)}</Heading>
      <Renderer 
        schema={nameAndLabelFormSchema}
        data={data}
        onSubmit={onSubmit}
        onDataChange={setData}
      />
    </>
	);
}