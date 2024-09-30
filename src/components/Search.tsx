"use client";
import { InputHTMLAttributes, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, X as CloseIcon } from "lucide-react";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {}

const Search = ({ ...props }: SearchProps) => {
  const [query, setQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search/${encodeURIComponent(query.trim())}`);
      setModalOpen(false); // Close modal after search
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  // Check if the screen size is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the width as needed for your breakpoint
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openModal = () => {
    setModalOpen(true);
    setQuery(''); // Clear the query when opening the modal
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative w-full lg:max-w-md xl:max-w-2xl">
      {isMobile ? (
        <button
        type="button"
        onClick={openModal}
        className="h-10 flex items-center justify-center rounded-md border border-gray-300 px-4 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all duration-200 hover:border-gray-500 hover:bg-gray-50"
      >
        <SearchIcon className="h-5 w-5 text-gray-500" />
      </button>
      
      ) : (
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-10 pl-4 pr-10 rounded-lg border border-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all duration-200 hover:border-gray-500 hover:bg-gray-50"
          placeholder="Ürün arayın..."
          {...props}
        />
      )}

      {/* Modal for Search Input */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-5 w-80 max-w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Search</h2>
              <CloseIcon className="h-6 w-6 cursor-pointer" onClick={closeModal} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-10 pl-4 pr-10 rounded-lg border border-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all duration-200"
              placeholder="Ürün arayın..."
              {...props}
            />
            <button
              type="button"
              onClick={handleSearch}
              className="mt-4 w-full h-10 rounded-lg bg-gray-500 text-white transition-all duration-200 hover:bg-gray-600"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
