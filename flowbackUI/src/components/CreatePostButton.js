import React, {Component} from 'react';
import { Modal, Button, message} from "antd";
import CreatePostForm from "./CreatePostForm";
import * as Papa from 'papaparse';
import axios from 'axios';
import {CHEMTOCAS} from "../constants";

class CreatePostButton extends Component {
    constructor(){
        super();
        this.state={
            visible: false,
            confirmLoading: false,
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOK = () => {
        console.log('ok');
        this.form.validateFields((err, values) => {
            console.log('form values -> ', values);
            // post method should be used here
            if (!err) {
                this.setState({confirmLoading: true})
                const csvFile = values.measurement_records[0].originFileObj;
                console.log('csv file -> ', csvFile);
                Papa.parse(csvFile, {
                    header: true,
                    complete: this.postCSVRecord,
                })
            }
        });
    };

    //call back function to process the parsed results from papaparse
    postCSVRecord = (results) => {
        this.form.validateFields((err, values) => {
            const project_name = values.project_name;
            const data = results.data;
            const posts = data.map ((record) => {
                            const chemical_name = record['compound_name'];
                            const cas_number = CHEMTOCAS[chemical_name];
                            const project_record = {...record,
                                                    project_name: project_name,
                                                    cas_number: cas_number}
                            return axios({
                                method: 'post',
                                url: '../api/flowback/',
                                data: JSON.stringify(project_record),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                        })
        axios.all(posts)
            .then(
                axios.spread((...responses) =>{
                    console.log(responses);
                    return responses.map(response => response.status === 201);
                })
            )
            .then ((results) => {
                console.log(results);
                if (results.every(result => result ===true)) {
                    console.log('all post response OK');
                    return this.props.updateData();
                    } else {
                    throw new Error('Failed to create posts.');
                    }
                }
            )
            .then(() => {
                this.setState({visible: false, confirmLoading: false});
                this.form.resetFields();
                message.success('Post created successfully!');
            })
            .catch((e) => {
                console.error(e);
                message.error('Failed to create post.');
                this.setState({confirmLoading: false});
            })
        })
    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        })
    };

    getFormRef = (formInstance) => {
        this.form = formInstance;
    }

    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div style={{margin:"0px 5px"}}>
                <Button type="primary" onClick={this.showModal}>
                    Create New Post
                </Button>
                <Modal
                    title="Create New Post"
                    visible={visible}
                    onOk={this.handleOK}
                    okText='Submit'
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    >
                    <CreatePostForm ref={this.getFormRef} />
                </Modal>
            </div>
        );
    }
}

export default CreatePostButton;