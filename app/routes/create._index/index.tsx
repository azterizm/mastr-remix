import { Check, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Header from "~/components/Header"
import InputField from "~/components/InputField"
import PageTitle from "~/components/PageTitle"
import { LETTERS } from "~/constants/ui"
import { AddManuallyInput } from "~/types/api"
import { AddMode } from "~/types/ui"
import OptionsCollapse from "./OptionsCollapse"
import QuestionItem from "./QuestionItem"
import TestTypeTab from "./TestTypeTab"
import WriteWithAI from "./WriteWithAI"

const CreatePage = () => {
  const [testType, setTestType] = useState('mcqs')
  const [content, setContent] = useState<AddManuallyInput[]>([])
  const [editing, setEditing] = useState<{ index: number, content: AddManuallyInput } | null>(null)
  const [loading, setLoading] = useState(false)
  const [addMode, setAddMode] = useState<AddMode>(AddMode.None)
  const [chapterName, setChapterName] = useState('')
  const [subject, setSubject] = useState('')

  const handleDelete = (index: number) => {
    setContent(content.filter((_, i) => i !== index))
  }

  const handleEdit = (index: number) => {
    handleDelete(index)
    setEditing({ index, content: content[index] })
    setAddMode(AddMode.Manual)
  }

  return (
    <div className="min-h-screen container mx-auto pt-8 px-4 flex flex-col">
      <Header />
      <PageTitle title="Create" />
      <div className="form-control space-y-4 flex-1">
        <InputField type="textarea" name="headline" placeholder="Headline (e.g. Mastr Academy)" />
        <InputField type="text" name="subject" placeholder="Subject (e.g. Physics)" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <OptionsCollapse onChangeChapterName={setChapterName} />
        <TestTypeTab disabled={Boolean(addMode !== AddMode.None || loading || content.length)} testType={testType} setTestType={setTestType} />
        <QuestionList hideMessage={addMode !== AddMode.None} content={content} onDelete={handleDelete} onEdit={handleEdit} />
        {addMode === AddMode.Manual ? (
          <InputQuestionManually
            editing={editing}
            content={content}
            onAdd={(c) => (
              setContent([...content, c]),
              setAddMode(AddMode.None)
            )}
            onCancel={() => setAddMode(AddMode.None)}
          />
        ) : addMode === AddMode.Auto ? (
          <WriteWithAI
            subject={subject}
            chapterName={chapterName}
            content={content}
            onAdd={(c) => (
              setContent([...content, ...c]),
              setAddMode(AddMode.None)
            )}
            onCancel={() => setAddMode(AddMode.None)}
          />

        ) : null}

        {addMode === AddMode.None ? (
          <ActionButtons
            onAddManually={() => (setAddMode(AddMode.Manual), setEditing(null))}
            onWriteWithAI={() => setAddMode(AddMode.Auto)}
          />
        ) : null}
      </div>
      <SubmitButton loading={loading} />
    </div>
  )
}

const InputQuestionManually = ({ editing, onAdd, content, onCancel }: {
  onAdd: (content: AddManuallyInput, index?: number) => void,
  content: AddManuallyInput[],
  onCancel: () => void,
  editing: { index: number, content: AddManuallyInput } | null
}) => {
  const [options, setOptions] = useState<string[]>(editing?.content.options || ['', '', ''])
  const [question, setQuestion] = useState(editing?.content.question || '')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [containerRef])

  function handleAdd() {
    const o = options.filter(r => r.length)
    if (!question.length || !o.length) {
      return
    }

    onAdd({ question, options: o }, editing?.index)
  }

  function handleCancel() {
    if (editing?.index) {
      onAdd(editing.content)
    }
    onCancel()
  }

  return (
    <div ref={containerRef} className="card w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <p className="text-sm uppercase text-neutral/50">Question no. {content.length + 1}</p>
        <InputField type="text" name="question" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} />

        <div className="bg-base-300 p-4 rounded-box space-y-2">
          {options?.map((option, i) => (
            <div className="flex items-center gap-2">
              <span>{LETTERS[i]}.{' '}</span>
              <InputField className="flex-1" type="text" name="option" placeholder="Option" value={option} onChange={(e) => setOptions(options.map((o, j) => j === i ? e.target.value : o))} />
              <button onClick={() => setOptions(options.filter((_, j) => j !== i))} className="btn btn-error flex-1">Remove</button>
            </div>
          ))}
          <button onClick={() => setOptions([...options, ''])} className="btn btn-info btn-sm btn-block">Add new option</button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleCancel} className="btn btn-error">Cancel</button>
          <button onClick={handleAdd} className="btn-block flex-1 btn btn-success">{editing ? 'Update' : 'Add'} <Check /></button>
        </div>
      </div>
    </div>
  )
}

const QuestionList = ({ hideMessage, content, onDelete, onEdit }: { content: AddManuallyInput[], onDelete: (index: number) => void, onEdit: (index: number) => void, hideMessage?: boolean }) =>
  !content.length ? hideMessage ? null : (
    <p className="text-neutral/50 text-center !my-8">
      Add your first question by clicking the "Add Manually +" button or use the "Write with AI" button to generate questions
    </p>
  ) : content.map((c, i) => (
    <QuestionItem
      key={i}
      question={c.question}
      options={c.options}
      questionNo={i + 1}
      onDelete={() => onDelete(i)}
      onEdit={() => onEdit(i)}
    />
  ))

const ActionButtons = (props: {
  onAddManually?: () => void
  onWriteWithAI?: () => void
}) => (
  <>
    <button onClick={props.onAddManually} className="btn btn-lg btn-neutral">Add Manually +</button>
    <button onClick={props.onWriteWithAI} className="btn btn-lg btn-accent">Write with AI <Sparkles /></button>
  </>
)

const SubmitButton = ({ loading }: { loading: boolean }) => (
  <button disabled={loading} className="sticky bottom-4 left-0 !mt-8 !mb-4 btn btn-primary">Submit</button>
)

export default CreatePage

