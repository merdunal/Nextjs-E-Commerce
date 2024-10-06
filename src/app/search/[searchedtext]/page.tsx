"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/trpc/client";
import ProductListing from "@/components/ProductListing";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useIntersectionObserver } from "@/hooks/use-on-click-outside";
import { Product } from "@/payload-types";
import { Spinner } from "@/components/ui/spinner";

interface SearchPageParams {
  params: {
    searchedtext: string;
  };
}

const SearchPage = ({ params }: SearchPageParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { searchedtext } = params;

  // Decode the searched text to display it correctly
  const decodedSearchedText = decodeURIComponent(searchedtext);

  const { data, fetchNextPage, hasNextPage } =
    trpc.searchProducts.useInfiniteQuery(
      { search: decodedSearchedText, limit: 10 },
      { getNextPageParam: (lastPage) => lastPage.nextPage }
    );

  useEffect(() => {
    if (data) {
      const newProducts = data.pages.flatMap((page) => page.items);

      setProducts((prev) => {
        const existingProductIds = new Set(prev.map((p) => p.id));
        const filteredNewProducts = newProducts.filter(
          (p) => !existingProductIds.has(p.id)
        );
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

  // Determine if there are no products after the effect has run
  const noProductsMessage =
    products.length === 0
      ? "Aradığınız terime uygun ürün bulunmamaktadır."
      : null;

  return (
    <MaxWidthWrapper>
      <section className="py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 capitalize tracking-wide mb-12 md:mb-16">
          &quot;{decodedSearchedText}&quot; için Arama Sonuçları
        </h1>

        {noProductsMessage ? (
          <p className="text-center text-gray-500 mt-6">{noProductsMessage}</p>
        ) : (
          <>
            <div className="flex flex-col min-h-screen justify-between">
              {/* Product Grid */}
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
                {products.map((product, i) => (
                  <ProductListing
                    key={`product-${product.id}`}
                    product={product}
                    index={i}
                  />
                ))}
              </div>

              {/* Spinner or 'All Products Loaded' */}
              <div className="flex justify-center mt-6">
                {hasMore ? (
                  <div ref={loadMoreRef} className="text-center mt-6">
                    {loading && <Spinner />}
                  </div>
                ) : (
                  <p className="mt-10 mb-4 text-lg font-semibold text-gray-600 border-t border-gray-300 w-full text-center pt-4">
                    Tüm ürünler yüklendi
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </MaxWidthWrapper>
  );
};

export default SearchPage;
