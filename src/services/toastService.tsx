
import React, { useReducer } from 'react';
import ReactDOM from "react-dom";
import { has } from 'lodash';
import { EuiGlobalToastList, EuiText } from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';

type State = {
  toasts: Toast[]
}
type Action = {
  payload: Toast,
  type: string
}
type ToasterComponentProps = {
  toastLifeTimeMs: number
}

let Toasts: Toast[] = [];
let Toaster: (props: Action) => void;
let idCounter = 0;
const ToasterId = 'cse_toaster';

function reducer(state: State, action: Action) {
  switch(action.type) {
    case "add":
      Toasts = Toasts.concat(action.payload);
      return {
        ...state,
        toasts: Toasts
      };

    case "remove":
      let removedToast = action.payload;
      Toasts = Toasts.filter((toast)=>(toast.id !== removedToast.id));
      return {
        ...state,
        toasts: Toasts
      };
    
    case "remove_all":
      Toasts = [];
      return {
        ...state,
        toasts: Toasts
      }
    default: 
      return state;
  }
}
function ToasterComponent(props: ToasterComponentProps) {
  const [state, dispatch] = useReducer(reducer,{
    toasts: Toasts
  });
  function dismissToast(toast: Toast) {
    dispatch({type: 'remove', payload: toast});
  }
  Toaster = dispatch;
  return <EuiGlobalToastList {...props} dismissToast={dismissToast} toasts={state.toasts}>
  </EuiGlobalToastList>;
}

async function renderToaster(div: HTMLElement) {
  if(Toaster) {
    return Promise.resolve(Toaster);
  }
  return new Promise((resolve, reject)=>{
    ReactDOM.render(<ToasterComponent toastLifeTimeMs={5000} />, div, () => {
      // assuming here that it has been set
      setTimeout(()=>{
        return resolve(Toaster);
      }, 1);
    });
  });
}

/**
 * Creates a global toaster if it does not exist.  Returns the dispatch method for the components reducer.
 * 
 * Usage example
 * 
 * Toaster({type:'add', payloast: toast});  // adds a toast
 * Toaster({type:'remove', payloast: toast}); // removes a toast
 * 
 * Payload interface === EuiToast properties - see https://elastic.github.io/eui/#/display/toast
 * Properties of  note listed below
 * {
 *   color: ["danger", "warning", "primary", "success"]
 *   title: ReactNode,
 *   text: ReactNode - optional
 * }
 */
function getToaster() {
  let div = document.getElementById(ToasterId);
  if(!div) {
    div = document.createElement('div');
    div.id = ToasterId;
    document.body.appendChild(div);
  }
  return renderToaster(div);
}
/**
 * 
 * @param {Object} toast - EuiToast object {title:ReactNode, color:["danger", "warning", "primary", "success"], text:ReactNode }
 */
export async function addToast(toast: Partial<Toast>) {
  if(!has(toast, 'id')) {
    toast.id = String((++idCounter));
  }
  const toaster: any = await getToaster();
  const remove = ()=>{
    toaster({ type: 'remove', toast });
  };
  toaster({ type: 'add', payload: toast });
  return remove;
}

export async function removeAllToasts() {
  const toaster: any = await getToaster();
  toaster({type: 'remove_all'});
}

export async function addDefaultToast(msg: string, error?: boolean) {
  const toastProps: Partial<Toast> = {
    title: !error ? 'Success' : 'Error',
    color: !error ? 'success' : 'danger'
  }
  return addToast({
    ...toastProps,
    text: <EuiText>{msg}</EuiText>,
  })
}