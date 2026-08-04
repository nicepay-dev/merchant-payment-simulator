"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { addToCartAction } from "../../app/actions";

type AddToCartState = {
  success: boolean;
  productName?: string;
};

const initialState: AddToCartState = {
  success: false,
};

async function submitAddToCart(_prevState: AddToCartState, formData: FormData) {
  return addToCartAction(formData);
}

export function AddToCartForm({
  productId,
  label,
  buttonClassName,
  formClassName,
}: Readonly<{
  productId: string;
  label: string;
  buttonClassName: string;
  formClassName?: string;
}>) {
  const [state, formAction, pending] = useActionState(submitAddToCart, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(`${state.productName ?? "Item"} added to cart`);
    }
  }, [state.productName, state.success]);

  return (
    <form action={formAction} className={formClassName}>
      <input type="hidden" name="productId" value={productId} />
      <button type="submit" disabled={pending} className={buttonClassName}>
        {pending ? "Adding..." : label}
      </button>
    </form>
  );
}
