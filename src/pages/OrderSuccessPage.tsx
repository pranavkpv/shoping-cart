import { CheckCircle2, ShoppingBag, ArrowRight, PackageCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const OrderSuccess = () => {
  // Generate a mock order ID
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <section className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg border-border/60 shadow-xs text-center overflow-hidden">
        <CardContent className="p-6 sm:p-10 space-y-6">
          {/* Success Animated Icon Badge */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-8 ring-emerald-500/5">
            <CheckCircle2 className="h-10 w-10 stroke-[2.2]" />
          </div>

          {/* Heading & Intro */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Order Placed Successfully!
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">
              Thank you for your purchase. We&apos;ve received your order and are getting it ready for shipment.
            </p>
          </div>

          {/* Order Details Badge */}
          <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3 text-left">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                <PackageCheck className="h-4 w-4 text-primary" /> Order Number
              </span>
              <span className="font-mono font-bold text-foreground">
                #{orderNumber}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-border/40">
              <span className="text-muted-foreground font-medium">
                Estimated Delivery
              </span>
              <span className="font-semibold text-foreground">
                3–5 Business Days
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              className="w-full sm:w-auto h-11 px-6 font-semibold gap-2 shadow-xs"
            >
              <Link to="/products">
                <ShoppingBag className="h-4 w-4" />
                <span>Continue Shopping</span>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto h-11 px-6 gap-2"
            >
              <Link to="/">
                <span>Back to Home</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default OrderSuccess;