import { useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, User, Phone, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { shippingSchema, type ShippingData } from "@/schemas/shipping.schema";

interface ShippingStepProps {
  onNext: () => void;
  onBack: () => void;
}

const ShippingStep = ({ onNext, onBack }: ShippingStepProps) => {
  const [formData, setFormData] = useState<ShippingData>({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingData, string>>
  >({});

  const handleChange = (field: keyof ShippingData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleSubmit = () => {
    const result = shippingSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ShippingData, string>> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ShippingData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onNext();
  };

  return (
    <Card className="mx-auto max-w-2xl border-border/60 shadow-xs">
      <CardHeader className="border-b border-border/40 bg-muted/20 px-4 py-4 sm:px-6">
        <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span>Shipping Address</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-6">
        <div className="grid gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> Full Name
            </label>
            <Input
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="John Doe"
              className={errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.fullName && (
              <p className="text-red-500 mt-1 font-medium">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Street Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Home className="h-3.5 w-3.5" /> Street Address
            </label>
            <Input
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="123 Main Street, Apt 4B"
              className={errors.address ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.address && (
              <p className="text-red-500 mt-1 font-medium">
                {errors.address}
              </p>
            )}
          </div>

          {/* City & Postal Code */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                City
              </label>
              <Input
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="New York"
                className={errors.city ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.city && (
                <p className="text-red-500 mt-1 font-medium">
                  {errors.city}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Postal Code
              </label>
              <Input
                value={formData.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                placeholder="10001"
                className={errors.postalCode ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.postalCode && (
                <p className="text-red-500 mt-1 font-medium">
                  {errors.postalCode}
                </p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> Phone Number
            </label>
            <Input
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
              className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-red-500 mt-1 font-medium">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/60">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>

          <Button onClick={handleSubmit} className="gap-2 font-semibold">
            <span>Continue to Payment</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingStep;