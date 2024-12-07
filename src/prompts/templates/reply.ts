import { tasks } from "../fragments/tasks";
import { persona } from "../assembly/persona";
import { style } from "../assembly/style";
import { identity } from "../fragments/identity";
import { getRandomElements } from "../../tools/utils/helpers";

export const replyTemplate = (replyToText: string) => {
  const examplePosts = getRandomElements(identity.examplePosts, 3);
  return `<persona>${persona()}</persona>
<task>${tasks.reply}</task>
<style>${style()}</style>
<examplePosts>${examplePosts}</examplePosts>
<replyingTo>${replyToText}</replyingTo>
<reply>:`;
};
