
import classNames from 'classnames'

const TestTypeTab = ({ disabled, testType, setTestType }: { testType: string, setTestType: (type: string) => void, disabled?: boolean }) => (
  <div role="tablist" className="tabs tabs-bordered">
    {['MCQs', 'QA'].map((r, i) => (
      <button
        disabled={disabled && testType !== r.toLowerCase()}
        key={i}
        onClick={() => setTestType(r.toLowerCase())}
        role="tab"
        className={classNames('tab', { 'tab-active': r.toLowerCase() === testType })}
      >
        {r}
      </button>
    ))}
  </div>
)

export default TestTypeTab
