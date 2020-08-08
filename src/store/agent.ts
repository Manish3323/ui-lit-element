import { observable } from 'mobx';

export type AddOrRemoveSeqComp = {
  agentPrefix: string;
  seqCompPrefix: string;
};

export interface SeqComp {
  prefix: string;
  sequencer?: string;
}

export class Agent {
  public prefix: string = '';
  public components = observable<SeqComp>([]);
  constructor(prefix: string, components: SeqComp[]) {
    this.prefix = prefix;
    this.components.replace(components);
  }
}

class AgentStore {
  public agents: Agent[] = observable([]);

  public addSeqComp = (event: AddOrRemoveSeqComp) => {
    // find agent index
    const index = this.agents.findIndex((x) => x.prefix == event.agentPrefix);
    // add seq component to that agent.. 
    // since this components array is observable who ever is consuming will rerender
    this.agents[index].components.push({ prefix: event.seqCompPrefix });
  };

  public removeSeqComp = (event: AddOrRemoveSeqComp) => {
    const index = this.agents.findIndex((x) => x.prefix == event.agentPrefix);
    const seqCompIndex = this.agents[index].components.findIndex(
      (x: SeqComp) => x.prefix == event.seqCompPrefix,
    );
    this.agents[index].components.splice(seqCompIndex, 1);
  };
}

// common store for all
export const store = new AgentStore();
