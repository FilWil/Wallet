import { BaseService } from "./base.service";
import {Goal} from "../models/Goal";

class GoalService extends BaseService {
    private static _goalService: GoalService;

    private constructor(controllerName: string) {
        super(controllerName);
    }

    public static get Instance(): GoalService {
        return (this._goalService || (this._goalService = new this("goals")));
    }

    public async postUserGoalAsync(goal: Goal): Promise<any> {
        const { data } = await this.$http
            .post<Goal>("",
                {
                    name: goal.name,
                    targetValue: +goal.targetValue,
                    userId: sessionStorage.getItem("userId")
                }
            );
        return data;
    }
}

export const GoalApi = GoalService.Instance;
