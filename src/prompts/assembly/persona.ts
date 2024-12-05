import { identity } from "../fragments/identity";
import { getRandomElements } from "../../tools/utils/helpers";

export const persona = () => {
  const bios = getRandomElements(identity.bios, 1);
  const state = getRandomElements(identity.state, 2);
  const interests = getRandomElements(identity.interests, 2);
  return `BIO:\n${bios}\nSTATE:\n${state}\nINTERESTS:\n${interests}
  `;
};
