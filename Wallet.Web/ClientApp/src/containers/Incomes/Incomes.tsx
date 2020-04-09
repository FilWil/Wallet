import React, {Component} from "react";
import {Col, Row, Table, Card, Button, Spin} from "antd";
import {IncomeModal} from "./index";
import { LoadingOutlined } from '@ant-design/icons';
import {Income} from "../../models/Income";
import {UserApi} from "../../api/user.service";
import moment from "moment";

interface IncomesProps {

}

interface IncomesState {
    showIncomeCreationModal: boolean,
    incomes: Income[],
    isLoading: boolean,
    tableData: any[]
}


export class Incomes extends Component<IncomesProps, IncomesState> {
    showModal = () => this.setState({showIncomeCreationModal: true});
    closeModal = () => this.setState({showIncomeCreationModal: false});

    constructor(props) {
        super(props);
        this.state = {
            showIncomeCreationModal: false,
            isLoading: true,
            incomes: [],
            tableData: []
        };
    }

    componentDidMount() {
        UserApi.getUserAsync()
            .then(user => {
                this.setState({
                    incomes: user.incomes.map((incomes) => ({name: incomes.name, value: incomes.value, id: incomes.id, createdAt: moment(incomes.createdAt).format('DD-MM-YYYY hh:mm')})),
                    isLoading: false
                });
                var data = [];

                this.state.incomes.forEach((income, index) => {
                    var tableDataItem = {
                        key: index + 1,
                        ...income
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
                <h1 className='home-header'>Incomes</h1>
                <Row>
                    <Col>
                        <Card style={{ width: 400, marginLeft: '75px' }} title={'Last income'}>
                            <div className='balance-container'>
                                <div className='balance-value'>2 PLN</div>
                                <Button className='custom-primary-button' type='primary' shape='round' onClick={this.showModal}>
                                    Add income
                                </Button>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: 400, marginLeft: '75px'}} title={'Incomes history'}>
                            <Table dataSource={this.state.tableData} columns={this.getColumnsForTable()}/>
                        </Card>
                    </Col>
                </Row>
                <IncomeModal showModal={this.state.showIncomeCreationModal} handleClose={this.closeModal} onCreate={null}/>
            </div>
        )
    }

}

export default Incomes;