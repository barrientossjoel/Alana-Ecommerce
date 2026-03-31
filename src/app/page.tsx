import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { db } from "@/db";
import { products } from "@/db/schema";

export default async function Home() {
  const allProducts = await db.select().from(products);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-8 py-16">
        {/* Section Title */}
        <div className="mb-12">
          <h1 className="text-3xl font-medium text-foreground tracking-wide mb-3">
            Todos los productos
          </h1>
          <p className="text-muted-foreground text-sm tracking-wide">
            Indumentaria, lencería & mucho más 🖤
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {allProducts.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              originalPrice={p.originalPrice}
              currentPrice={p.currentPrice}
              installmentsText={p.installmentsText}
              ribbonText={p.ribbonText}
              inStock={p.inStock ?? true}
              images={p.images}
            />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/productos" className="bg-transparent border border-primary text-primary px-8 py-3 text-sm font-semibold tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors uppercase">
            Ver más
          </Link>
        </div>

        {/* About Us Section */}
        <section className="mt-32 mb-16 max-w-3xl mx-auto text-center px-4 relative">
          <h2 className="text-2xl font-serif font-bold tracking-widest text-foreground mb-10 inline-block">
            SOBRE NOSOTROS
            <div className="w-1/2 h-[1px] bg-border mx-auto mt-4"></div>
          </h2>
          <div className="space-y-6 text-muted-foreground text-[15px] leading-relaxed font-light tracking-wide">
            <p>
              <strong className="text-foreground font-medium">Alana Indumentaria</strong> nace con la idea de acompañar a cada mujer en su día a día, ofreciendo prendas cómodas, versátiles y con estilo.
            </p>
            <p>
              Creemos que vestirse lindo no es solo una cuestión de moda, sino una forma de sentirse bien, segura y auténtica.
            </p>
            <p>
              Trabajamos con básicos y prendas seleccionadas que se adaptan a distintos momentos, combinando comodidad, tendencia y calidad, para que siempre tengas un outfit que te represente.
            </p>
            <p>
              En Alana buscamos que cada prenda sea esa elección fácil que te haga sentir bien desde que te la ponés.
            </p>
            <p className="text-lg italic text-muted-foreground pt-6">
              "Porque cuando te sentís linda, todo fluye mejor 💫"
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
