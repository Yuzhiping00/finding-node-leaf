import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";

//Works with Vuetify 3.0.4 via npm @mdi/font and import '@mdi/font/css/materialdesignicons.css' 

//Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: {
      light: {
        colors: {
          primary: "#1976D2",
          secondary: "#424242",
        },
      },
    },
  },
  components,
  directives,
});

const app = createApp(App);
app.use(vuetify);
app.mount("#app");
