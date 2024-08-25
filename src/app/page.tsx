import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, LeafIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const perks = [
    {
      name: "Anında teslimat",
      Icon: ArrowDownToLine,
      description:
        "Satın aldığınız ürünleri anında kargo ile kapınızda teslim alın.",
    },
    {
      name: "Ürün garantisi",
      Icon: CheckCircle,
      description:
        "Tüm ürünlerimiz garanti kapsamındadır.",
    },
    {
      name: "Bize ulaşın",
      Icon: LeafIcon,
      description:
        "eticaret@gmail.com<br/>+90 123 456 7890",
    },
  ];

  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Kaliteli {" "}
            <span className="text-blue-600">elektronik ürün </span>
            ve {" "}
            <span className="text-blue-600">aksesuarlar </span>
            İçin Pazar Yeriniz {" "}
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Hoş geldiniz! sitemizde yer alan her ürün, ekibimiz tarafından titizlikle doğrulanmış olup en yüksek kalite standartlarına uygunluğu garanti edilmiştir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Tüm Ürünler
            </Link>
            <Button variant="ghost">Kalite Standartlarımız &rarr;</Button>
          </div>
        </div>

        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          href="/products"
          title="Tüm Ürünler"
       />
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg-gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground"
                     dangerouslySetInnerHTML={{ __html: perk.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
