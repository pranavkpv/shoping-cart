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
  return (
    <div className="mb-8 rounded-lg border bg-card p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Search */}
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        {/* Category */}
        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          className="h-10 rounded-md border bg-background px-3 text-sm"
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        {/* Minimum price */}
        <Input
          type="number"
          min="0"
          placeholder="Min price"
          value={minPrice}
          onChange={(event) =>
            setMinPrice(event.target.value)
          }
        />

        {/* Maximum price */}
        <Input
          type="number"
          min="0"
          placeholder="Max price"
          value={maxPrice}
          onChange={(event) =>
            setMaxPrice(event.target.value)
          }
        />

        {/* Clear */}
        <Button
          variant="outline"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;