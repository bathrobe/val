import { tasks } from "../fragments/tasks";
import { persona } from "../assembly/persona";
import { style } from "../assembly/style";
import { identity } from "../fragments/identity";
import { getRandomElements } from "../../tools/utils/helpers";

export const tweetTemplate = () => {
  const examplePosts = getRandomElements(identity.examplePosts, 2);
  const prompt = `<persona>${persona}</persona>
<task>${tasks.shitpost}</task>
<style>${style()}</style>
<examplePosts>${examplePosts}</examplePosts>
<tweet>:`;
  console.log(prompt);
  return prompt;
};
