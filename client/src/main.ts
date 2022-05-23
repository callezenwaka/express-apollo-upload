import { createApp, h, provide } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

// Create the apollo client
const DefaultClient = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql'
  }),
  cache: new InMemoryCache(),
})

createApp({
  setup() {
    provide(DefaultApolloClient, DefaultClient);
  },
  render: () => h(App),
})
.use(store)
.use(router)
.mount("#app");
