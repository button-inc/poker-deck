import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon?: ReactNode; // Can be any React component or JSX element
  title: string;
  description: string;
}

export const FeatureCard = ({
  icon,
  title,
  description,
}: FeatureCardProps): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
