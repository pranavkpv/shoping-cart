import { Search, RotateCcw, DollarSign, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  categories: string[];
  clearFilters: () => void;
}

const ProductFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  categories,
  clearFilters,
}: ProductFiltersProps) => {
  const hasActiveFilters = search || category !== "all" || minPrice || maxPrice;

  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-5 shadow-xs">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        <Filter className="h-3.5 w-3.5 text-primary" />
        <span>Filter Catalog</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-9 bg-background focus-visible:ring-1"
          />
        </div>

        {/* Category Select */}
        <div className="relative">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 capitalize cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="number"
            min="0"
            placeholder="Min price"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            className="pl-9 bg-background"
          />
        </div>

        {/* Max Price */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="number"
            min="0"
            placeholder="Max price"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            className="pl-9 bg-background"
          />
        </div>

        {/* Clear Filters Button */}
        <Button
          variant={hasActiveFilters ? "destructive" : "outline"}
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className="w-full gap-2 transition-all"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Clear Filters</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;