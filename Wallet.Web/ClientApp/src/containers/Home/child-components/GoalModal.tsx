import React from 'react';
import { Modal, Form, Input } from 'antd';
import {GoalApi} from "../../../api/goal.service";
import {Goal} from "../../../models/Goal";
import { toast } from 'react-toastify';
import {renderToastifyMsg} from "../../../utils";

interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface GoalModalProps {
    showModal: boolean
    handleClose,
    onCreate: (values: Values) => void;
}

const GoalModal: React.FC<GoalModalProps> = ({
                                                 showModal,
                                                 handleClose
}) => {
    const [form] = Form.useForm();

    function handleOk(){
        {
            form
                .validateFields()
                .then((values: Goal) => {
                    form.resetFields();
                    GoalApi.postUserGoalAsync(values)
                        .then((response) => {
                            toast.success(
                                renderToastifyMsg('Goal successfully created')
                            );

                            console.log(response);
                        });
                    handleClose();
                })
                .catch(() => {
                    toast.error(
                        renderToastifyMsg(`Validation failed`)
                    );
                });
        }
    }

    return (
        <Modal
            title="Add goal"
            okText="Save goal"
            visible={showModal}
            onCancel={handleClose}
            onOk={handleOk}
        >
            <Form
                form={form}
                name="goalForm"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{required: true, message: 'Please input goal name!'}]}
                >
                    <Input type="text"/>
                </Form.Item>
                <Form.Item
                    label="TargetValue"
                    name="targetValue"
                    rules={[{required: true, message: 'Please input goal value in PLN!'}]}
                >
                    <Input type="number"/>
                </Form.Item>
            </Form>
        </Modal>
    )
};
export default GoalModal;