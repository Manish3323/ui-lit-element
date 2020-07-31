import { customElement, property, LitElement, html, css } from 'lit-element';
import './components/seq-manager';
@customElement('app-root')
export class AppRoot extends LitElement {
  @property() message = 'Learn LitElement';

  static get styles() {
    return css`
      h1 {
        font-size: 4rem;
      }
      .wrapper {
        display: flex;
        justify-content: left;
        align-items: left;
        flex-direction: column;
        background-color: white;
        font-size: 24px;
      }
      .link {
        color: black;
      }
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <seq-manager></seq-manager>
      </div>
    `;
  }
}
