import classNames from "classnames";
import { InputHTMLAttributes } from "react";

const InputField = (props: InputHTMLAttributes<HTMLInputElement>) => (
  props.type === "textarea" ?
    <textarea {...props as any} className={classNames('textarea textarea-md textarea-bordered', props.className)}></textarea> :
    <input {...props} className={classNames('input input-bordered', props.className)} />
);


export default InputField
