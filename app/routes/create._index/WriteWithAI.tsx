import { Check, Loader2, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import InputField from '~/components/InputField'
import QuestionItem from './QuestionItem'
import { AddManuallyInput } from '~/types/api'

const WriteWithAI = ({ onAdd, content, onCancel, subject: subjectP, chapterName: chapterNameP }: {
  onAdd: (generatedQuestions: AddManuallyInput[]) => void,
  content: AddManuallyInput[],
  onCancel: () => void
  subject?: string
  chapterName?: string
  testType?: string
}) => {
  const [chapterName, setChapterName] = useState(chapterNameP || '')
  const [subject, setSubject] = useState(subjectP || '')
  const [numQuestions, setNumQuestions] = useState(10)
  const [loading, setLoading] = useState(false)
  const [generatedQuestions, setGeneratedQuestions] = useState<AddManuallyInput[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [containerRef])

  const handleGenerate = async () => {
    if (!chapterName || !subject || numQuestions < 1) {
      return
    }
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    const fakeGeneratedQuestions = Array(numQuestions).fill(0).map((_, i) => ({
      question: `Sample AI generated question ${i + 1} for ${subject} - ${chapterName}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D']
    }))
    setGeneratedQuestions(fakeGeneratedQuestions)
    setLoading(false)
  }

  const handleAdd = () => {
    onAdd(generatedQuestions)
    setGeneratedQuestions([])
  }

  const handleRemove = (index: number) => {
    setGeneratedQuestions(generatedQuestions.filter((_, i) => i !== index))
  }

  return (
    <div ref={containerRef} className="card w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Write with AI</h2>
        <p>Let AI do the work for you.</p>
        {!loading && generatedQuestions.length === 0 && (
          <form onSubmit={e => (e.preventDefault(), handleGenerate())} className='flex flex-col w-full gap-2 mt-2'>
            <InputField
              type="text"
              name="chapterName"
              placeholder="Chapter Name (e.g. Motion)"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              required
            />
            <InputField
              type="text"
              name="subject"
              placeholder="Subject (e.g. Physics)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <InputField
              type="number"
              name="numQuestions"
              placeholder="Number of Questions"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              min={1}
              max={10}
            />
            <div className="flex items-center gap-2 mt-4">
              <button onClick={onCancel} type='button' className="btn btn-error">Cancel</button>
              <button className="btn-block flex-1 btn btn-primary">
                Generate Questions <Sparkles />
              </button>
            </div>
          </form>
        )}
        {loading && (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <p>Generating questions...</p>
          </div>
        )}
        {!loading && generatedQuestions.length > 0 && (
          <>
            <div className="space-y-4">
              {generatedQuestions.map((q, i) => (
                <QuestionItem
                  className='!bg-base-300'
                  key={i}
                  question={q.question}
                  options={q.options}
                  questionNo={i + 1 + content.length}
                  onDelete={() => handleRemove(i)}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 sticky bottom-20 left-0">
              <button onClick={onCancel} className="btn btn-error">Cancel</button>
              <button onClick={handleAdd} className="btn-block flex-1 btn btn-success">
                Add <Check />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default WriteWithAI
