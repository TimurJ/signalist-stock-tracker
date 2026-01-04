import CountrySelect from '@/components/forms/CountrySelect'
import { Label } from '@/components/ui/label'

import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form'

interface CountrySelectFieldProps<T extends FieldValues> {
  name: Path<T>
  label: string
  control: Control<T>
  error?: FieldError
  required?: boolean
}

const CountrySelectField = <T extends FieldValues>({
  name,
  label,
  control,
  error,
  required = false,
}: CountrySelectFieldProps<T>) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLocaleLowerCase()}` : false,
        }}
        render={({ field }) => <CountrySelect value={field.value} onChange={field.onChange} />}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      <p className="text-xs text-gray-500">Help us show market data and news relevant to you.</p>
    </div>
  )
}
export default CountrySelectField
