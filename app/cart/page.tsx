import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { updateCartQuantityAction } from "./actions";
import {
  CART_COOKIE_NAME,
  formatIdr,
  getCartLines,
  readCartFromCookie,
} from "@/lib/cart";
import { CheckoutForm } from "@/components/ui/checkout-form";

export default async function CartPage() {
  const cookieStore = await cookies();
  const cart = readCartFromCookie(cookieStore.get(CART_COOKIE_NAME)?.value);
  const lines = getCartLines(cart);
  const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 lg:py-12">
      <header className="p-6 lg:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Checkout cart</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-[var(--foreground)] sm:text-4xl">Your cart</h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Please review your order details before proceeding to checkout.
        </p>
      </header>

      {lines.length === 0 ? (
        <section className="rounded-[var(--radius-xl)] border border-[var(--line)] bg-[#f7f9fc] p-6">
          <p className="text-[var(--muted)]">Your cart is empty.</p>
          <Link href="/" className="mt-3 inline-block text-sm font-semibold text-[var(--brand)]">
            Back to catalog
          </Link>
        </section>
      ) : (
        <>
          <section className="rounded-[var(--radius-xl)] border border-[var(--line)] bg-[var(--background-elevated)] p-6 shadow-[var(--shadow-soft)]">
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.product.id} className="grid items-center gap-4 border-b border-[#e8edf1] pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[80px_minmax(0,1fr)_180px_88px]">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-[var(--line)] bg-[#f5f7fa]">
                    <Image
                      src={line.product.imageSrc}
                      alt={line.product.imageAlt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg font-semibold text-[var(--foreground)]">{line.product.name}</p>
                    <p className="text-sm text-[var(--muted)]">{formatIdr(line.product.price)} each</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <form action={updateCartQuantityAction}>
                      <input type="hidden" name="productId" value={line.product.id} />
                      <input type="hidden" name="delta" value="-1" />
                      <button
                        type="submit"
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--line)] text-lg font-semibold text-[var(--muted)] transition hover:border-[var(--brand)] hover:text-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 focus:ring-offset-white"
                        aria-label={`Decrease quantity of ${line.product.name}`}
                      >
                        −
                      </button>
                    </form>
                    <span className="min-w-10 text-center text-sm font-semibold text-[var(--foreground)]">
                      {line.quantity}
                    </span>
                    <form action={updateCartQuantityAction}>
                      <input type="hidden" name="productId" value={line.product.id} />
                      <input type="hidden" name="delta" value="1" />
                      <button
                        type="submit"
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[var(--brand)] text-lg font-semibold text-white transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 focus:ring-offset-white"
                        aria-label={`Increase quantity of ${line.product.name}`}
                      >
                        +
                      </button>
                    </form>
                  </div>
                  <p className="text-left text-lg font-semibold text-[var(--foreground)] sm:text-right">
                    {formatIdr(line.lineTotal)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-[var(--line)] pt-4">
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-[var(--foreground)]">Order total</p>
                <p className="text-xl font-bold text-[var(--brand)]">{formatIdr(total)}</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="rounded-[var(--radius-xl)] border border-[var(--line)] bg-[var(--background-elevated)] p-5 shadow-[var(--shadow-soft)]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    Delivery
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">
                    Jakarta to Yogyakarta
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Estimated arrival in 2&ndash;3 business days.
                  </p>
                </div>
                <div className="rounded-full bg-[var(--brand)]/10 px-3 py-2 text-sm font-semibold text-[var(--brand)]">
                  Free shipping
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[#e8edf1] bg-[#f7f9fc] px-4 py-3 text-sm text-[var(--muted)]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4 shrink-0"
                >
                  <path d="M3 7h11v8H3z" />
                  <path d="M14 9h4l3 3v3h-7" />
                  <circle cx="7.5" cy="17" r="1.5" />
                  <circle cx="17" cy="17" r="1.5" />
                </svg>
                <span>Standard delivery • secure packaging • tracking included</span>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <CheckoutForm />
            </div>
          </section>
        </>
      )}
    </main>
  );
}
