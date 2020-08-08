import { customElement, property, html, css } from 'lit-element';
import './comp-location';
import { MobxLitElement } from '@adobe/lit-mobx';
import { Agent, store, SeqComp } from '../store/agent';
import agentData from '../data/agentData.json';
@customElement('seq-manager')
export class SeqManager extends MobxLitElement {
  @property() agents: Agent[] = store.agents;
  static get styles() {
    return css`
      .wrapper {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        background-color: darkgrey;
        font-size: 14px;
      }
    `;
  }

  constructor() {
    super();
    // map json to observable once
    const agents = agentData.map((x) => {
      const seqComps: SeqComp[] = x.components.map((d) => ({
        prefix: d.prefix,
        sequencer: d.sequencer,
      }));
      return new Agent(x.prefix, seqComps);
    });
    // add to agent store 
    this.agents.push(...agents);
  }

  render() {
    return html`
      <div class="wrapper">
        ${this.agents.map(
          (product) => html`
            <comp-location
              prefix=${product.prefix}
              .components=${product.components}
            >
            </comp-location>
          `,
        )}
      </div>
    `;
  }
}
