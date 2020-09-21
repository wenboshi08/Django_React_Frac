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
                <div>
                    <FormGroup>
                        <Label for="exampleText">Alias Area</Label>
                        <Input type="textarea" value={JSON.stringify(alias)}/>
                    </FormGroup>

                </div>

            </Container>

        )
    }
}

export default Header;

