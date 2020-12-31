import './App.css';

import React, { useState } from 'react';

import { Renderer } from 'appitsy';
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from 'react-tabs';

import styled from '@emotion/styled';

import Designer from './Components/Designer';
import { ComponentSchemaWithId } from './Components/DesignerRenderer';
import { SchemaEditor } from './Components/SchemaEditor';

const AppRoot = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

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

const tabPanelStyle = { 
	flexGrow: 1,
	borderTop: '2px solid #cfcfcf',
};

const Card = styled.div`
  max-width: 900px;
  margin: 15px auto;
`;

const App = () => {
  const [data, setData] = useState({});
  const [schema, setSchema] = useState<ComponentSchemaWithId[]>([]);
  
  return (
    <AppRoot>
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
          <Card>
            <SchemaEditor schema={schema} onSchemaChange={setSchema} />
          </Card>
        </TabPanel>

        <TabPanel style={tabPanelStyle}>
					<Card className="card card-body bg-light">
						<Renderer
							schema={schema}
							data={data}
							onDataChange={setData}
							onSubmit={(data) => alert(JSON.stringify(data))}
						/>
					</Card>
        </TabPanel>
      </AppTabs>
    </AppRoot>
  );
};

export default App;
