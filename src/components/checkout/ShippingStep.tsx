import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ShippingStepProps {
  onNext: () => void;
  onBack: () => void;
}

const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z
    .string()
    .min(4, "Postal code is required")
    .max(10, "Invalid postal code"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
});

type ShippingData = z.infer<typeof shippingSchema>;

const ShippingStep = ({
  onNext,
  onBack,
}: ShippingStepProps) => {
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

  const handleChange = (
    field: keyof ShippingData,
    value: string
  ) => {
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
      const fieldErrors: Partial<
        Record<keyof ShippingData, string>
      > = {};

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
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <Input
              value={formData.fullName}
              onChange={(e) =>
                handleChange("fullName", e.target.value)
              }
              placeholder="John Doe"
            />

            {errors.fullName && (
              <p className="mt-1 text-sm text-destructive">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Address
            </label>

            <Input
              value={formData.address}
              onChange={(e) =>
                handleChange("address", e.target.value)
              }
              placeholder="123 Main Street"
            />

            {errors.address && (
              <p className="mt-1 text-sm text-destructive">
                {errors.address}
              </p>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                City
              </label>

              <Input
                value={formData.city}
                onChange={(e) =>
                  handleChange("city", e.target.value)
                }
                placeholder="New York"
              />

              {errors.city && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.city}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Postal Code
              </label>

              <Input
                value={formData.postalCode}
                onChange={(e) =>
                  handleChange("postalCode", e.target.value)
                }
                placeholder="10001"
              />

              {errors.postalCode && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.postalCode}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone
            </label>

            <Input
              value={formData.phone}
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
              placeholder="9876543210"
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-destructive">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>

            <Button onClick={handleSubmit}>
              Continue to Payment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingStep;