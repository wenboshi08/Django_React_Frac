import React from 'react';

import {
    Container,
    DropdownMenu,
    DropdownToggle,
    Dropdown,
    DropdownItem,
    FormGroup,
    Label,
    Row,
    Col,
} from 'reactstrap';

import {Input, message} from 'antd';

const {Search} = Input;
const { TextArea } = Input;

const casList = require("../data/cas_list.json");

const aliasList = require("../data/castochemicalname.json");

var pubchem = require("../../node_modules/pubchem-access").domain("compound");

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            casNumber: "",
            alias: [],
        };
        this.getCas = this.getCas.bind(this);
    }

    getCas = (chemicalName) => {
        console.log(chemicalName);
        pubchem
            .setName(chemicalName)
            .getCas()
            .execute(this.setCas);
    }

    setCas = (data, status) => {
        if (status ===1) {
            this.setState({
            casNumber: data
        });
            this.props.handleSearch(this.state.casNumber);
            message.success('Found #CAS in PubChem successfully!');
        } else {
            message.error('Failed to find the #CAS in PubChem');
        }
    }


    render() {
        let alias = this.props.value in aliasList ? aliasList[this.props.value] : "chemical not found in database"
        return (
            <Container style={{textAlign: "center"}}>
                <h2>Explore Chemical Disclosure</h2>
                <h5>Quickly find geolocation information of specified chemicals</h5>
                <Row>
                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <div>
                            {/*<datalist id="caslist-data">*/}
                            {/*    {casList.map(element => {*/}
                            {/*        return <option value={element}></option>*/}
                            {/*    })}*/}
                            {/*</datalist>*/}
                            {/*<Input type="text"*/}
                            {/*       list="caslist-data"*/}
                            {/*       value={this.props.value}*/}
                            {/*       onChange={this.props.handleChange}*/}
                            {/*       placeholder="Type in CAS Number"*/}
                            {/*>*/}
                            {/*</Input>*/}
                            <Search
                                placeholder="Type in a Chemical Compound Name or CAS"
                                enterButton="Search"
                                size="large"
                                onSearch={value => this.getCas(value)}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <FormGroup>
                                <Label for="exampleText">Alias Display Area</Label>
                                <TextArea type="textarea" value={JSON.stringify(alias)}
                                />
                            </FormGroup>
                        </div>
                    </Col>
                </Row>

            </Container>

        )
    }
}

export default Header;

