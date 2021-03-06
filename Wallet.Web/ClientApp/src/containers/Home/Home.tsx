import React, { Component } from "react";
import 'antd/dist/antd.css'
import { Card, Button, Spin, Row, Modal, Progress } from 'antd';
import BalanceChart from "./child-components/BalanceChart";
import { LoadingOutlined } from '@ant-design/icons';
import {UserApi} from "../../api/user.service";
import {Goal} from "../../models/Goal";
import {GoalModal} from "./child-components";

interface HomeState {
    balanceValue: number,
    isLoading: boolean,
    showGoalCreationModal: boolean,
    historicalBalanceValues: number[],
    goals: Goal[]
}

interface HomeProps {

}

export class Home extends Component<HomeProps, HomeState> {

    constructor(props) {
        super(props);
        this.state = {
            balanceValue: 0,
            isLoading: true,
            showGoalCreationModal: false,
            historicalBalanceValues: [],
            goals: []
        };
    }

    showModal = () => this.setState({showGoalCreationModal: true});
    closeModal = () => this.setState({showGoalCreationModal: false});
    calculateGoalAccomplishment = (goalTargetValue: number) : number => {
        return Math.round((this.state.balanceValue / goalTargetValue) * 100);
    }

    componentDidMount() {
        UserApi.getUserAsync()
            .then(user => {
                this.setState({
                    balanceValue: user.balanceValue,
                    historicalBalanceValues: user.historicalBalances.map(r => r.balanceValue),
                    goals: user.goals.map((goal) => ({name: goal.name, targetValue: goal.targetValue, id: goal.id})),
                    isLoading: false
                });
                console.log(this.state.goals)
            });
    }

    render() {
        const antIcon = <LoadingOutlined style={{ fontSize: 48, color: '#09d3ac' }} spin />;
        if (this.state.isLoading) {
            return (
                <div className={'preloader-container'}>
                    <Spin indicator={antIcon} style={{margin: 'auto'}}/>
                </div>
            );
        }
       return (
           <div>
               <h1 className='home-header'>Savings</h1>
               <Row>
                   <Card style={{ width: 400, marginLeft: '75px' }} title={'Total balance'}>
                       <div className='balance-container'>
                           <div className='balance-value'>{this.state.balanceValue} PLN</div>
                           <Button className='custom-primary-button' type='primary' shape='round' onClick={this.showModal}>
                               Add goal
                           </Button>
                       </div>
                   </Card>
                   <Card style={{ width: 400, marginLeft: '75px'}} title={'Balance trend'}>
                       <BalanceChart historicalBalanceValues={this.state.historicalBalanceValues}/>
                   </Card>
               </Row>
                <Row>
                    <Card style={{width: 875, marginLeft: '75px', marginTop: '40px'}} title={'Goals'}>
                        <div className={'goals-container'}>
                            {
                                this.state.goals.map((goal: Goal, index: number) => {
                                    return (
                                        <div key={index} className={'goal'}>
                                            <Progress type="circle" strokeColor='#09d3ac' percent={this.calculateGoalAccomplishment(goal.targetValue)} />
                                            <div className='goal__name'>{goal.name}</div>
                                            <div className='goal__value'>{this.state.balanceValue} of {goal.targetValue} PLN</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Card>
                </Row>
               <GoalModal showModal={this.state.showGoalCreationModal} handleClose={this.closeModal} onCreate={null}/>
           </div>
       )
    }
}

export default Home;