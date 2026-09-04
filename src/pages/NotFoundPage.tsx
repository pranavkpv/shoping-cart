import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-muted-foreground">
        The page you are looking for does not exist.
      </p>

      <Button
        className="mt-6"
        render={<Link to="/products" />}
      >
        Back to Products
      </Button>
    </div>
  );
};

export default NotFoundPage;