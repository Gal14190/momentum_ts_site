import Swal, { SweetAlertOptions } from "sweetalert2";
import classes from "./alerts.module.css";
import { renderToString } from "react-dom/server";
import { ZodIssue } from "zod";

const alertTexts = {
  general: {
    done: "Done",
    cancel: "Cancel",
    save: "Save",
    continue: "Continue",
    saved: "Saved!",
    notSaved: "Not saved",
    copy: "Copy",
    copied: "Copied!",
    passwordCopied: "Password has been copied to clipboard.",
  },
  input: {
    enter: (item: string) => `Enter ${item}`,
  },
  error: {
    invalidData: "Invalid Data",
    requestFailed: "Request failed",
  },
  confirm: {
    areYouSure: "Are you sure?",
    changesWillNotBeSaved: "Your changes will not be saved.",
  },
};


type ToastAlertLoc =
  | "top"
  | "top-end"
  | "top-start"
  | "center"
  | "center-end"
  | "center-start"
  | "bottom"
  | "bottom-end"
  | "bottom-start";

/**
 * 
 * @param title title for alert
 * @param location choose location on the screen
 * @param timer delay in milliseconds
 * @param icon choose icon type
 * @returns toast alert
 */
export function toastAlert(
  title: string,
  location: ToastAlertLoc,
  timer?: number,
  icon?: "info" | "success" | "error" | "warning"
) {
  return Swal.fire({
    toast: true,
    title: title,
    customClass: {
      popup: classes.toast,
    },
    position: location,
    timer: timer ? timer : 3000,
    showConfirmButton: false,
    icon: icon ? icon : "info",
    inputAutoFocus: false,
  });
}

/**
 * 
 * @param alertBody react body as <div/> | <span/> | <p/> to show as errors - message
 * @param title title for alert, default as "Invalid Data"
 * @returns custom alert
 */
export function alertInvalidData(alertBody: React.ReactNode, title?: string) {
  return Swal.fire({
    title: title ? title : alertTexts.error.invalidData,
    customClass: {
      popup: classes.alert,
    },
    html: renderToString(alertBody),
    buttonsStyling: true,
    icon: "error",
  });
}

/**
 * 
 * @returns undo alert with options to confirm or deny
 */
export async function undoAlert() {
  const result = await Swal.fire({
    title: alertTexts.confirm.areYouSure,
    text: alertTexts.confirm.changesWillNotBeSaved,
    confirmButtonText: alertTexts.general.save,
    customClass: {
      popup: classes.alert,
    },
    showDenyButton: true,
    showCancelButton: true,
    icon: "warning",
  });

  if (result.isConfirmed) {
    Swal.fire({
      customClass: {
        popup: classes.alert,
      },
      title: alertTexts.general.saved,
      text: "",
      icon: "success",
    });
  } else if (result.isDenied) {
    Swal.fire({
      customClass: {
        popup: classes.alert,
      },
      title: alertTexts.general.notSaved,
      text: "",
      icon: "info",
    });
  }
}

/**
 * 
 * @param title title for alert
 * @param alertBody react body as <div/> | <span/> | <p/> to show as errors - message
 * @param options additional options for SweetAlert2
 * @param timer delay in milliseconds
 * @returns custom alert
 */
export function alertFailedRequest(
  title: string,
  alertBody?: React.ReactNode,
  options?: SweetAlertOptions,
  timer?: number
) {
  return Swal.fire({
    title: title,
    customClass: {
      popup: classes.alert,
    },
    html: renderToString(alertBody),
    showConfirmButton: false,
    timer: timer ? timer : 60000,
    icon: "error",
    ...options,
  });
}

/**
 * 
 * @param title title for alert
 * @param alertBody react body as <div/> | <span/> | <p/> to show as errors - message
 * @param options additional options for SweetAlert2
 * @param timer delay in milliseconds
 * @returns custom alert
 */
export function alertInfo(
  title: string,
  alertBody?: React.ReactNode,
  options?: SweetAlertOptions,
  timer?: number
) {
  return Swal.fire({
    title: title,
    customClass: {
      popup: classes.alert,
    },
    html: renderToString(alertBody),
    showConfirmButton: false,
    timer: timer ? timer : 3000,
    icon: "info",
    ...options,
  });
}

/**
 * 
 * @param title title for alert
 * @param alertBody react body as <div/> | <span/> | <p/> to show as errors - message
 * @param timer delay in milliseconds
 * @param options additional options for SweetAlert2
 * @returns custom alert
 */
