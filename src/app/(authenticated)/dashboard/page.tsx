import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Hi, <b>{session?.user?.name}!</b> Welcome to Poker Deck...
      </h1>

      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>How To</AlertTitle>
        <AlertDescription>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Use the sidebar &quot;team switcher&ldquo; dropdown to select a
              GitHub team.
            </li>
            <li>
              Use the sidebar &quot;Poker Deck&ldquo; link to view the
              team&apos;s issues needing estimation.
            </li>
            <li>
              Use the sidebar &quot;Sprint&ldquo; link to see team&apos;s
              current sprint issues.
            </li>
          </ol>
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Switch GitHub Teams</CardTitle>
            <CardDescription>
              Choose the team you want to work with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                In the sidebar, click the team switcher dropdown to see a list
                of available teams.
              </li>
              <li>Select the desired team.</li>
              <li>
                The app will show information relevant to the selected team.
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Access Poker Planning Issues</CardTitle>
            <CardDescription>View issues that need estimation</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                In the sidebar, click on &quot;Poker Deck&ldquo; link to view a
                list of issues that require estimation.
              </li>
              <li>
                Click on an issue to view the poker planning for that issue.
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Access Sprint Issues</CardTitle>
            <CardDescription>
              View and manage issues in the current sprint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                In the sidebar, click on &quot;Sprint Backlog&ldquo; link to
                view issues that are part of the ongoing sprint.
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
