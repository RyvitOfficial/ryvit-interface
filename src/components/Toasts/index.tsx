import { toast } from 'sonner';

export type ToastType = 'success' | 'error' | 'loading' | 'process';

interface IToastBase {
  text: string;
  type: Exclude<ToastType, 'process'>;
}

interface IToastProcess<T> {
  type: 'process';
  text: string;
  promise: Promise<{ message: string; result?: T }>;
  setValues?: (value: T) => void;
  successMessage?: string;
  errorMessage?: string;
}

type IToast<T = any> = IToastBase | IToastProcess<T>;

const Toast = <T,>(props: IToast<T>) => {
  if (props.type === 'process') {
    toast.promise(props.promise, {
      loading: props.text,
      success: (data: any) => {
        // data = { message, result? }
        if (data.result && props.setValues) {
          props.setValues(data.result);
        }

        if (data.result) {
          return data.message;
        }

        return `Error: ${data.message}`;
      },
      error: (err: any) => {
        return err?.message || 'Something went wrong';
      },
    });
  } else {
    if (props.type === 'success') toast.success(props.text);
    else if (props.type === 'loading') toast.loading(props.text);
    else if (props.type === 'error') toast.error(props.text);
  }
};

export default Toast;
