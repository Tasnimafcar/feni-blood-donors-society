const groups = ['সব', 'A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−']
function BloodGroupFilter({ selected, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {groups.map((group) => (
        <button
          key={group}
          onClick={() => onSelect(group)}
          className={`flex-shrink:0 text-sm font-medium leading-none px-4 py-2 rounded-full border-2 flex items-center justify-center ${
            selected === group
              ? 'bg-rose-950 text-white border-rose-950'
              : 'bg-white text-rose-950 border-rose-200'
          }`}
        >
          {group}
        </button>
      ))}
    </div>
  )
}

export default BloodGroupFilter