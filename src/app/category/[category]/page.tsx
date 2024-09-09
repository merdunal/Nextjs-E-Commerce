"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/trpc/client";
import ProductListing from "@/components/ProductListing";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useIntersectionObserver } from "@/hooks/use-on-click-outside";
import { Product } from "@/payload-types";

interface CategoryPageParams {
  params: {
    category: string;
  };
}

const CategoryPage = ({ params }: CategoryPageParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [noProductsMessage, setNoProductsMessage] = useState<string | null>(null);

  const { category } = params;

  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = trpc.getInfiniteProductsByCategory.useInfiniteQuery(
    {
      category,
      limit: 8,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  useEffect(() => {
    if (data) {
      const newProducts = data.pages.flatMap(page => page.items);

      if (newProducts.length === 0 && products.length === 0) {
        setNoProductsMessage("Bu kategoriye ait ürün bulunmamaktadır.");
      } else {
        setNoProductsMessage(null);
      }

      setProducts(prev => {
        const existingProductIds = new Set(prev.map(p => p.id));
        const filteredNewProducts = newProducts.filter(p => !existingProductIds.has(p.id));
        return [...prev, ...filteredNewProducts];
      });
      
      setHasMore(!!data.pages[data.pages.length - 1].nextPage);
    }
  }, [data]);

  const loadMore = async () => {
    if (hasMore && !loading) {
      setLoading(true);
      await fetchNextPage();
      setLoading(false);
    }
  };

  const loadMoreRef = useIntersectionObserver(() => {
    if (hasMore && !loading) {
      loadMore();
    }
  });

  return (
    <MaxWidthWrapper>
      <section className="py-16">
        <h1 className="text-2xl flex justify-center font-bold text-gray-900 sm:text-3xl capitalize">
          {category.replace(/-/g, " ")}
        </h1>
        {noProductsMessage ? (
          <p className="text-center text-gray-500 mt-6">{noProductsMessage}</p>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
              {products.map((product, i) => (
                <ProductListing
                  key={`product-${product.id}`}
                  product={product}
                  index={i}
                />
              ))}
            </div>
            <div className="flex justify-center mt-6">
              {hasMore ? (
                <div ref={loadMoreRef} className="text-center mt-6">
                  {loading && "Yükleniyor..."}
                </div>
              ) : (
                <p>Tüm ürünler yüklendi</p>
              )}
            </div>
          </>
        )}
      </section>
    </MaxWidthWrapper>
  );
};

export default CategoryPage;
