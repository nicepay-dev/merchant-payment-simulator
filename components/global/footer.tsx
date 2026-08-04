import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--line)] bg-white/80">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-lg font-semibold tracking-tight">NICEPAY Shop</p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            This is a demo storefront that shows how to integrate NICEPAY hosted
            checkout into your application. This is for testing purposes only.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Shop
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/">Catalog</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Learn
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="https://docs.nicepay.co.id/en" target="_blank">
                Docs
              </Link>
            </li>
            <li>
              <Link
                href="https://docs.nicepay.co.id/en/nicepay-api-checkout"
                target="_blank"
              >
                Checkout API
              </Link>
            </li>
            <li>
              <Link
                href="https://docs.nicepay.co.id/en/payment-page-customization"
                target="_blank"
              >
                Checkout Customization
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/Toto35711/checkout-implementation-example"
                target="_blank"
              >
                Github
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
