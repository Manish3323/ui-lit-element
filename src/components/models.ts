export type Location = {
  prefix: string;
  components: SeqComp[];
};

export type SeqComp = {
  prefix: string;
  sequencer?: string;
};
