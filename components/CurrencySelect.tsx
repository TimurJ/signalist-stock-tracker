'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBroadcastChannel } from '@/hooks/useBroadcastChannel'
import { capitalise } from '@/lib/utils'
import { useCallback, useState } from 'react'

const CURRENCIES = {
  DOLLARS: 'DOLLARS',
  POUNDS: 'POUNDS',
  YEN: 'YEN',
} as const

const CHANGE_MESSAGES = {
  CURRENCY_CHANGE: 'CURRENCY_CHANGE',
} as const

type ChangeMessage = keyof typeof CHANGE_MESSAGES
type Currency = keyof typeof CURRENCIES
type BroadcastMessage<TType, TPayload> = {
  type: TType
  payload: TPayload
}

type CurrencyChangeMessage = BroadcastMessage<ChangeMessage, Currency>

const CURRENCY_VALUES = Object.values(CURRENCIES)

function isCurrency(value: string): value is Currency {
  return CURRENCY_VALUES.includes(value as Currency)
}

const CurrencySelect = () => {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES.POUNDS)

  const onCurrencyMessage = useCallback((message: CurrencyChangeMessage) => {
    if (message.type === CHANGE_MESSAGES.CURRENCY_CHANGE) {
      console.log('Changing Currency')
      setCurrency(message.payload)
    }
  }, [])

  const [postCurrencyMessage] = useBroadcastChannel('currency-channel', onCurrencyMessage)

  const handleCurrencyChange = (value: string) => {
    if (!isCurrency(value)) return

    setCurrency(value)
    postCurrencyMessage({ type: CHANGE_MESSAGES.CURRENCY_CHANGE, payload: value })
  }

  return (
    <>
      <Select value={currency} onValueChange={handleCurrencyChange}>
        <SelectTrigger className="text-white w-[100px]">
          <SelectValue placeholder="Currency" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-600 text-white">
          {Object.values(CURRENCIES).map((currency) => (
            <SelectItem
              value={currency}
              key={currency}
              className="focus:bg-gray-600 focus:text-white"
            >
              {capitalise(currency)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
export default CurrencySelect
