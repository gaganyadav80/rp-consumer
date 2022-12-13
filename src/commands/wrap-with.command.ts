import { wrapWith } from "../utils";

const consumerSnippet = (widget: string) => {
  return `Consumer(
  builder: (_, WidgetRef ref, __) {
    return ${widget};
  },
)`;
};

export const wrapWithConsumer = async () => wrapWith(consumerSnippet);