export function alertSuccess(
  title: string,
  alertBody?: React.ReactNode,
  timer?: number,
  options?: SweetAlertOptions
) {
  return Swal.fire({
    title: title,
    customClass: {
      popup: classes.alert,
    },
    html: renderToString(alertBody),
    showConfirmButton: false,
    timer: timer ? timer : 1500,
    icon: "success",
    ...options,
  });
}

/**
 * Component for displaying Zod validation errors
 * @param errorList list of Zod validation errors
 */
export function ZodAlertList({ errorList }: { errorList: ZodIssue[] }) {
  return (
    <ul className={classes.alertComponent}>
      {errorList.map((err, i) => (
        <li className={classes.error} key={i}>
          <span className={classes.errorPath}>
            {err.path ? err.path.join(".") : "unknown"}:
          </span>
          <span className={classes.errorMessage}>{err.message}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * 
 * @param itemName name of parameter to edit
 * @param type input type for parameter
 * @returns value for parameter | false
 */
export async function alertInput(
  itemName: string,
  type: "text" | "checkbox" | "email" | "number" | "date" | "password" | "tel",
  miniTitle?: string
): Promise<string | boolean> {
  const result = await Swal.fire({
    title: `${alertTexts.input.enter(itemName)}`,
    text: miniTitle ? miniTitle : "",
    input: type,
    customClass: {
      popup: classes.alert,
    },
    showCancelButton: true,
    confirmButtonText: alertTexts.general.done,
    cancelButtonText: alertTexts.general.cancel,
    icon: "info",
  });
  return result.isConfirmed ? result.value : false;
}

/**
 * 
 * @param title Title for the selection alert
 * @param options Array of selectable options
 * @returns selected value | false
 */
export async function alertSelect(title: string, options: string[]): Promise<string | boolean> {
  const result = await Swal.fire({
    title: title,
    input: "select",
    inputOptions: options.reduce((acc, option) => {
      acc[option] = option;
      return acc;
    }, {} as Record<string, string>),
    customClass: {
      popup: classes.alert,
    },
    showCancelButton: true,
    confirmButtonText: alertTexts.general.done,
    cancelButtonText: alertTexts.general.cancel,
    icon: "info",
    didOpen: () => {
      document.querySelectorAll(".swal2-select option").forEach((el) => {
        (el as HTMLElement).style.color = "black";
        (el as HTMLElement).style.backgroundColor = "white";
      });
    },
  });

  return result.isConfirmed ? result.value : false;
}

/**
 * 
 * @param title title for alert
 * @param message message for alert
 * @param permissionText confirm button text
 * @param cancelText cancel button text
 * @returns boolean value
 */
export async function alertPermission(
  title: string,
  message: string,
  permissionText?: string,
  cancelText?: string | false
) {
  const result = await Swal.fire({
    title: title,
    text: message,
    icon: "warning",
    customClass: {
      popup: classes.alert,
    },
    showCancelButton: cancelText !== false,
    confirmButtonText: permissionText ? permissionText : alertTexts.general.continue,
    cancelButtonText: cancelText ? cancelText : alertTexts.general.cancel,
  });
  return result.isConfirmed;
}

/**
 * 
 * @param alert function to display an alert
 * @param func function to execute after alert
 */
export async function alertAndExecute(alert: Function, func: Function) {
  await alert().then(() => func());
}

export async function alertWithCopy(title: string, message: string) {
  await Swal.fire({
    title: title,
    html: `
     <div style="
      font-size: 1.5rem; 
      font-weight: bold; 
      color: var(--main-text-color); 
      background: rgba(42, 42, 42, 0.7); 
      padding: 15px; 
      border-radius: 8px; 
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
     ">
      ${message}
     </div>
     <button id="copyPasswordBtn" class="swal2-confirm swal2-styled" style="
      margin-top: 10px; 
      background: rgba(61, 65, 69, 0.66); 
      color: white; 
      padding: 10px 15px; 
      border-radius: 8px; 
      transition: all 0.3s ease-in-out;
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(5px);
     ">
     ${alertTexts.general.copy}
     </button>
    `,
    icon: "success",
    customClass: {
      popup: classes.alert,
    },
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: async () => {
      const copyBtn = document.getElementById("copyPasswordBtn");
      if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
          navigator.clipboard.writeText(message);
          await Swal.fire({
            title: alertTexts.general.copied,
            text: alertTexts.general.passwordCopied,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        });
      }
    },
  });
}
