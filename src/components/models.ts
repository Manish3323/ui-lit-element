export type Location = {
  prefix: string;
  components: SeqComp[];
};

export type SeqComp = {
  prefix: string;
  sequencer?: string;
};


export type AddOrRemoveEvent = {
  agentPrefix: string,
  seqCompPrefix: string
}