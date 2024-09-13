import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Could not find requested resource
      </p>
      <Button asChild>
        <Link href="/" className="flex items-center">
          <Home className="mr-2 h-4 w-4" />
          Return Home
        </Link>
      </Button>
    </div>
  );
}
