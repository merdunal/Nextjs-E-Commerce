import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const perks = [
    {
      name: "Adres",
      link: "",
      additionalPerks: [
        { name: "adres", link: "" },
        { name: "Tel No", link: "" },
        { name: "mail", link: "" },
      ],
    },
    {
      name: "Kurumsal",
      link: "",
      additionalPerks: [
        { name: "Gizlilik Politikası", link: "" },
        { name: "Teslimat Şartları", link: "" },
        { name: "Mesafeli Satış Sözleşmesi", link: "" },
      ],
    },
    {
      name: "Müşteri Hizmetleri",
      link: "",
      additionalPerks: [
        { name: "24/7 Müşteri Desteği", link: "" },
        { name: "Bayilik Başvurusu", link: "" },
        { name: "Teknik Servis", link: "" },
      ],
    },
  ];

  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Kaliteli{" "}
            <span className="text-green-600">elektronik ürün </span>
            ve{" "}
            <span className="text-green-600">aksesuarlar </span>
            İçin Pazar Yeriniz{" "}
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
    <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 justify-items-center">
      {perks.map((perk) => (
        <div key={perk.name} className="flex flex-col items-start">
          <div className="mt-6">
            <a
              href={perk.link} // Main perk link
              className="text-base font-medium text-gray-900 hover:text-blue-600 block mb-2"
            >
              {perk.name}
            </a>
            <ul className="mt-2 text-base text-gray-900">
              {perk.additionalPerks.map((additional) => (
                <li key={additional.name} className="mb-2">
                  <a
                    href={additional.link} // Link for each additional perk
                    className="hover:text-blue-600 block"
                  >
                    {additional.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </MaxWidthWrapper>
</section>


    </>
  );
}
