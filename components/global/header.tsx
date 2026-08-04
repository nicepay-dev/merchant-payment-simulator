import { readCartFromCookie, CART_COOKIE_NAME } from "@/lib/cart";
import { cookies } from "next/headers";
import Link from "next/link";

export async function Header() {
  const cookieStore = await cookies();
  const cart = readCartFromCookie(cookieStore.get(CART_COOKIE_NAME)?.value);
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:py-5">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl font-semibold tracking-tight">NICEPAY Shop</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-lg border border-[#90afbd] bg-[#f8fcff] px-4 py-2 text-sm font-semibold text-[var(--brand)]"
          >
            <span aria-hidden="true">🛒</span>
            <span>Checkout</span>
            <span className="rounded-full bg-[#e11d48] px-2 py-0.5 text-xs text-white">{itemCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
