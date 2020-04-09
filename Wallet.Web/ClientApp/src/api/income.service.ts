import { BaseService } from "./base.service";
import {Income} from "../models/Income";

class IncomeService extends BaseService {
    private static _incomeService: IncomeService;

    private constructor(controllerName: string) {
        super(controllerName);
    }

    public static get Instance(): IncomeService {
        return (this._incomeService || (this._incomeService = new this("incomes")));
    }

    public async postUserIncomeAsync(income: Income): Promise<any> {
        const { data } = await this.$http
            .post<Income>("",
                {
                    name: income.name,
                    value: +income.value,
                    userId: sessionStorage.getItem("userId")
                }
            );
        return data;
    }
}

export const IncomeApi = IncomeService.Instance;
