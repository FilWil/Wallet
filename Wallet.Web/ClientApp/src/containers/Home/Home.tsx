import React from "react";
import { History } from "history";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { actionCreators, reducer } from "../../store/auth";

type LoginProps = ReturnType<typeof reducer>
    & typeof actionCreators
    & { readonly history: History };

const Home: React.FC<LoginProps> = ({
                                         history,
                                         resetState
                                     }) => {
    return (
        <section >
            <section className='hero'>
               <div className='container'>
                   <div className="card">
                       <div className="card-content">
                           <div className="media">
                               <div className="media-left">
                                   <figure className="image is-48x48">
                                       <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
                                   </figure>
                               </div>
                               <div className="media-content">
                                   <p className="title is-4">Total balance</p>
                                   <p className="subtitle is-6">39.183 PLN</p>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="card">
                       <div className="card-content">
                           <div className="media">
                               <div className="media-left">
                                   <figure className="image is-48x48">
                                       <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
                                   </figure>
                               </div>
                               <div className="media-content">
                                   <p className="title is-4">Last expense</p>
                                   <p className="subtitle is-6">30 PLN</p>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="card">
                       <div className="card-content">
                           <div className="media">
                               <div className="media-left">
                                   <figure className="image is-48x48">
                                       <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
                                   </figure>
                               </div>
                               <div className="media-content">
                                   <p className="title is-4">Last income</p>
                                   <p className="subtitle is-6">10.130 PLN</p>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className='activity-wrapper'>Last activity</div>
                   <table className='table'>
                       <thead>
                       <tr>
                           <th>Activity</th>
                           <th>Icon</th>
                           <th>Amount</th>
                           <th>Currency</th>
                       </tr>
                       </thead>
                       <tbody>
                        <tr>
                            <td>-</td>
                            <td>Bought new socks at Amazon</td>
                            <td>30</td>
                            <td>PLN</td>
                        </tr>
                        <tr>
                            <td>+</td>
                            <td>Sold stocks</td>
                            <td>500</td>
                            <td>PLN</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>Bought new MacBook Pro in Apple store</td>
                            <td>3213</td>
                            <td>PLN</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>Bought new MacBook Pro</td>
                            <td>7000</td>
                            <td>USD</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>Bought new MacBook Pro</td>
                            <td>7000</td>
                            <td>PLN</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>Bought new MacBook Pro</td>
                            <td>6666</td>
                            <td>USD</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>Bought new MacBook Pro</td>
                            <td>32132</td>
                            <td>EURO</td>
                        </tr>
                       </tbody>
                   </table>
               </div>
            </section>
        </section>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
});

export default connect(mapStateToProps, actionCreators)(Home);
