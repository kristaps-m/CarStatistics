import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://localhost:5000/api/car-speed-statistics/";
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as any;

    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorised"),
  get404Error: () => requests.get("buggy/not-found"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const Catalog = {
  list: () => requests.get("get-all"),
  details: (id: number) => requests.get(`${id}`),
  getAvgSpeedEachHourByDate: (theDate: string) =>
    requests.get(`get-avgspeed-bydate?searchByDate=${theDate}`),
  getObjectsBySpeedDatefromDateUntil: (
    speed: string,
    dateFrom: string,
    dateUntil: string
  ) =>
    requests.get(
      `get-filtered?speed=${speed}&dateFrom=${dateFrom}&dateUntil=${dateUntil}`
    ),
};

const Agent = {
  Catalog,
  TestErrors,
};

export default Agent;
