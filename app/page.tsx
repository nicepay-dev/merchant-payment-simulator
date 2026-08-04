import Link from "next/link";
import Image from "next/image";
import { AddToCartForm } from "../components/ui/add-to-cart-form";
import { PRODUCTS } from "@/lib/data/products";
import { formatIdr } from "@/lib/cart";

const FEATURED_PRODUCT = PRODUCTS[0];
const REGULAR_PRODUCTS = PRODUCTS.slice(1);

export default function CatalogPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-8 sm:px-6 lg:py-12">
      <section className="grid gap-5 rounded-[var(--radius-2xl)] border border-[var(--line)] bg-[var(--background-elevated)] p-4 shadow-[var(--shadow-soft)] sm:p-6 lg:grid-cols-[80px_1fr_0.95fr] lg:gap-6 lg:p-8">
        <div className="flex items-center justify-start border-b border-[var(--line)] pb-3 lg:hidden">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Discover</p>
        </div>
        <div className="hidden items-center justify-center border-r border-[var(--line)] pr-5 lg:flex">
          <p className="[writing-mode:vertical-rl] text-[2rem] font-medium tracking-[0.08em] text-[var(--foreground)] [transform:rotate(180deg)]">
            Discover
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand)] sm:text-sm">New release</p>
          <h1 className="mt-2 max-w-xl font-[family-name:var(--font-display)] text-4xl leading-[0.95] tracking-[0.04em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
            NEW
            <span className="block text-[#b5bcc5]">COLLECTION</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)] sm:mt-4 sm:text-base sm:leading-7 lg:text-lg">
            Made from 100% cotton, perfect for casual wear.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center">
            <AddToCartForm
              productId={FEATURED_PRODUCT.id}
              label="Add to cart"
              buttonClassName="w-full cursor-pointer rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 focus:ring-offset-white sm:w-auto"
            />
            <Link
              href="/cart"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)]"
            >
              <span aria-hidden="true">🛒</span>
              <span>View cart</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center rounded-[var(--radius-xl)] p-3 sm:p-6">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-[1.2rem] bg-white sm:rounded-[1.4rem]">
            <Image
              src={FEATURED_PRODUCT.imageSrc}
              alt={FEATURED_PRODUCT.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Latest products</p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">The picks for Nicy fans</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {REGULAR_PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="rounded-[var(--radius-xl)] border border-[var(--line)] bg-[var(--background-elevated)] p-5 shadow-[var(--shadow-soft)]"
            >
              <div className="relative aspect-square overflow-hidden rounded-[1.25rem] border border-[var(--line)] bg-[#f5f7fa]">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">{product.name}</h3>
                  <p className="mt-1 text-base font-medium text-[var(--brand)]">{formatIdr(product.price)}</p>
                </div>
                <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Nicy
                </span>
              </div>

              <AddToCartForm
                productId={product.id}
                label="Add to cart"
                formClassName="mt-4"
                buttonClassName="w-full cursor-pointer rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--brand)] hover:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 focus:ring-offset-white"
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
