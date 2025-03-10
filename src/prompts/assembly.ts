import { identity } from "./fragments/identity";
import { getRandomElementsAndFormat } from "../tools/utils/helpers";

export const persona = () => {
  const bios = getRandomElementsAndFormat(identity.bios, 1);
  // const state = await identity.state();
  const state = getRandomElementsAndFormat(identity.state, 2);
  const interests = getRandomElementsAndFormat(identity.interests, 2);
  return `BIO:\n${bios}\nSTATE:\n${state}\nINTERESTS:\n${interests}
  `;
};
