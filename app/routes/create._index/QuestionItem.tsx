import classNames from "classnames";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { LETTERS } from "~/constants/ui";


export default function QuestionItem(props: {
  question: string
  options?: string[]
  questionNo?: number
  onDelete?: () => void
  onEdit?: () => void
  className?: string
}) {
  const [expand, setExpand] = useState(false)
  return (
    <div className={classNames('card w-full bg-base-200 shadow-xl', props.className)}>
      <div onClick={() => setExpand(!expand)} className="card-body cursor-pointer">
        <p className="text-sm uppercase text-neutral/50">Question no. {props.questionNo || 1}</p>
        <p>{props.question}</p>
        <div className="card-actions justify-end">
          <span className="text-sm">{props.options?.length || 1} options</span>
          <ChevronDown size={24} className={classNames({ 'rotate-180': expand, 'rotate-0': !expand }, 'transition-transform duration-300')} onClick={() => setExpand(!expand)} />
        </div>
        {expand ? (
          <div className="bg-base-300 p-4 rounded-box">
            {props.options?.map((option, i) => (
              <p key={i} className="text-sm pb-4">{LETTERS[i]}. {option}</p>
            ))}
            <div className="flex items-center gap-2">
              {!props.onEdit ? null : (
                <button onClick={props.onEdit} className="btn btn-info flex-1">Edit</button>
              )}
              {!props.onDelete ? null : (
                <button onClick={props.onDelete} className="btn btn-error flex-1">Remove</button>
              )}
            </div>
          </div>

        ) : null}
      </div>
    </div>
  )
}

