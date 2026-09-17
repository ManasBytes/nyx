import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthField, AuthLayout, FormAlert } from '@/components/nyx'

export function ForgotPasswordPage() {
  const [sentTo, setSentTo] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSentTo(String(new FormData(event.currentTarget).get('email')))
  }

  return (
    <AuthLayout
      eyebrow="Credential Recovery"
      title="Reset your password"
      subtitle="We send a recovery link to the official email on your service record."
      headline="Locked out? Recovery stays inside the chain of custody."
      blurb="Reset links are single-use, time-bound and logged against your unit's audit trail."
      footer={
        <Link
          to="/login"
          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      }
    >
      {sentTo ? (
        <FormAlert tone="success">
          {`If an account exists for ${sentTo}, a recovery link is on its way. The link expires in 30 minutes.`}
        </FormAlert>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          <AuthField
            id="email"
            name="email"
            label="Official Email"
            type="email"
            autoComplete="email"
            placeholder="inspector@police.gov.in"
            required
          />
          <Button
            type="submit"
            variant="primary-container"
            size="lg"
            className="w-full font-semibold"
          >
            <Send />
            Send recovery link
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
