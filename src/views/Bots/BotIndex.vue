<template>
  <ContentBar>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <div class="card">
            <div class="card-body">
              <img class="avatar" :src="$store.state.user.avatar">
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="card">
            <div class="card-header">
              My smashees
              <div>{{ listHeaderMSG }}</div>
              <button class="btn btn-outline-success float-end" type="submit" data-bs-toggle="modal"
                data-bs-target="#newBot">New smashee</button>
            </div>
            <!-- Modal -->
            <div class="modal fade" id="newBot" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Create new smashee</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <input v-model="botToAdd.name" type="text" id="botName" class="form-control"
                      placeholder="Name of the bot (not empty)">
                    <br>
                    <textarea v-model="botToAdd.description" type="text" id="botDescription" class="form-control" rows="3"
                      placeholder="Description of the bot"></textarea>
                    <br>
                    <textarea v-model="botToAdd.code" type="text" id="botCode" class="form-control" rows="12"
                      placeholder="Source code of the bot (not empty)"></textarea>
                    <div class="MSG">{{ modalMSG }}</div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="addBot">Save</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div v-if="!ERROR">
                <table class="table table-hover">
                  <thead>
                    <th>Name</th>
                    <th>Create time</th>
                    <th>Last edited</th>
                    <th>Option</th>
                  </thead>
                  <tbody>
                    <tr v-for="bot in botList" :key="bot.id">
                      <td>{{ bot.name }}</td>
                      <td>{{ bot.createtime }}</td>
                      <td>{{ bot.edittime }}</td>
                      <td>
                        <button class="btn btn-primary" data-bs-toggle="modal"
                          :data-bs-target="'#editBot-' + bot.id">Edit</button>
                        <button class="btn btn-danger" @click="deleteBot(bot.id)">Delete</button>
                      </td>
                      <!-- Modal -->
                      <div class="modal fade" :id="'editBot-' + bot.id" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Create new smashee</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <input v-model="bot.name" type="text" id="botName" class="form-control"
                                placeholder="Name of the bot (not empty)">
                              <br>
                              <textarea v-model="bot.description" type="text" id="botDescription" class="form-control"
                                rows="3" placeholder="Description of the bot"></textarea>
                              <br>
                              <textarea v-model="bot.code" type="text" id="botCode" class="form-control" rows="12"
                                placeholder="Source code of the bot (not empty)"></textarea>
                              <div class="MSG">{{ modalMSG }}</div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary" @click="editBot(bot)">Save</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <NotFoundView></NotFoundView>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentBar>
</template>

<script setup>
import ContentBar from "@/components/ContentBar.vue";
import NotFoundView from "../Exceptions/NotFoundView.vue";
import { ref } from 'vue'
import $ from "jquery"
import { useStore } from "vuex";
import { Modal } from "bootstrap/dist/js/bootstrap";

const store = useStore();
const ERROR = ref(true);
const botList = ref([]);
const botToAdd = ref(
  {
    name: "",
    description: "",
    code: ""
  }
);
const modalMSG = ref("");
const listHeaderMSG = ref("");

const refreshBotList = () => {
  $.ajax({
    url: "http://localhost:12345/user/bot/get",
    type: "GET",
    headers: {
      Authorization: "Bearer " + store.state.user.JWT
    },
    success(resp) {
      ERROR.value = false
      botList.value = resp;
    },
    error() {
      ERROR.value = true;
    }
  })
};
refreshBotList();

const addBot = () => {
  $.ajax({
    url: "http://localhost:12345/user/bot/add",
    type: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    data: {
      name: botToAdd.value.name,
      description: botToAdd.value.description,
      code: botToAdd.value.code
    },
    success(resp) {
      if (resp.MSG === "succeed") {
        modalMSG.value = "";
        botToAdd.value.name = "";
        botToAdd.value.description = "";
        botToAdd.value.code = "";
        Modal.getInstance("#newBot").hide();
        refreshBotList();
      } else {
        modalMSG.value = resp.MSG;
      }
    },
    error(resp) {
      modalMSG.value = resp.MSG;
    }
  })
};

const deleteBot = (id) => {
  $.ajax({
    url: "http://localhost:12345/user/bot/delete",
    type: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    data: {
      id: id
    },
    success(resp) {
      if (resp.MSG === "succeed") {
        listHeaderMSG.value = "";
        refreshBotList();
      } else {
        listHeaderMSG.value = resp.MSG;
      }
    },
    error(resp) {
      listHeaderMSG.value = resp.MSG;
    }
  })
};

const editBot = (bot) => {
  $.ajax({
    url: "http://localhost:12345/user/bot/modify",
    type: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    data: {
      id: bot.id,
      name: bot.name,
      description: bot.description,
      code: bot.code
    },
    success(resp) {
      if (resp.MSG === "succeed") {
        modalMSG.value = "";
        Modal.getInstance("#editBot-" + bot.id).hide();
      } else {
        modalMSG.value = resp.MSG;
      }

    },
    error(resp) {
      modalMSG.value = resp.MSG;
    }
  })
};







</script>

<style scoped>
img.avatar {
  width: 100%;
  height: 100%;
}

#inspect {
  margin-right: 10px;
}

div.MSG {
  color: red;
}
</style>