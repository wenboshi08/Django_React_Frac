import React from 'react';

import {
    Container,
    DropdownMenu,
    DropdownToggle,
    Dropdown,
    DropdownItem,
    Input,
    FormGroup,
    Label,
    Row,
    Col,
} from 'reactstrap';

const casList = require("../data/cas_list.json")

const aliasList = require("../data/castochemicalname.json")

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alias: [],
        }
    }


    render() {
        let alias = aliasList[this.props.value]
        return (
            <Container style={{textAlign: "center"}}>
                <h2>Explore Chemical Disclosure</h2>
                <div>Quickly find geolocation information of specified chemicals</div>
                <Row>
                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <div>
                            <datalist id="caslist-data">
                                {casList.map(element => {
                                    return <option value={element}></option>
                                })}
                            </datalist>
                            <Input type="text"
                                   list="caslist-data"
                                   value={this.props.value}
                                   onChange={this.props.handleChange}>
                            </Input>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <FormGroup>
                                <Label for="exampleText">Alias Area</Label>
                                <Input type="textarea" value={JSON.stringify(alias)}/>
                            </FormGroup>
                        </div>
                    </Col>
                </Row>

            </Container>

        )
    }
}

export default Header;

