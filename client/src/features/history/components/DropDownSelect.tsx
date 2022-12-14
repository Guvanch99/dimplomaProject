import CustomSelect from '../../../core/components/CustomSelect'

const DropDownSelect = ({ history }: {history: any[]}) => {
  const options = history.map(({ user }) => ({
    value: user,
    label: user
  }))

  return <CustomSelect options={options} currentValue={options?.[0].value}/>
}

export default DropDownSelect
