import { convertTo } from "../utils";

const removeConsumerSnippet = (_: string, child: string) => {
  return `${child}`;
};

// WIP not working yet
export const removeConsumer = async () => convertTo(removeConsumerSnippet);
