import './App.css';

import React, { useState } from 'react';

import classNames from 'classnames';

import { Form } from '@appitsy/forms';
import styled from '@emotion/styled';

import Designer from './Components/Designer';
import { ComponentSchemaWithId } from './Components/FormDesigner';
import { SchemaEditor } from './Components/SchemaEditor';
import { prepareJsonSchema } from './Utilities/ComponentTypes';

const AppRoot = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

const AppTabs = styled.div`
	display: flex;
  flex-direction: column;
	flex-grow: 1;

  ul.appitsy-builder-header-tabs {
    margin: 10px auto;
    border: none;

    li {
      width: 150px;
      border: 0px;
      bottom: 0px;
      border-radius: 20px;
      margin: 0px 10px;
      text-align: center;
      background: WhiteSmoke;
      box-shadow: none;

      &.active {
        background: #e6e6e6;
        box-shadow: 0 0 5px #a9afb8;
      }

      a.nav-item.nav-link {
        color: #495057;
        background: none;
        border: none;
      }
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

const TabContent = styled.div`
  height: 100%;
`;

const TabPane = styled.div`
  height: 100%;
`;

const App = () => {
  const [data, setData] = useState({});
  const [schema, setSchema] = useState<ComponentSchemaWithId[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  
  const tabPaneClasses = (idx: number) => classNames('tab-pane', idx === activeTab ? 'active': undefined);
  const tabButtonClasses = (idx: number) => classNames(idx === activeTab ? 'active': undefined);

  return (
    <AppRoot>
      <AppTabs>
        <ul className="nav nav-tabs appitsy-builder-header-tabs">
          <li className={tabButtonClasses(0)} onClick={() => setActiveTab(0)}><a href='#designer' className='nav-item nav-link' data-toggle="tab">Designer</a></li>
          <li className={tabButtonClasses(1)} onClick={() => setActiveTab(1)}><a href='#schemaEditor' className='nav-item nav-link' data-toggle="tab">Schema JSON</a></li>
          <li className={tabButtonClasses(2)} onClick={() => setActiveTab(2)}><a href='#preview' className='nav-item nav-link' data-toggle="tab">Preview</a></li>
        </ul>

        <TabContent className='tab-content'>
          <TabPane className={tabPaneClasses(0)} style={tabPanelStyle} id='designer'>
            <Designer schema={schema} onSchemaChange={(s) => setSchema(s)} />
          </TabPane>

          <TabPane className={tabPaneClasses(1)} style={tabPanelStyle} id='schemaEditor'>
            <Card>
              <SchemaEditor schema={schema} onSchemaChange={(s) => setSchema(s)} />
            </Card>
          </TabPane>

          <TabPane className={tabPaneClasses(2)} style={tabPanelStyle} id='preview'>
            <Card className="card card-body bg-light">
              <Form
                schema={prepareJsonSchema(schema)}
                data={data}
                onDataChange={setData}
                onSubmit={(data) => alert(JSON.stringify(data))}
              />
            </Card>
          </TabPane>
        </TabContent>
      </AppTabs>
    </AppRoot>
  );
};

export default App;
