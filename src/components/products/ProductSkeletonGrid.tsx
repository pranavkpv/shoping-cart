import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProductSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="flex flex-col overflow-hidden border-border/60">
          {/* Image Placeholder */}
          <div className="h-52 w-full animate-pulse bg-muted/70" />

          {/* Details Placeholder */}
          <CardContent className="flex-1 space-y-3 p-4">
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-1/3 animate-pulse rounded bg-muted/80" />
              <div className="h-3.5 w-1/4 animate-pulse rounded bg-muted/80" />
            </div>
            <div className="h-5 w-4/5 animate-pulse rounded bg-muted/90" />
            <div className="space-y-1.5 pt-1">
              <div className="h-3 w-full animate-pulse rounded bg-muted/60" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-muted/60" />
            </div>
          </CardContent>

          {/* Footer Action Placeholder */}
          <CardFooter className="p-4 pt-0">
            <div className="h-9 w-full animate-pulse rounded-md bg-muted/80" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductSkeletonGrid;