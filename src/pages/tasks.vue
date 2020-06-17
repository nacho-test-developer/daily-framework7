<template>
  <f7-page name="tasks" :page-content="false" @page:init="onPageInit">
    <f7-navbar title="Tasks" back-link="Back">
      <f7-nav-right>
        <!-- <f7-button
          small
          icon-f7="square_list"
          sortable-toggle=".sortable"></f7-button
        > -->
        <f7-link
          class="searchbar-enable"
          data-searchbar=".searchbar-demo"
          icon-ios="f7:search"
          icon-aurora="f7:search"
          icon-md="material:search"
        ></f7-link>
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
      <f7-link
        @click="currentTab = 'yesterday'"
        tab-link="#yesterday">Yesterday</f7-link
      >
      <f7-link
        @click="currentTab = 'today'"
        tab-link="#today"
        tab-link-active>Today</f7-link
      >
      <f7-link
        @click="currentTab = 'blockers'"
        tab-link="#blockers">Blockers</f7-link
      >
    </f7-toolbar>
    <f7-toolbar v-show="isSelected" position="top">
      <div class="left">
        <f7-button small icon-f7="bars"></f7-button>
      </div>
      <div class="right">
        <f7-button small icon-f7="square_list"></f7-button>
      </div>
    </f7-toolbar>
    <!-- swipeable -->
    <f7-tabs>
      <f7-tab id="yesterday" class="page-content">
        <f7-block>
          <p>Tab 1 content</p>
          ...
        </f7-block>
      </f7-tab>
      <f7-tab id="today" class="page-content" tab-active>
        <f7-list sortable @sortable:sort="true" class="no-margin-top">
          <!-- @swipeout:deleted="onDeleted(task)" -->
          <f7-list-item
            swipeout
            :title="task.title"
            checkbox
            :value="task._id"
            @change="checkTask"
            v-for="task in todayList"
            :key="task._id"
            @swipeout:deleted="onDeleted(task)"
          >
            <f7-swipeout-actions right>
              <f7-swipeout-button @click="more">More</f7-swipeout-button>
              <f7-swipeout-button
                confirm-title=" "
                confirm-text="Do you want to delete this item?"
                delete
              >
                Delete
                </f7-swipeout-button>
            </f7-swipeout-actions>
          </f7-list-item>
        </f7-list>
      </f7-tab>
      <f7-tab id="blockers" class="page-content">
        <f7-block>
          <p>Tab 3 content</p>
          ...
        </f7-block>
      </f7-tab>
    </f7-tabs>

    <f7-fab-backdrop slot="fixed"></f7-fab-backdrop>
    <!-- @click="uiAddSheetAction = true" -->
    <f7-fab
      morph-to=".toolbar.fab-morph-target"
      position="center-bottom"
      slot="fixed"
      text="Create"
      color="primary"
    >
      <f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
    </f7-fab>

    <f7-messagebar
      placeholder="Add a new task"
      ref="messagebar"
      class="fab-morph-target"
      :value="newTask"
      @input="newTask = $event.target.value"
      clear
    >
      <f7-link
        icon-ios="f7:plus"
        icon-aurora="f7:plus"
        icon-md="material:add"
        slot="inner-end"
        @click="addTask"
        :class="{disabled: !save}"
      ></f7-link>
    </f7-messagebar>

  </f7-page>
</template>

<script>
import { addTaskDB, deleteTaskDB } from '@/services/_tasks.js'
import { Task } from "@/mocks/Task.js";

export default {
  name: 'Tasks',
  data() {
    return {
      app: this,
      task: {},
      newTask: '',
      yesterday: [],
      today: [],
      blockers: [],
      selected: [],
      currentTab: 'today'
    };
  },
  computed: {
    todayList() {
      return this.today
    },
    isSelected() {
      return this.selected.length ? true : false
    },
    save() {
      return this.newTask.trim() ? true : false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // API
    async getList() {
      const list = await db.allDocs({
        include_docs: true,
        attachments: true
      });
      this.today = list.rows.map(row => row.doc);
    },

    // UI
    more() {
      this.app.actions.open();
    },
    addTask() {
      const val = new Task({
        title: `${this.newTask}`,
        category: this.currentTab
      })
      this.newTask = ''
      this.today.push(val)
      addTaskDB(val)
      this.uiAddSheetAction = false
      // this.getList()
    },
    onDeleted(task) {
      deleteTaskDB(task)
      this.today.splice(this.today.indexOf(task), 1)

      // const app = this.$f7;
      // app.dialog.confirm(
      //   'Do you want to delete this item?',
      //   '',
      //   () => this.delete(task),
      //   () => console.log('no')
      // )
    },
    checkTask(e) {
      const value = e.target.value;
      e.target.checked
        ? this.selected.push(value)
        : this.selected.splice(this.selected.indexOf(value), 1)
    },
    onPageInit() {
      const f7 = this.app.$f7;
      this.app.actions = f7.actions.create({
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
              onClick: () => this.app.$f7.swipeout.close('.swipeout-opened')
            }
          ]
        ]
      })
    }
  }
}
</script>

<style>
.fab-morph-target {
  z-index: 1401;
}
</style>