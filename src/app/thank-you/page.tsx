"use client"
import { getServerSideUser } from '@/lib/payload-utils'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/get-payload'
import { notFound, redirect } from 'next/navigation'
import { Product, User } from '@/payload-types'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { useCart } from "@/hooks/use-cart";
import { PRODUCT_CATEGORIES } from "@/config";
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight, Check, X } from 'lucide-react'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const ThankYouPage = ({
  searchParams,
}: PageProps) => {
  const { items, removeItem } = useCart();

  return (
    <main className='relative lg:min-h-full'>
      <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
        <Image
          fill
          src='/checkout-thank-you.png'
          className='h-full w-full object-cover object-center'
          alt='thank you for your order'
        />
      </div>
{/*  */}
      <div>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24'>
          <div className='lg:col-start-2'>
            <p className='text-sm font-medium text-green-600 mb-3'>
              Siparişiniz oluşturuldu.
            </p>
            <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              Bizi tercih ettiğiniz için teşekkür ederiz.
            </h1>
            {/*  */}

            {
                items.map(({ product, quantity }) => {
                  const label = PRODUCT_CATEGORIES.find(
                    (c) => c.value === product.category
                  )?.label;

                  const { image } = product.images[0];

                  return (
                    <li key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24">
                          {typeof image !== "string" && image.url ? (
                            <Image
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              src={image.url}
                              alt="product image"
                              className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                            />
                          ) : null}
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  href={`/product/${product.id}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>

                            <div className="mt-1 flex text-sm">
                              <p className="text-muted-foreground">{label}</p>
                            </div>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {formatPrice(product.price)} x {quantity} {/* Show quantity */}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute right-0 top-0">
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>Anında teslimat</span>
                        </p>
                      </div>
                    </li>
                  );
                })}

                {/*  */}
            
                <p className='mt-2 text-base text-muted-foreground'>
    Siparişiniz başarıyla işleme alındı ve en kısa sürede paketiniz kargoya verilecektir. Fatura ve sipariş detaylarını size e-posta ile gönderdik.
</p>

<p className='mt-2 text-base text-muted-foreground'>
    Siparişinizi verdiğiniz için teşekkür ederiz! Şu anda siparişinizin hazırlanma sürecindeyiz. Kargo takibi ve teslimat bilgilerini size yakında ileteceğiz.
</p>

            

            <div className='mt-16 text-sm font-medium'>
              <div className='text-muted-foreground'>

              </div>
              <div className='mt-2 text-gray-900'>
              </div>


              <div className='mt-16 border-t border-gray-200 py-6 text-right'>
              <Link
              href="/"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Alışverişe devam et
              <ArrowRight className="h-4 w-4" />
            </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ThankYouPage