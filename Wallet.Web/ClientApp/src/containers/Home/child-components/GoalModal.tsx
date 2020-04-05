import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

interface GoalModalProps {
    showModal: boolean
    handleClose
}

interface GoalModalState {
}

export class GoalModal extends Component<GoalModalProps, GoalModalState> {
    handleOk = () => {
        console.log('ok')
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                title="Add goal"
                okText="Save goal"
                visible={this.props.showModal}
                onCancel={this.props.handleClose}
                onOk={this.handleOk}
            >
                <Form>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input goal name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="GoalValue"
                        name="goalValue"
                        rules={[{ required: true, message: 'Please input goal value in PLN!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default GoalModal;