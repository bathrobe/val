import { fetchFromPayload } from "./payloadClient";
import { config } from "../config";

export const getCurrentAgent = () => {
  const name = config.core.agentName;
  return fetchFromPayload<{ docs: any[]; totalDocs: number }>(
    `agents?where[name][equals]=${encodeURIComponent(name)}`
  ).then((response) => {
    if (response.docs.length === 0) {
      throw new Error(`Agent with name "${name}" not found`);
    }
    return response.docs[0];
  });
};

export const getLatestAgentJournal = (agentId: string) => {
  return fetchFromPayload<{ docs: any[]; totalDocs: number }>(
    `journals?where[agent][equals]=${encodeURIComponent(
      agentId
    )}&sort=-createdAt&limit=1`
  ).then((response) => {
    return response.docs[0];
  });
};

export const getAgentTask = (agentId: string, taskTitle: string) => {
  return fetchFromPayload<{ docs: any[]; totalDocs: number }>(
    `tasks?where[agent][equals]=${encodeURIComponent(
      agentId
    )}&where[title][equals]=${encodeURIComponent(
      taskTitle
    )}&sort=-createdAt&limit=1`
  ).then((response) => {
    return response.docs[0];
  });
};

export const postTweetToPayload = (content: string, taskTitle: string) => {
  return getCurrentAgent().then((agent) => {
    return fetchFromPayload<{ docs: any[]; totalDocs: number }>(
      `tasks?where[title][equals]=${encodeURIComponent(taskTitle)}`
    ).then((tasksResponse) => {
      const task = tasksResponse.docs.length > 0 ? tasksResponse.docs[0] : null;

      return fetchFromPayload<any>("posts", {
        method: "POST",
        body: {
          content,
          agent: agent.id,
          task: task?.id || null,
        },
      });
    });
  });
};

export const getRecentPosts = (agentId: string, limit: number = 5) => {
  return fetchFromPayload<{ docs: any[]; totalDocs: number }>(
    `posts?where[agent][equals]=${encodeURIComponent(
      agentId
    )}&sort=-timeCreated&limit=${limit}`
  ).then((response) => {
    return response.docs;
  });
};
