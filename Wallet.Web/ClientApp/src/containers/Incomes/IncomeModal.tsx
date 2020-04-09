import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import {renderToastifyMsg} from "../../utils";
import {IncomeApi} from "../../api/income.service";
import {Income} from "../../models/Income";

interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface IncomeModalProps {
    showModal: boolean
    handleClose,
    onCreate: (values: Values) => void;
}

const IncomeModal: React.FC<IncomeModalProps> = ({
                                                 showModal,
                                                 handleClose
                                             }) => {
    const [form] = Form.useForm();

    function handleOk(){
        {
            form
                .validateFields()
                .then((values: Income) => {
                    form.resetFields();
                    IncomeApi.postUserIncomeAsync(values)
                        .then((response) => {
                            toast.success(
                                renderToastifyMsg('Income successfully created')
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
            title="Add income"
            visible={showModal}
            onCancel={handleClose}
            onOk={handleOk}
            footer={[
                <Button className="modal-secondary-button" key="back" onClick={handleClose}>Cancel</Button>,
                <Button className="modal-primary-button" key="submit" type="primary" onClick={handleOk}>Save goal</Button>
            ]}
        >
            <Form
                form={form}
                name="incomeForm"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{required: true, message: 'Please input income name!'}]}
                >
                    <Input type="text"/>
                </Form.Item>
                <Form.Item
                    label="Value"
                    name="value"
                    rules={[{required: true, message: 'Please input income value in PLN!'}]}
                >
                    <Input type="number"/>
                </Form.Item>
            </Form>
        </Modal>
    )
};
export default IncomeModal;
