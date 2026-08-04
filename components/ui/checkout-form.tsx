"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { checkoutAction, type CheckoutActionState } from "../../app/cart/actions";

const initialState: CheckoutActionState = {
  error: null,
};

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Processing..." : "Checkout with NICEPAY"}
    </button>
  );
}

export function CheckoutForm() {
  const [state, formAction] = useActionState(checkoutAction, initialState);

  return (
    <form action={formAction} className="flex flex-col items-end gap-3">
      {state.error ? <p className="text-sm text-[var(--danger)]">{state.error}</p> : null}
      <CheckoutButton />
    </form>
  );
}
