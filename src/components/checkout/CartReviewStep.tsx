import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartReviewStepProps {
  onNext: () => void;
}

const CartReviewStep = ({ onNext }: CartReviewStepProps) => {
  // Replace this with your actual cart data / useCart hook
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 59.99,
      quantity: 1,
      image: "https://placehold.co/100x100",
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 89.99,
      quantity: 2,
      image: "https://placehold.co/100x100",
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 100 ? 0 : 10;

  const total = subtotal + shipping;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Cart Review</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-6 last:border-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-md object-cover"
              />

              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>

                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="w-8 text-center">
                  {item.quantity}
                </span>

                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button className="w-full" onClick={onNext}>
            Continue to Shipping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartReviewStep;