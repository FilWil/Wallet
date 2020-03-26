import React from "react";
import { History } from "history";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { actionCreators, reducer } from "../../store/auth";

import 'antd/dist/antd.css'
import { Layout, Menu, Card, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

type HomeProps = ReturnType<typeof reducer>
    & typeof actionCreators
    & { readonly history: History };

const Home: React.FC<HomeProps> = ({
                                         history,
                                         resetState
                                     }) => {
    return (
        <div  style={{ width: 400, margin: '100px auto' }}>
            <h1>Balance</h1>
            <Card title={'Total balance'}>
                <div>
                    <div>23737 PLN</div>
                    <Button type='primary'>Add goal</Button>
                </div>
            </Card>
        </div>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
});

export default connect(mapStateToProps, actionCreators)(Home);
