import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { FetchError } from "../types/types.ts";

export const fetchData = async <T, >(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  switch (config.method) {
    case "GET":
      return await axios.get<T>(config.url || "", config);
    case "POST":
      return await axios.post(config.url || "", config.data, config);
    case "PUT":
      return await axios.put(config.url || "", config.data, config);
    case "PATCH":
      return await axios.patch(config.url || "", config.data, config);
    case "DELETE":
      return await axios.delete(config.url || "", config);
    default:
      throw new Error(`Unexpected method: ${config.method}`);
  }
};

export function handleFetchError(error: unknown): FetchError {
  if (axios.isAxiosError(error)) {

    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          console.error("Bad request:", error.response);
          return {
            errStatus: status,
            message: error.response.data.caused_by,
          };
        case 401:
          return {
            errStatus: status,
            message:
              "Запрос неавторизован. Пожалуйста, авторизуйтесь и попробуйте ещё раз",
          };
        case 403:
          return {
            errStatus: status,
            message: "Запрещено. У вас нет прав, чтобы сделать запрос",
          };
        case 404:
          return {
            errStatus: status,
            message: `Не найдено, проверьте запрос: ${error.config?.url}`,
          };
        case 409:
          return {
            errStatus: status,
            message:
              "Аккаунт с этими данными уже существует",
          };
        case 500:
          return {
            errStatus: status,
            message: "Ошибка сервера. Пожалуйста, повторите запрос ещё раз",
          };
        default:
          console.error("API error: ", status, error);
          return {
            errStatus: status,
            message: error.response.statusText,
          };
      }
    } else if (error.request) {
      return {
        message: "Нет ответа от сервера. Пожалуйста, попробуйте ещё раз",
      };
    } else {
      console.error("API Error", error);
      return {
        message: `API error: ${error.message}`,
      };
    }
  } else {
    console.error("Non-Axios:", error);
    return {
      message: "Unknown Non-Axios error",
    };
  }
}