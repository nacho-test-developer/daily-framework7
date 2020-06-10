<template>
  <f7-page name="tasks" :page-content="false" @page:init="onPageInit">
    <f7-navbar title="Tasks" back-link="Back">
      <f7-nav-right>
        <f7-link class="searchbar-enable" data-searchbar=".searchbar-demo" icon-ios="f7:search" icon-aurora="f7:search" icon-md="material:search"></f7-link>
      </f7-nav-right>
      <f7-searchbar
        class="searchbar-demo"
        expandable
        search-container=".search-list"
        search-in=".item-title"
        :disable-button="!$theme.aurora"
      ></f7-searchbar>
    </f7-navbar>
    <f7-toolbar tabbar position="top">
      <f7-link tab-link="#tab-10">Yesterday</f7-link>
      <f7-link tab-link="#tab-20" tab-link-active>Today</f7-link>
      <f7-link tab-link="#tab-30">Blockers</f7-link>
    </f7-toolbar>
    <!-- swipeable -->
    <f7-tabs>
      <f7-tab id="tab-10" class="page-content">
        <f7-block>
          <p>Tab 1 content</p>
          ...
        </f7-block>
      </f7-tab>
      <f7-tab id="tab-20" class="page-content" tab-active>
        <f7-menu class="margin-top">
          <f7-menu-item style="margin-left: auto" text="Select tasks">
          </f7-menu-item>
        </f7-menu>
        <f7-list class="no-margin-top">
          <f7-list-item
            swipeout
            title="Primer tarea creada"
            checkbox
          >
            <f7-swipeout-actions right>
              <f7-swipeout-button delete confirm-text="Are you sure you want to delete this item?">Delete</f7-swipeout-button>
            </f7-swipeout-actions>
          </f7-list-item>
          <f7-list-item
            swipeout
            title="Una nueva tarea"
            checkbox
          >
            <f7-swipeout-actions right>
              <f7-swipeout-button delete confirm-text="Are you sure you want to delete this task?">Delete</f7-swipeout-button>
            </f7-swipeout-actions>
          </f7-list-item>
          <f7-list-item
            swipeout
            title="Es la última tarea creada"
            checkbox
          >
            <f7-swipeout-actions right>
              <f7-swipeout-button @click="more">More</f7-swipeout-button>
              <f7-swipeout-button delete>Delete</f7-swipeout-button>
            </f7-swipeout-actions>
          </f7-list-item>
        </f7-list>
      </f7-tab>
      <f7-tab id="tab-30" class="page-content">
        <f7-block>
          <p>Tab 3 content</p>
          ...
        </f7-block>
      </f7-tab>
    </f7-tabs>
  </f7-page>
</template>

<script>
import { Task } from "@/mocks/Task.js";
import { createDB } from "@/services/_task.js";

export default {
  name: 'Tasks',
  data() {
    return {
      task: {},
      tasks: [],
      isBottom: false
    };
  },
  created() {
    createDB()
    this.task = new Task('test', 'today')
  },
  methods: {
    more() {
      const self = this;
      self.actions.open();
    },
    onPageInit() {
      const self = this;
      const app = self.$f7;
      self.actions = app.actions.create({
        buttons: [
          [
            {
              text: 'More actions',
              label: true,
            },
            {
              text: 'Move to Yestarday',
            },
            {
              text: 'Move to Blockers',
            }
          ],
          [
            {
              text: 'Cancel',
              bold: true,
            },
          ],
        ],
      });
    }
  }
}
</script>