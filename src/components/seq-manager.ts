import { customElement, property, LitElement, html, css } from 'lit-element';
import './comp-location';
import type { Location } from './models';
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

  addSeqComp = (e: CustomEvent) => {
    console.log('added', e.detail);
  };

  remSeqComp = (e: CustomEvent) => {
    console.log('removed', e.detail);
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
