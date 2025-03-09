import { tasks } from "../fragments/tasks";
import { persona, style } from "../assembly";
import { identity } from "../fragments/identity";
import { getRandomElementsAndFormat } from "../../tools/utils/helpers";

export const tweetTemplate = async () => {
  const examplePosts = getRandomElementsAndFormat(identity.examplePosts, 2);
  const bio = persona();
  const prompt = `<persona>${bio}</persona>
<task>${tasks.post}</task>
<style>${style()}</style>
<examplePosts>${examplePosts}</examplePosts>
<tweet>:`;
  // console.log(prompt);
  return prompt;
};
