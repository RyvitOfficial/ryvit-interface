import { toast } from 'sonner';

export type ToastType = 'success' | 'error' | 'loading' | 'process';

interface IToastBase {
  text: string;
  type: Exclude<ToastType, 'process'>;
}

interface IToastProcess<T> {
  type: 'process';
  text: string;
  promise: Promise<T>;
  setValues?: (value: T) => void;
  successMessage?: string | ((data: T) => string);
  errorMessage?: string;
}

type IToast<T = any> = IToastBase | IToastProcess<T>;

const Toast = (props: IToast) => {
  if (props.type === 'process') {
    toast.promise(props.promise, {
      loading: props.text,
      success: (data: any) => {
        if (props.setValues) {
          props.setValues(data);
        }

        return typeof props.successMessage === 'function'
          ? props.successMessage(data)
          : props.successMessage || 'Success';
      },
      error: props.errorMessage || 'Something went wrong',
    });
  } else {
    if (props.type === 'success') {
      toast.success(props.text);
    } else if (props.type === 'loading') {
      toast.loading(props.text);
    } else if (props.type === 'error') {
      toast.error(props.text);
    }
  }
};

export default Toast;
