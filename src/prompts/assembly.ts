import { identity } from "./fragments/identity";
import { getRandomElementsAndFormat } from "../tools/utils/helpers";
import { styles } from "./fragments/styles";

export const persona = () => {
  const bios = getRandomElementsAndFormat(identity.bios, 1);
  // const state = await identity.state();
  const state = getRandomElementsAndFormat(identity.state, 2);
  const interests = getRandomElementsAndFormat(identity.interests, 2);
  return `BIO:\n${bios}\nSTATE:\n${state}\nINTERESTS:\n${interests}
  `;
};

export const style = () => {
  const avoids = styles.avoid.join("\n");
  return `${styles.rules}\nAVOID:\n${avoids}`;
};
