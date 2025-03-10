import {
  getCurrentAgent,
  getLatestAgentJournal,
  getAgentTask,
  getRecentPosts,
} from "../../cms/agents";

export const tweetTemplate = async (currentTask: string) => {
  const agent = await getCurrentAgent();
  const { id, bio, styles } = agent;
  const journal = await getLatestAgentJournal(id);
  const { content: journalContent } = journal;
  const task = await getAgentTask(id, currentTask);
  const { task: taskContent } = task;
  const recentPosts = await getRecentPosts(id);
  const recentPostsContent = recentPosts.map((post) => post.content).join("\n");
  // Get a random bio element
  const randomBio =
    bio && bio.length > 0
      ? bio[Math.floor(Math.random() * bio.length)]
      : { content: "" };
  const { content: bioContent } = randomBio;
  const prompt = `<persona>${bioContent}</persona>
<journal>${journalContent}</journal>
<recentPosts>${recentPostsContent}</recentPosts>
<task>${taskContent}</task>
<style>${styles}</style>
<tweet>:`;
  return prompt;
};
