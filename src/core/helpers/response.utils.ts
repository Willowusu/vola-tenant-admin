/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useAuthStore } from "src/stores/auth.store";
// import { useRouter } from "vue-router";
import Response from "../models/response.model";
import StatusConstants from "../data/status.constants";
import type { AxiosResponse } from "axios";

export default class ResponseUtil {
  static minimal<Type>(response: Response<Type>): Response<void> {
    const minimalResponse = new Response<void>(
      response.status,
      response.message,
      null
    );

    return minimalResponse;
  }

  static async handleAxiosCall<T>(
    func: () => Promise<AxiosResponse<any, any>>,
    config: any = {}
  ): Promise<Response<T>> {
    // const auth = useAuthStore();
    try {
      // if (!config.refreshToken) {
      //   await auth.checkAndWaitOnRefreshToken();
      // }

      const result = (await func()).data as Response<T>;

      console.log("here now");
      if (
        config.showSuccessNotification &&
        result.status === StatusConstants.SUCCESS
      ) {
        // Notify.create({
        //   color: "positive",
        //   icon: "done_all",
        //   message: result.message,
        // });
      }

      if (result.status !== StatusConstants.SUCCESS) {
        // Notify.create({
        //   type: "red",
        //   icon: "eva-alert-triangle-outline",
        //   message: result.message,
        // });
      }

      return result;
    } catch (error: any) {
      console.error("error", error);
      let message = "Could not complete this operation";
      // let icon = "warning";

      if (error.message === "Network Error") {
        message =
          'You"ve lost connection to the server. Please check your network connection';
        // icon = "signal_wifi_statusbar_connected_no_internet_4";
      } else if (error.response) {
        switch (error.response.status && config.refreshToken) {
          case StatusConstants.UNAUTHORIZED:
            message = "Season timeout";
            // const result = await auth.refreshToken();
            // if (result.status === StatusConstants.SUCCESS) {
            //   return await ResponseUtil.handleAxiosCall(func, config);
            // } else {
            //   const router = useRouter();
            //   router.replace("/auth/login");
            // }
            break;
          default:
            message = error.response.data.message;
            break;
        }
      }

      // Notify.create({
      //   message: message,
      //   icon: icon,
      //   type: "warning",
      // });

      console.error("error", error);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return new Response<any>("error", message, null);
    }
  }

  static showAlert(response: Response<void>) {
    return {
      show: true,
      message: response.message,
      status: response.status,
    };
  }
}
