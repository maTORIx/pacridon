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
        event.preventDefault();　// デフォルトの挙動をキャンセルする。この場合、submitによる再読み込みをキャンセルする。
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
        this.newToot.body = "";
      },
      deleteToot: function(event, id) { 
        for(let i = 0; i < this.toots.length; i++) {
          if(this.toots[i].id === id) {
            this.toots.splice(i,1);
            break;
          }
        }
        if(!event) {
          return;
        }

        event.preventDefault();
        fetch("/api/toots/" + id, {
          credentials: "same-origin",
          method: "DELETE",
        }).then((data) => {
          // console.log(data);
        }).catch((err) => {
          console.error(err);
        })
      }
    }
  })

  function getText(id){
    var url = "/api/user/" + id;
    console.log(url);
    var request = createXMLHttpRequest();
    request.open("GET", url, true);
    request.send("");
  }

  let currentURL = window.location.href.substring(21);
  let sourceURL = "";
  if(currentURL === "/") {
    sourceURL = "/api/toots"
  } else {
    sourceURL = "/api" + currentURL + "/toots"
  }
  console.log(currentURL);
  console.log(sourceURL);

  fetch(sourceURL, {
    credentials: "same-origin",
  }).then((response) => {
    return response.json();
  }).then((toots) => {
    toots = toots.map(function(data) {
      data.user_nickname = getText(data.user_id);
      return data;
    })
    vm.toots = toots;
  }).catch((err) => {
    console.error(err)
  })

  let ws = new WebSocket("ws://localhost:8000/api/timeline");
  ws.addEventListener("message", function(event) {
    let message = JSON.parse(event.data);
    switch(message.action) {
      case "create":
        vm.toots.unshift(message.toot);
        break;
      case "delete":
        vm.deleteToot(null, message.toot.id);
        break;
    }
    // vm.toots.unshift(JSON.parse(event.data));
  })
})