import { BaseService } from "./base.service";
import {Expense} from "../models/Expense";

class ExpenseService extends BaseService {
    private static _expenseService: ExpenseService;

    private constructor(controllerName: string) {
        super(controllerName);
    }

    public static get Instance(): ExpenseService {
        return (this._expenseService || (this._expenseService = new this("expenses")));
    }

    public async postUserExpenseAsync(expense: Expense): Promise<any> {
        const { data } = await this.$http
            .post<Expense>("",
                {
                    name: expense.name,
                    value: +expense.value,
                    userId: sessionStorage.getItem("userId")
                }
            );
        return data;
    }
}

export const ExpenseApi = ExpenseService.Instance;
