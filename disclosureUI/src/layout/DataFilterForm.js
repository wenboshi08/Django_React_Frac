import React, {Component} from 'react';
import {Form, Row, Col, Input, Button, Icon} from 'antd';


class AdvancedSearchForm extends Component {
    getFields = () => {
        const {getFieldDecorator} = this.props.form;
        const children = [];
        children.push(
            <Col span={8} key={1}>
                <Form.Item label={'State Name'}>
                    {getFieldDecorator('state_name', {
                        rules: [
                            {
                                required: true,
                                message: 'Input something!',
                            },
                        ],
                    })(<Input placeholder="placeholder"/>)}
                </Form.Item>
            </Col>,
        );
        children.push(
            <Col span={8} key={2}>
                <Form.Item label={'Api Number'}>
                    {getFieldDecorator('api_number', {
                        rules: [
                            {
                                required: true,
                                message: 'Input something!',
                            },
                        ],
                    })(<Input placeholder="placeholder"/>)}
                </Form.Item>
            </Col>,
        );
        children.push(
            <Col span={8} key={3}>
                <Form.Item label={'Operator Name'}>
                    {getFieldDecorator('operator_name', {
                        rules: [
                            {
                                required: true,
                                message: 'Input something!',
                            },
                        ],
                    })(<Input placeholder="placeholder"/>)}
                </Form.Item>
            </Col>,
        );
        return children;
    }

    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            this.props.handleSubmit(values);
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row gutter={24}>
                    {this.getFields()}
                </Row>
                <Row>
                    <Col span={24} style={{textAlign: 'right'}}>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            Clear
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const DataFilterForm = Form.create()(AdvancedSearchForm);
export default DataFilterForm