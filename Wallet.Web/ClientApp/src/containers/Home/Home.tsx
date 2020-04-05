import React, { useEffect, useState } from "react";
import { History } from "history";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { actionCreators, reducer } from "../../store/auth";
import axios from 'axios';
import 'antd/dist/antd.css'
import { Card, Button, Spin } from 'antd';
import BalanceChart from "./child-components/BalanceChart";

type HomeProps = ReturnType<typeof reducer>
    & typeof actionCreators
    & { readonly history: History };

const Home: React.FC<HomeProps> = ({
                                         id,
                                         historicalBalanceValues
                                     }) => {
    const [balanceValue, setBalanceValue] = React.useState([]);

    const getUserRequest = async () => {
        let response = await axios({
            url: `https://localhost:44340/api/users/${id}`,
            method: 'get'
        });
        return response.data;
    };

    useEffect(() => {
        id = sessionStorage.getItem("userId");
        getUserRequest()
            .then(data => {
                setBalanceValue(data.item.balanceValue);

                if (!!data.item.historicalBalances){
                    historicalBalanceValues = data.item.historicalBalances.map(r => r.balanceValue);
                    console.log(historicalBalanceValues);
                }
            });
    }, [historicalBalanceValues]);

    return (
        <div >
            <h1 className='home-header'>Savings</h1>
            <div className='card-container'>
                <Card style={{ width: 400, marginLeft: '75px' }} title={'Total balance'}>
                    <div className='balance-container'>
                        <div className='balance-value'>{balanceValue} PLN</div>
                        <Button className='goal-button' type='primary' shape='round'>Add goal</Button>
                    </div>
                </Card>
                <Card style={{ width: 400, marginLeft: '75px'}} title={'Balance trend'}>
                    {
                        !!historicalBalanceValues ?
                            <BalanceChart chartData={[...historicalBalanceValues]}></BalanceChart> : <Spin/>
                    }
                </Card>

                { (historicalBalanceValues !== null && historicalBalanceValues !== undefined)}
            </div>
        </div>
    );
};
const mapStateToProps = (state: ApplicationState) => ({
    id: state.auth.id
});

export default connect(mapStateToProps, actionCreators)(Home);
