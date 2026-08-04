"use server";

import { buildSignedCartCookie, CART_COOKIE_NAME, getProductById, readCartFromCookie } from "@/lib/cart";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

export async function addToCartAction(formData: FormData) {
  const productIdValue = formData.get("productId");
  const productId = typeof productIdValue === "string" ? productIdValue : "";
  const quantity = Number(formData.get("quantity") ?? 1);
  const safeQuantity = Number.isFinite(quantity)
    ? Math.max(1, Math.floor(quantity))
    : 1;

  const product = getProductById(productId);
  if (!product) {
    return { success: false as const };
  }

  const cookieStore = await cookies();
  const existingCart = readCartFromCookie(cookieStore.get(CART_COOKIE_NAME)?.value);

  const nextItems = [...existingCart.items];
  const existing = nextItems.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += safeQuantity;
  } else {
    nextItems.push({ productId, quantity: safeQuantity });
  }

  cookieStore.set(CART_COOKIE_NAME, buildSignedCartCookie({ items: nextItems }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_WEEK_SECONDS,
  });

  revalidatePath("/", "page");
  revalidatePath("/cart", "page");

  return {
    success: true as const,
    productName: product.name,
  };
}
