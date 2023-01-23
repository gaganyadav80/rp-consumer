import { convertTo } from "../utils";

const removeConsumerSnippet = (child: string) => {
  return `${child}`;
};

export const removeConsumer = async () => convertTo(removeConsumerSnippet);
