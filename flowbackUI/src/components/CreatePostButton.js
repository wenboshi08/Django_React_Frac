import React, {Component} from 'react';
import {Modal, Button, message} from "antd";
import CreatePostForm from "./CreatePostForm";
import * as Papa from 'papaparse';
import axios from 'axios';
import {CHEMTOCAS} from "../constants";

var pubchem = require("../../node_modules/pubchem-access").domain("compound");

class CreatePostButton extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            confirmLoading: false,
            projectName: '',
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
                this.setState({confirmLoading: true, projectName: values.project_name})
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
        const project_name = this.state.projectName;
        const data = results.data;
        let ajaxCallsRemaining = data.length;
        let processedRecord = [];
        for (let i = 0; i < data.length; i++) {
            const record = data[i];
            const chemical_name = record['compound_name'];
            pubchem
                .setName(chemical_name)
                .getCas()
                .execute((data, status) => {
                    const cas_number = data;
                    const project_record = {
                        ...record,
                        project_name: project_name,
                        cas_number: cas_number
                    };
                    processedRecord.push(project_record);
                    --ajaxCallsRemaining;
                    if (ajaxCallsRemaining <= 0) {
                        const posts = processedRecord.map((project_record) => axios({
                            method: 'post',
                            url: '../api/flowback/',
                            data: JSON.stringify(project_record),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }));
                        axios.all(posts)
                            .then(
                                axios.spread((...responses) => {
                                    console.log(responses);
                                    return responses.map(response => response.status === 201);
                                })
                            )
                            .then((results) => {
                                    console.log(results);
                                    if (results.every(result => result === true)) {
                                        console.log('all post response OK');
                                        return this.props.updateData();
                                    } else {
                                        throw new Error('Failed to create posts.');
                                    }
                                }
                            )
                            .then(() => {
                                this.setState({visible: false, confirmLoading: false, projectName: '',});
                                this.form.resetFields();
                                message.success('Post created successfully!');
                            })
                            .catch((e) => {
                                console.error(e);
                                message.error('Failed to create post.');
                                this.setState({confirmLoading: false, projectName: '',});
                            })

                    }
                })

        }
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
        const {visible, confirmLoading} = this.state;
        return (
            <div style={{margin: "0px 5px"}}>
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
                    <CreatePostForm ref={this.getFormRef}/>
                </Modal>
            </div>
        );
    }
}

export default CreatePostButton;