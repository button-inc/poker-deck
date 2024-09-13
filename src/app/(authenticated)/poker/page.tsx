"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useSession } from "next-auth/react";
import { useSignalValue } from "signals-react-safe";
import { teamSignal } from "@/signals/team-signal";
import { fetchGitHub } from "@/actions/fetchGitHub";
import { Issue, IssueCard } from "@/components/issue/issue-card";
import { TeamMember } from "@/components/navbar/team-switcher";
import { teams } from "@/data/navbar/teams";
import { buildFilters } from "@/lib/buildFilters";
import { endpoints } from "@/constants/issues/endpoints";
import { filters } from "@/constants/issues/filters";

interface Estimate {
  memberId: number;
  value: string;
}

export default function Page() {
  const { data: session } = useSession();
  const userId = session?.user?.id ? Number(session?.user?.id) : 0;

  const teamSignalValue = useSignalValue(teamSignal);
  const labels = buildFilters(teamSignalValue, [filters.refinement.filter]);
  const endpoint = endpoints.getIssues.url + `?labels=${labels}`;

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [estimates, setEstimates] = useState<Estimate[]>([]);

  useEffect(() => {
    const activeTeam = teams.find((team) => team.filter === teamSignalValue);
    if (activeTeam) {
      setTeamMembers(activeTeam.members || []);
    } else {
      setTeamMembers([]);
    }

    const updateIssues = async () => {
      try {
        setLoading(true);
        const issues = await fetchGitHub(endpoint);
        setIssues(issues);
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      } finally {
        setLoading(false);
      }
    };

    updateIssues();
  }, [endpoint, teamSignalValue]);

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setEstimates([]);
  };

  const handleEstimateSubmit = (memberId: number, value: string) => {
    setEstimates((prev) => {
      const existingIndex = prev.findIndex((e) => e.memberId === memberId);
      if (existingIndex !== -1) {
        const newEstimates = [...prev];
        newEstimates[existingIndex] = { memberId, value };
        return newEstimates;
      }
      return [...prev, { memberId, value }];
    });
  };

  const renderIssueDetails = (issue: Issue) => (
    <div className="space-y-2">
      <p>
        <strong>Number:</strong> {issue.number}
      </p>
      <p>
        <strong>Created at:</strong>{" "}
        {new Date(issue.created_at).toLocaleString()}
      </p>
      <p>
        <strong>Updated at:</strong>{" "}
        {new Date(issue.updated_at).toLocaleString()}
      </p>
      <p>
        <strong>Labels:</strong>{" "}
        {issue.labels.map((label) => label.name).join(", ")}
      </p>
      <div>
        <strong>Body:</strong>
        <p className="whitespace-pre-wrap">{issue.body}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Poker Deck</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow overflow-hidden">
        <div className="flex flex-col overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4">On Deck</h2>
          <ScrollArea className="flex-grow">
            <div className="space-y-4 pr-4">
              {loading ? (
                <p>Loading issues...</p>
              ) : issues.length > 0 ? (
                issues.map((issue) => (
                  <div key={issue.id} className="w-full">
                    <Button
                      className="w-full text-left justify-start h-auto p-4 overflow-hidden"
                      variant="outline"
                      onClick={() => handleIssueClick(issue)}
                    >
                      <div className="w-full overflow-hidden">
                        <IssueCard issue={issue} />
                      </div>
                    </Button>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={`issue-${issue.id}`}>
                        <AccordionTrigger>View Details</AccordionTrigger>
                        <AccordionContent>
                          {renderIssueDetails(issue)}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))
              ) : (
                <p>No issues found</p>
              )}
            </div>
          </ScrollArea>
        </div>
        <div className="flex flex-col overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4">Estimates</h2>
          <ScrollArea className="flex-grow">
            {selectedIssue ? (
              <Card>
                <CardHeader>
                  <CardTitle className="break-words">
                    {selectedIssue.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center space-x-2"
                      >
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.login} />
                          <AvatarFallback>
                            {member.login.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="flex-grow truncate">
                          {member.login}
                        </span>
                        {userId === member.id ? (
                          <Input
                            type="text"
                            placeholder="Estimate"
                            className="w-20 flex-shrink-0"
                            value={
                              estimates.find((e) => e.memberId === member.id)
                                ?.value || ""
                            }
                            onChange={(e) =>
                              handleEstimateSubmit(member.id, e.target.value)
                            }
                          />
                        ) : (
                          <div className="w-20 flex-shrink-0 text-center">
                            {estimates.find((e) => e.memberId === member.id)
                              ?.value || "-"}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <Accordion type="single" collapsible className="w-full mt-4">
                    <AccordionItem value="issue-details">
                      <AccordionTrigger>View Issue Details</AccordionTrigger>
                      <AccordionContent>
                        {renderIssueDetails(selectedIssue)}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ) : issues.length > 0 ? (
              <p>Select an issue to start estimating</p>
            ) : (
              <p>No issues available needing estimating</p>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
