<template>
  <v-list v-if="logs">
    <v-list-tile @click="downloadLog(log)" v-for="(log,index) in logs" :key="index">
      <v-list-tile-content>
        <v-list-tile-title>{{log[0]}}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-btn @click="deleteLocalStorage">Supprimer le stockage</v-btn>
  </v-list>
</template>

<script>
export default {
  computed: {
    logs() {
      if (!localStorage.getItem("logs")) return;
      const logs = JSON.parse(localStorage.getItem("logs"));
      return logs;
    }
  },
  methods: {
    downloadLog(log) {
      const data = JSON.stringify(log);
      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = "log.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
    deleteLocalStorage() {
      localStorage.removeItem("logs");
    }
  }
};
</script>
