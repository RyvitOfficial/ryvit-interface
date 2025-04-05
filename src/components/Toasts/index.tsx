import { toast } from 'sonner';

export type ToastType = 'success' | 'error' | 'loading' | 'process';

interface IToastBase {
  text: string;
  type: Exclude<ToastType, 'process'>;
}

interface IToastProcess {
  type: 'process';
  text: string;
  promise: Promise<any>;
  successMessage?: string | ((data: any) => string);
  errorMessage?: string;
}

type IToast = IToastBase | IToastProcess;

const Toast = (props: IToast) => {
  if (props.type === 'process') {
    toast.promise(props.promise, {
      loading: props.text,
      success: (data: any) =>
        typeof props.successMessage === 'function'
          ? props.successMessage(data)
          : props.successMessage || 'Success',
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
