import celebrities from "@/mock/celebrities.json";

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type Celebrity = ArrayElement<typeof celebrities>;
