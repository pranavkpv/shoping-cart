import {
   ChevronLeft,
   ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
}

const Pagination = ({
   currentPage,
   totalPages,
   onPageChange,
}: PaginationProps) => {
   if (totalPages <= 1) {
      return null;
   }

   const handlePrevious = () => {
      if (currentPage > 1) {
         onPageChange(currentPage - 1);
      }
   };

   const handleNext = () => {
      if (currentPage < totalPages) {
         onPageChange(currentPage + 1);
      }
   };

   return (
      <div className="flex items-center justify-center gap-4">
         <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage === 1}
         >
            <ChevronLeft className="h-4 w-4" />
            Previous
         </Button>

         <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
         </span>

         <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
         >
            Next
            <ChevronRight className="h-4 w-4" />
         </Button>
      </div>
   );
};

export default Pagination;