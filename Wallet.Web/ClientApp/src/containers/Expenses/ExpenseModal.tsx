import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import {renderToastifyMsg} from "../../utils";
import {ExpenseApi} from "../../api/expense.service";
import {Expense} from "../../models/Expense";

interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface ExpenseModalProps {
    showModal: boolean
    handleClose,
    onCreate: (values: Values) => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
                                                 showModal,
                                                 handleClose
                                             }) => {
    const [form] = Form.useForm();

    function handleOk(){
        {
            form
                .validateFields()
                .then((values: Expense) => {
                    form.resetFields();
                    ExpenseApi.postUserExpenseAsync(values)
                        .then((response) => {
                            toast.success(
                                renderToastifyMsg('Expense successfully created')
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
            title="Add expense"
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
                name="expenseForm"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{required: true, message: 'Please input expense name!'}]}
                >
                    <Input type="text"/>
                </Form.Item>
                <Form.Item
                    label="Value"
                    name="value"
                    rules={[{required: true, message: 'Please input expense value in PLN!'}]}
                >
                    <Input type="number"/>
                </Form.Item>
            </Form>
        </Modal>
    )
};
export default ExpenseModal;