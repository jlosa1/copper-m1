import Image from "next/image";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatUsd, getProducts } from "@/lib/copper/catalog";

export default function Home() {
  const products = getProducts();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section
          data-testid="hero"
          id="top"
          className="bg-secondary text-secondary-foreground"
        >
          <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
            <div className="flex flex-col items-start gap-5">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Smart helpers for your Arizona home
              </h1>
              <p className="text-muted-foreground text-lg">
                From raw ideas to refined answers.
              </p>
              <Button asChild size="lg">
                <a href="#products">See products</a>
              </Button>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              {products.map((product) => (
                <Image
                  key={product.id}
                  src={product.cutout}
                  alt={`${product.name} ${product.type} in ${product.colors[0]}`}
                  width={1254}
                  height={1254}
                  priority
                  sizes="(min-width: 768px) 256px, 45vw"
                  className="h-auto w-full"
                />
              ))}
            </div>
          </div>
        </section>

        <section
          data-testid="products"
          id="products"
          className="mx-auto max-w-5xl scroll-mt-16 px-4 py-12 md:py-20"
        >
          <h2 className="mb-8 text-3xl font-bold tracking-tight">Products</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <Card
                key={product.id}
                data-testid="product-card"
                data-product={product.id}
              >
                <CardContent className="flex flex-col gap-4">
                  <div className="bg-secondary rounded-lg p-4">
                    <Image
                      src={product.cutout}
                      alt={`${product.name} ${product.type} in ${product.colors[0]}`}
                      width={1254}
                      height={1254}
                      sizes="(min-width: 768px) 400px, 90vw"
                      className="mx-auto h-auto w-full max-w-xs"
                    />
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-primary text-xl font-bold">
                      {formatUsd(product.priceUsd)}
                    </p>
                  </div>
                  <p className="text-muted-foreground">{product.type}</p>
                  <ul className="flex flex-col gap-2">
                    {product.features.slice(0, 3).map((feature) => (
                      <li key={feature.name}>
                        <span className="font-medium">{feature.name}.</span>{" "}
                        <span className="text-muted-foreground">
                          {feature.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <ul
                    aria-label="Available colors"
                    className="flex flex-wrap gap-2"
                  >
                    {product.colors.map((color) => (
                      <li key={color}>
                        <Badge variant="secondary">{color}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
