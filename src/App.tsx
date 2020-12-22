import React, { useState } from 'react';
import './App.css';
import Designer from './Components/Designer';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Renderer } from 'appitsy';
import { ComponentSchemaWithId } from './Components/DesignerRenderer';
import styled from '@emotion/styled';

const AppTabs = styled(Tabs)`
    display: flex;
    flex-direction: column;
    height: 100%;

    .appitsy-builder-header-tabs {
        .react-tabs__tab-list{
            padding: 0px 200px;
        }
    
        .react-tabs__tab {
            width: 33.33%;
            text-align: center;
            background: WhiteSmoke;
        }
    
        .react-tabs__tab--selected {
            background: lightgray;
        }
    
        .react-tabs__tab-list {
            border-width: 0px;
        }
    
        .react-tabs__tab {
            border-width: 0px 1px 0px 1px;
            border-color: #909090;
            border-radius: 0px;
            bottom: 0px;
    
            &:last-child {
                border-width: 0px 0px 0px 1px;
            }
    
            &:first-child {
                border-width: 0px 1px 0px 0px;
            }
        }
    }
`;

const App = () => {
    const [data, setData] = useState({});
    const [schema, setSchema] = useState<ComponentSchemaWithId[]>([]);

    return (
        <AppTabs>

            <TabList className='appitsy-builder-header-tabs' width='60%'>
                <Tab>Designer</Tab>
                <Tab>Schema JSON</Tab>
                <Tab>Preview</Tab>
            </TabList>

            <TabPanel style={{flexGrow: 1}}>
                <Designer schema={schema} onSchemaChange={s => setSchema(s)} />
            </TabPanel>

            <TabPanel style={{flexGrow: 1}}>
                JSON
            </TabPanel>

            <TabPanel style={{flexGrow: 1}}>
                <Renderer schema={schema} data={data} onDataChange={setData} onSubmit={data => alert(JSON.stringify(data))} />
            </TabPanel>
        </AppTabs>
    );
};

export default App;
