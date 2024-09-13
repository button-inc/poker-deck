import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

type Label = {
  id: number;
  name: string;
  color: string;
  description: string | null;
};
export type Issue = {
  id: number;
  number: number;
  title: string;
  body: string;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: Label[]; // Add labels array here
  created_at: string;
  updated_at: string;
};

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{issue.title}</CardTitle>
        <CardDescription>
          #{issue.number} opened by {issue.user.login}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {issue.body
            ? `${issue.body.slice(0, 100)}...`
            : "No description provided"}
        </p>
        <div className="flex flex-wrap gap-2">
          {issue.labels.map((label: Label) => (
            <Badge
              key={label.id}
              variant="secondary"
              style={{ backgroundColor: `#${label.color}` }}
            >
              {label.name}
            </Badge>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={issue.user.avatar_url} alt={issue.user.login} />
            <AvatarFallback>
              {issue.user.login.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{issue.user.login}</span>
        </div>
      </CardContent>
    </Card>
  );
}
