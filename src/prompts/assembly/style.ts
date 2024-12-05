import { styles } from "../fragments/styles";

export const style = () => {
  const avoids = styles.avoid.join("\n");
  return `${styles.rules}\nAVOID:\n${avoids}`;
};
