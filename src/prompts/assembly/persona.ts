import { identity } from "../fragments/identity";
import { getRandomElements } from "../../tools/utils/helpers";

export const persona = async () => {
  const bios = getRandomElements(identity.bios, 1);
  // const state = await identity.state();
  const state = getRandomElements(identity.state, 1);
  const interests = getRandomElements(identity.interests, 2);
  return `BIO:\n${bios}\nSTATE:\n${state}\nINTERESTS:\n${interests}
  `;
};
