const domready = require("domready");
const Vue = require("vue/dist/vue.min");

domready(function() {
  let timeline = document.getElementById("timeline");
  if(!timeline){
    return;
  }

  let vm = new Vue({
    el: "#timeline",
    data: {
      newToot: {body: ""},
      toots: [],
    },
    methods: {
      postToot: function(event) {
        event.preventDefault();
        let fd = new URLSearchParams();
        fd.set("toot", this.newToot.body);

        fetch("/api/toots", {
          credentials: "same-origin",
          method: "POST",
          body: fd
        }).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data);
        }).catch((err) => {
          console.error(err);
        })
      }
    }
  })

  fetch("/api/toots", {
    credentials: "same-origin",
  }).then((response) => {
    return response.json();
  }).then((data) => {
    vm.toots = data;
  }).catch((err) => {
    console.error(err)
  })

  let ws = new WebSocket("ws://localhost:8000/api/timeline");
  ws.addEventListener("message", function(event) {
    vm.toots.unshift(JSON.parse(event.data));
  })
})