import { customElement, property, LitElement, html, css } from 'lit-element';
import './comp-location';
import type { Location, AddOrRemoveEvent } from './models';
import agentData from '../data/agentData.json';
@customElement('seq-manager')
export class SeqManager extends LitElement {
  @property() agents: Array<Location> = agentData;
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

  addSeqComp = (e: CustomEvent<AddOrRemoveEvent>) => {
    console.log('added', e.detail.agentPrefix);
    const index = this.agents.findIndex(
      (x) => x.prefix == e.detail.agentPrefix,
    );
    this.agents[index].components = [
      ...this.agents[index].components,
      { prefix: e.detail.seqCompPrefix },
    ];
    this.requestUpdate();
  };

  remSeqComp = (e: CustomEvent<AddOrRemoveEvent>) => {
    console.log('rem', e.detail.seqCompPrefix);
    const index = this.agents.findIndex(
      (x) => x.prefix == e.detail.agentPrefix,
    );
    const newComps = this.agents[index].components.filter(
      (x) => x.prefix != e.detail.seqCompPrefix,
    );
    console.log(newComps);

    this.agents[index].components = [...newComps];
    this.requestUpdate();
  };

  render() {
    return html`
      <div class="wrapper">
        ${this.agents.map(
          (product) => html`
            <comp-location
              @add-seq-comp="${this.addSeqComp}"
              @rem-seq-comp="${this.remSeqComp}"
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
