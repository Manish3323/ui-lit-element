import { customElement, property, LitElement, html, css } from 'lit-element';
import type { SeqComp } from './models';
const scriptLoadedSvg = html`<img
  src="./script.svg"
  alt="loaded script"
  height="20"
  width="20"
/>`;
const scriptUnLoadedSvg = html`<img
  src="./script_un.svg"
  alt="unloaded script"
  height="20"
  width="20"
/>`;

@customElement('comp-location')
export class Location extends LitElement {
  @property() prefix: string = '';
  @property() components: Array<SeqComp> = [];

  static get styles() {
    return css`
      h1 {
        font-size: 4rem;
      }
      .wrapper {
        display: flex;
        align-items: center;
        flex-direction: row;
        background-color: white;
        width: 400px;
        border: 2px solid black;
        padding: 10px;
        margin: 20px;
        font-size: 14px;
        flex-wrap: wrap;
        flex: 1;
        color: black;
      }
      .prefix {
        padding: 2%;
        margin: 1%;
      }
      .dark {
        background-color: grey;
      }
      .light {
        background-color: white;
      }
      .sequence-comp {
        width: 100%;
        padding: 2%;
        margin: 5%;
        border: 1px solid black;
      }
      .button {
        margin: 2%;
        float: right;
        width: 25px;
      }
    `;
  }

  handleAddComp = (agentPrefix: string) => {
    let myEvent = new CustomEvent('add-seq-comp', {
      detail: { agentPrefix },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(myEvent);
  };

  handleRemoveComp = (agentPrefix: string, seqCompPrefix: string) => {
    let myEvent = new CustomEvent('rem-seq-comp', {
      detail: { agentPrefix, seqCompPrefix },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(myEvent);
  };

  sequencer = () => html``;
  render() {
    const a = this.components;
    return html`
      <div class="wrapper">
        <h3 class="prefix">${this.prefix}</h3>
          <button class="button"
           @click="${() => this.handleAddComp(this.prefix)}">
           +
           </button>
            ${a.map((e) => {
              const filled = e.sequencer ? 'dark' : 'light';
              return html`
                <div class=${'sequence-comp ' + filled}>
                  <button
                    class="button"
                    @click="${() =>
                      this.handleRemoveComp(this.prefix, e.prefix)}"
                  >
                    -
                  </button>
                  <div>
                    ${e.prefix}
                  </div>
                  ${e.sequencer ? scriptLoadedSvg : scriptUnLoadedSvg}
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }
}
