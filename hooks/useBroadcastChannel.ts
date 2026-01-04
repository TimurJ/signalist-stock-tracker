import { useEffect, useRef } from 'react'

export function useBroadcastChannel<T>(channelName: string, onMessage: (data: T) => void) {
  const channelRef = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    const channel = new BroadcastChannel(channelName)
    channelRef.current = channel

    channel.onmessage = (event: MessageEvent<T>) => {
      onMessage(event.data)
    }

    return () => {
      channel.close()
      channelRef.current = null
    }
  }, [channelName, onMessage])

  const postMessage = (message: T) => {
    channelRef.current?.postMessage(message)
  }

  return [postMessage]
}
