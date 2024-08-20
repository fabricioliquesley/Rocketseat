import { http, HttpResponse } from "msw";
import {
  GetDailyRevenueInPeriodQuery,
  GetDailyRevenueInPeriodResponse,
} from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    { date: "01/01/2024", receipt: 23000 },
    { date: "02/01/2024", receipt: 12000 },
    { date: "03/01/2024", receipt: 10000 },
    { date: "04/01/2024", receipt: 18000 },
    { date: "05/01/2024", receipt: 15600 },
    { date: "06/01/2024", receipt: 25000 },
    { date: "07/01/2024", receipt: 28000 },
  ]);
});
