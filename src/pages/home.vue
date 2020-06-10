<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar :sliding="false" large>
      <f7-nav-left>
        <f7-link icon-ios="f7:line_horizontal_3" icon-aurora="f7:line_horizontal_3" icon-md="material:line_horizontal_3" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>
        Daily <span class="text-color-primary">7</span>
      </f7-nav-title>
      <!-- <f7-nav-right>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right> -->
      <f7-nav-title-large sliding>
        Daily <span class="text-color-primary">7</span>
      </f7-nav-title-large>
    </f7-navbar>
    <!-- Toolbar-->

    <!-- Page content-->
    <f7-block strong>
      <p>Here is your blank Framework7 app. Let's see what we have here.</p>
    </f7-block>

    <f7-block-title>Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/tasks/" title="Tasks"></f7-list-item>
      <f7-list-item link="/test/" title="Test"></f7-list-item>
    </f7-list>

  </f7-page>
</template>