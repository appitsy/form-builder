import React, { useState } from 'react';

import { Form } from '@appitsy/forms';
import { getDisplayNameForType } from '@appitsy/forms/types/Types';
import styled from '@emotion/styled';

const nameAndLabelFormSchema = [
  {
    "type": "text",
    "name": "name",
    "display": {
      "label": "Name"
    },
    "validations": {
      "required": true
    }
  },
  {
    "type": "text",
    "name": "label",
    "display": {
      "label": "Label"
    }
  },
  {
    "components": [
      {
        "text": "Submit",
        "style": "primary",
        "type": "button",
        "name": "ok",
        "display": {
          "label": "OK"
        }
      },
      {
        "text": "Submit",
        "style": "secondary",
        "type": "button",
        "name": "cancel",
        "display": {
          "label": "Cancel",
          "disableOnInvalidForm": false
        }
      }
    ],
    "type": "columns",
    "name": "buttonColumns",
    "display": {
      "label": ""
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
      <Form 
        schema={nameAndLabelFormSchema}
        data={data}
        onSubmit={onSubmit}
        onDataChange={setData}
      />
    </>
	);
}