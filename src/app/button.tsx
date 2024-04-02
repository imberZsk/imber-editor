'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { create } from './actions'
import { Button } from '@/components/ui/button'
const Index = () => {
  const [state, dispatch] = useFormState(create, null)

  // console.log(state)

  function Submit() {
    const status = useFormStatus()
    return <button disabled={status.pending}>Submit</button>
  }

  return (
    <form action={create}>
      {/* <Button type="submit" disabled={pending} className={`${pending ? 'text-pink-400' : ''}`}>
        提交
      </Button> */}
      <Submit />
    </form>
  )
}

export default Index
