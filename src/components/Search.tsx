"use client";
import { InputHTMLAttributes, useState } from "react";
import { useRouter } from 'next/navigation';
import { Search as SearchIcon } from "lucide-react";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {}

const Search = ({ ...props }: SearchProps) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full lg:max-w-md xl:max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full h-10 pl-4 pr-10 rounded-lg border border-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all duration-200 hover:border-gray-500 hover:bg-gray-50"
        placeholder="Ürün arayın..."
        {...props}
      />
      <div 
        className="absolute right-3 top-2 text-gray-500 cursor-pointer transition-all duration-100 hover:text-gray-700 hover:scale-110"
        onClick={handleSearch}
      >
        <SearchIcon className="h-6 w-6 transition-all duration-200" />
      </div>
    </form>
  );
};

export default Search;
