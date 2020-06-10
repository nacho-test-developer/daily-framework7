<template>
  <f7-page :page-content="false">
  <f7-navbar title="Subnavbar">
    <f7-subnavbar>
      <f7-segmented raised>
        <f7-button tab-link="#tab1" tab-link-active>Tab 1</f7-button>
        <f7-button tab-link="#tab2">Tab 2</f7-button>
      </f7-segmented>
    </f7-subnavbar>
  </f7-navbar>
  <f7-tabs>
    <f7-tab id="tab1" tab-active class="page-content">
      <f7-block>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisi nisi, tincidunt ut eleifend non, sagittis a elit. Sed consequat odio at leo varius viverra...</p>
      </f7-block>
    </f7-tab>
    <f7-tab id="tab2" class="page-content">
      <f7-block>
        <p>Donec iaculis posuere massa sed dignissim. Praesent id nibh nec massa mollis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas...</p>
      </f7-block>
    </f7-tab>
  </f7-tabs>
</f7-page>
</template>