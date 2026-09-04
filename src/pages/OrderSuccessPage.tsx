import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-3xl font-bold">
        Order Placed Successfully!
      </h1>

      <p className="mt-2 text-muted-foreground">
        Thank you for your order.
      </p>
      <Button
          className="mt-6"
          render={<Link to="/products" />}
        >
          Browse Products
        </Button>
    </div>
  );
};

export default OrderSuccess;