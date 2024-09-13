"use client";
import { Github, Clock, BarChart } from "lucide-react";
import { SignIn } from "@/auth/sign-in";
import { FeatureCard } from "@/components/shared/feature-card";

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Poker Deck</h1>
        <SignIn />
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Poker Deck
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Pocker Deck, an asynchronous planning poker tool integrated with
            GitHub, allowing you to estimate tasks directly from your projects.
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Collaborate efficiently- through time, space, and GitHub.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Github className="h-10 w-10 text-primary" />}
            title="GitHub Integration"
            description="Seamlessly connects with your GitHub issues."
          />
          <FeatureCard
            icon={<Clock className="h-10 w-10 text-primary" />}
            title="Asynchronous Voting"
            description="Vote at your own pace. No need for everyone to be online simultaneously."
          />
          <FeatureCard
            icon={<BarChart className="h-10 w-10 text-primary" />}
            title="Insightful Analytics"
            description="Gain valuable insights from voting patterns and team performance metrics."
          />
        </section>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        🔐 2024 Poker Deck. All rights are yours!
      </footer>
    </div>
  );
}
