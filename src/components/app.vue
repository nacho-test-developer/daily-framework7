<template>
<f7-app :params="f7params" theme-dark>

  <!-- Left panel with cover effect-->
  <f7-panel left cover theme-dark swipe swipeOnlyClose>
    <f7-view>
      <f7-page>
        <f7-navbar title="Main menu"></f7-navbar>
        <f7-block-title>Configuration</f7-block-title>
        <f7-list>
          <f7-list-item title="Dark mode">
            <f7-toggle slot="after" checked disabled></f7-toggle>
          </f7-list-item>
          <f7-list-item title="Notifications">
            <f7-toggle slot="after" disabled></f7-toggle>
          </f7-list-item>
          <f7-list-item
            title="Default tab"
            smart-select
            :smart-select-params="{openIn: 'sheet'}"
          >
            <select name="tab">
              <option value="yesterda">Yesterday</option>
              <option value="today" selected>Today</option>
              <option value="blockers">Blockers</option>
            </select>
          </f7-list-item>
        </f7-list>
        <f7-block>
          <f7-link login-screen-open="#my-login-screen" @click="logout()" panel-close="left">
            <f7-icon f7="square_arrow_left" size="24px"></f7-icon>
            <span class="padding-left">Logout</span>
          </f7-link>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Right panel with reveal effect-->
  <f7-panel right reveal theme-dark>
    <f7-view>
      <f7-page>
        <f7-navbar title="Right Panel"></f7-navbar>
        <f7-block>Right panel content goes here</f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" url="/"></f7-view>

  <f7-login-screen id="my-login-screen">
    <f7-view>
      <f7-page login-screen>
        <f7-login-screen-title>Login</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            type="text"
            name="username"
            placeholder="Your username"
            :value="username"
            @input="username = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            type="password"
            name="password"
            placeholder="Your password"
            :value="password"
            @input="password = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-list>
          <f7-list-button title="Sign In" @click="alertLoginData"></f7-list-button>
          <f7-block-footer>
            Some text about login information.<br>Click "Sign In" to close Login Screen
          </f7-block-footer>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-login-screen>

  <!-- Popup -->
  <f7-popup id="my-popup">
    <f7-view>
      <f7-page>
        <f7-navbar title="Popup">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <p>Popup content goes here.</p>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-popup>
</f7-app>
</template>

<script>
import Logo from '@/components/Logo.vue'
import routes from '../js/routes.js';

export default {
  data() {
    return {
      // Framework7 Parameters
      f7params: {
        name: 'Daily', // App name
        theme: 'ios', // auto Automatic theme detection

        // App routes
        routes: routes,
        // Register service worker
        serviceWorker: {
          path: '/service-worker.js',
        },
      },

      // Login screen data
      username: '',
      password: '',
      isLogout: Boolean
    }
  },
  components: {
    Logo
  },
  methods: {
    alertLoginData() {
      this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password, () => {
        this.$f7.loginScreen.close();
      });
    },
    logout() {
      this.isLogout = false;
      this.$f7.loginScreen.open();
    }
  },
  mounted() {
    this.isLogout = true
    if(this.isLogout) {
      this.$f7.loginScreen.close();
    }
    this.$f7ready((f7) => {
      // Call F7 APIs here
      // f7.loginScreen.close()
    });
  }
}
</script>

<style lang="scss" scoped>
.left-menu__footer {
  text-align: center;

  p {
    margin-top: 0;
  }
}
.toggle {
  transform: scale(.85);
}
.panel {
  width: 100%;
}
</style>