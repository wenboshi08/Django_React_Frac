import React, {Component} from 'react';
import { Form, Input, Upload, Icon, Button} from "antd";

class NormalCreatePostForm extends React.Component {
    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    beforeUpload = () => false;

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        };

        return (
            <Form {...formItemLayout}>

                <Form.Item label="Project Name">
                    {getFieldDecorator('project_name', {
                        rules: [{required: true, message: 'Please input Project Name for this upload'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Measurement Records">
                    <div className="dropbox">
                        {getFieldDecorator('measurement_records', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                            rules: [{ required: true, message: 'Please upload a csv file.' }]
                        })(
                            <Upload.Dragger name="files" beforeUpload={this.beforeUpload}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single csv file upload. Please
                                use the provided csv template to format the data.</p>
                            </Upload.Dragger>,
                        )}
                    </div>
                </Form.Item>


            </Form>
        )
    }
}

const CreatePostForm = Form.create()(NormalCreatePostForm);
export default CreatePostForm;