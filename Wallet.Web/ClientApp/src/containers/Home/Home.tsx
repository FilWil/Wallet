import React, { useEffect, useState } from "react";
import { History } from "history";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { actionCreators, reducer } from "../../store/auth";
import axios from 'axios';
import 'antd/dist/antd.css'
import { Layout, Menu, Card, Button } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

type HomeProps = ReturnType<typeof reducer>
    & typeof actionCreators
    & { readonly history: History };

const Home: React.FC<HomeProps> = ({
                                         id,
                                     }) => {
    const [balanceValue, setBalanceValue] = React.useState([

    ]);
    const getUserRequest = () => {
        return axios({
            url: `https://localhost:44340/api/users/${id}`,
            method: 'get'
    }).then(response => {
            return response.data;
    })
    };

    useEffect(() => {
        id = sessionStorage.getItem("userId");
        console.log(id);
            getUserRequest()
                .then(data => {
                    setBalanceValue(data.item.balanceValue);
                    console.log(data.item);
                    console.log(balanceValue);
                });
        //Get User Balance dispatch action -> display balance
    });
    return (
        <div >
            <h1 className='home-header'>Savings</h1>
            <Card style={{ width: 400, marginLeft: '75px' }} title={'Total balance'}>
                <div className='balance-container'>
                    <div className='balance-value'>{balanceValue} PLN</div>
                    <Button className='goal-button' type='primary'>Add goal</Button>
                </div>
            </Card>
        </div>
    );
};
const mapStateToProps = (state: ApplicationState) => ({
    id: state.auth.id
});

export default connect(mapStateToProps, actionCreators)(Home);
