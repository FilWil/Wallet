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
        <div  style={{ width: 400, margin: '100px auto' }}>
            <h1>Balance</h1>
            <Card title={'Total balance'}>
                <div>
                    <div>{balanceValue}</div>
                    <Button type='primary'>Add goal</Button>
                </div>
            </Card>
        </div>
    );
};
const mapStateToProps = (state: ApplicationState) => ({
    id: state.auth.id
});

export default connect(mapStateToProps, actionCreators)(Home);
