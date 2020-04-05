import {Expense} from "./Expense";
import {Income} from "./Income";
import {Goal} from "./Goal";
import {HistoricalBalance} from "./HistoricalBalance";

export class User {
    username: string;
    email: string;
    balanceValue: number;
    historicalBalances: HistoricalBalance[];
    expenses: Expense[];
    incomes: Income[];
    goals: Goal[];
}