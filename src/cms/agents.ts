import { fetchFromPayload } from "./payloadClient";
import { config } from "../config";

// Define the Agent type based on your Payload schema
export type Agent = {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
  // Add more fields as you expand your schema
};

// Function to get all agents
export const getAgents = () =>
  fetchFromPayload<{ docs: Agent[]; totalDocs: number }>("agents");

export const getAgentByName = (name: string = config.core.agentName) =>
  fetchFromPayload<{ docs: Agent[]; totalDocs: number }>(
    `agents?where[name][equals]=${encodeURIComponent(name)}`
  ).then((response) => {
    if (response.docs.length === 0) {
      throw new Error(`Agent with name "${name}" not found`);
    }
    return response.docs[0];
  });
