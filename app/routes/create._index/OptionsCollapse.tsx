

const OptionsCollapse = (props: {
  onChangeChapterName: (text: string) => void
}) => (
  <div className="collapse collapse-arrow bg-base-200">
    <input type="checkbox" name="options" />
    <div className="collapse-title text-xl font-medium">Show more options</div>
    <div className="collapse-content">
      <div className="flex items-center gap-2">
        <button className="btn btn-info flex-1">Voice Type</button>
        <button className="btn btn-error flex-1">Delete</button>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <input type="text" className="input flex-1 input-bordered" placeholder="Chapter Name" onChange={(e) => props.onChangeChapterName(e.target.value)} />
        <input type="number" className="input input-bordered" min='1' max='100' placeholder="#" />
      </div>
      <input type='date' className="input input-bordered flex-1 mt-2 w-full" />
    </div>
  </div>
);

export default OptionsCollapse;
