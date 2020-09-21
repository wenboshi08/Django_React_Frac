import React from 'react';
import TopBar from "./layout/TopBar";
import {Tabs, Icon} from 'antd';
const { TabPane } = Tabs;
import TransformationApp from "./layout/TransformationApp";
import DataFilterApp from "./layout/DataFilterApp";

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <TopBar/>
                <Tabs>
                    <TabPane tab={<span>
                        <Icon type="dashboard" theme="twoTone" />
                        Transformation App
                    </span>}
                    key="1">
                        <TransformationApp />
                    </TabPane>
                    <TabPane tab={<span>
                        <Icon type="database" theme="twoTone" />
                        DataFilter App
                    </span>}
                    key="2">
                        <DataFilterApp />
                    </TabPane>
                </Tabs>

            </div>

        )
    }
}

export default App;
