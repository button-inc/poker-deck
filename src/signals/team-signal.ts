import { signal } from "signals-react-safe";

import { teams } from "@/data/navbar/teams";

export const teamSignal = signal(teams[0].filter);
