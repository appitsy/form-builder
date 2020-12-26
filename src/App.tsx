import './App.css';

import React, { useState } from 'react';

import { Renderer } from 'appitsy';
import { Button } from 'appitsy/components/Basic';
import ReactJson from 'react-json-view';
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from 'react-tabs';

import styled from '@emotion/styled';

import Designer from './Components/Designer';
import { ComponentSchemaWithId } from './Components/DesignerRenderer';

const AppRoot = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

const Heading = styled.h4`
	margin: 10px 0px 0px 0px;
	text-align: center;
`
const AppTabs = styled(Tabs)`
	display: flex;
  flex-direction: column;
	flex-grow: 1;

  .appitsy-builder-header-tabs {
    margin: 10px auto;

    .react-tabs__tab-list {
      border-width: 0px;
    }

    .react-tabs__tab {
      width: 150px;
      border: 0px;
      bottom: 0px;
      border-radius: 20px;
      margin: 0px 10px;
      text-align: center;
      background: WhiteSmoke;
      box-shadow: none;
    }

    .react-tabs__tab--selected {
      background: #e6e6e6;
      box-shadow: 0 0 5px #686d75;
    }
  }
`;

const SchemaActions = styled.div`
  text-align: right;
  margin-bottom: 10px;
`;

const tabPanelStyle = { 
	flexGrow: 1,
	borderTop: '2px solid #cfcfcf',
};

const App = () => {
  const [data, setData] = useState({});
  const [schema, setSchema] = useState<ComponentSchemaWithId[]>([]);

  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  return (
    <AppRoot>
      <Heading>Form Builder</Heading>
      <AppTabs>
        <TabList className="appitsy-builder-header-tabs">
          <Tab>Designer</Tab>
          <Tab>Schema JSON</Tab>
          <Tab>Preview</Tab>
        </TabList>

        <TabPanel style={tabPanelStyle}>
          <Designer schema={schema} onSchemaChange={(s) => setSchema(s)} />
        </TabPanel>

        <TabPanel style={tabPanelStyle}>
          <div style={{ maxWidth: '900px', margin: '15px auto' }}>
            <SchemaActions>
              <Button name='copyToClipboard' display={{ leftIcon: 'clipboard' }} onClick={() => copyToClipboard(JSON.stringify(schema, null, "  "))} text='Copy' style='primary' />
            </SchemaActions>
            <div className="card card-body bg-light">
              <ReactJson src={schema} />
            </div>
          </div>
        </TabPanel>

        <TabPanel style={tabPanelStyle}>
					<div className="card card-body bg-light" style={{ maxWidth: '900px', margin: '15px auto' }}>
						<Renderer
							schema={schema}
							data={data}
							onDataChange={setData}
							onSubmit={(data) => alert(JSON.stringify(data))}
						/>
					</div>
        </TabPanel>
      </AppTabs>
    </AppRoot>
  );
};

export default App;
