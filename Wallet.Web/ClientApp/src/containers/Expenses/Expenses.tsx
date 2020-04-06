import React, {Component} from "react";
import {Col, Row, Table, Card, Button, Spin} from "antd";
import {ExpenseModal} from "./index";
import { LoadingOutlined } from '@ant-design/icons';
import {Expense} from "../../models/Expense";
import {UserApi} from "../../api/user.service";
import moment from "moment";

interface ExpensesProps {

}

interface ExpensesState {
    showExpenseCreationModal: boolean,
    expenses: Expense[],
    isLoading: boolean,
    tableData: any[]
}


export class Expenses extends Component<ExpensesProps, ExpensesState> {
    showModal = () => this.setState({showExpenseCreationModal: true});
    closeModal = () => this.setState({showExpenseCreationModal: false});

    constructor(props) {
        super(props);
        this.state = {
            showExpenseCreationModal: false,
            isLoading: true,
            expenses: [],
            tableData: []
        };
    }

    componentDidMount() {
        UserApi.getUserAsync()
            .then(user => {
                this.setState({
                    expenses: user.expenses.map((expenses) => ({name: expenses.name, value: expenses.value, id: expenses.id, createdAt: moment(expenses.createdAt).format('DD-MM-YYYY hh:mm')})),
                    isLoading: false
                });
                var data = [];

                this.state.expenses.forEach((expense, index) => {
                    var tableDataItem = {
                        key: index + 1,
                        ...expense
                    };
                    data.push(tableDataItem);
                });
                this.setState({tableData: data});
            });
    }

    getColumnsForTable() {
        return [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
            },
            {
                title: 'Date',
                dataIndex: 'createdAt',
                key: 'createdAt',
            },
        ];
    }

    render()  {
        const antIcon = <LoadingOutlined style={{ fontSize: 48, color: '#09d3ac' }} spin />;
        if (this.state.isLoading) {
            return (
                <div className={'preloader-container'}>
                    <Spin indicator={antIcon} style={{margin: 'auto'}}/>
                </div>
            );
        }
        return(
            <div>
                <h1 className='home-header'>Expenses</h1>
                <Row>
                    <Col>
                        <Card style={{ width: 400, marginLeft: '75px' }} title={'Last expense'}>
                            <div className='balance-container'>
                                <div className='balance-value'>2 PLN</div>
                                <Button className='custom-primary-button' type='primary' shape='round' onClick={this.showModal}>
                                    Add expense
                                </Button>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: 400, marginLeft: '75px'}} title={'Expenses history'}>
                            <Table dataSource={this.state.tableData} columns={this.getColumnsForTable()}/>
                        </Card>
                    </Col>
                </Row>
                <ExpenseModal showModal={this.state.showExpenseCreationModal} handleClose={this.closeModal} onCreate={null}/>
            </div>
        )
    }

}

export default Expenses;