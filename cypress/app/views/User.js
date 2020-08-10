import { defineElement, html } from '@kirei/element';
import { useRoute } from '@kirei/router';

export default defineElement({
  name: 'AppUser',
  setup(props) {
    const route = useRoute();
    const { user } = route.params;

    return () => html`<h1>Hello ${user}</h1><slot></slot>`;
  },
});
