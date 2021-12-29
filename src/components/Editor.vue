<template>
  <div class="paper">
    <div class="paper-content">
      <textarea v-model="note" @input="save" spellcheck="false" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useSignalR } from "@dreamonkey/vue-signalr";

export default {
  name: "Editor",
  data() {
    return {
      id: "",
      note: "",
      user: "",
      signalr: useSignalR()
    };
  },
  methods: {
    save({ target }) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        axios.put(`${process.env.VUE_APP_API_URL}/note`, {
          id: this.id,
          note: target.value,
          user: this.user,
        }).then(() => {
          this.signalr.invoke("NotifyOthers", this.id, this.note);
        })
      }, 1000);
    },
    loadNote(id) {
      axios(`${process.env.VUE_APP_API_URL}/note?id=${id}`).then((response) => {
        this.id = id;
        this.note = response.data.note;
      });
    },
    uuid() {
      var uuidValue = "",
        k,
        randomValue;
      for (k = 0; k < 32; k++) {
        randomValue = (Math.random() * 16) | 0;

        if (k == 8 || k == 12 || k == 16 || k == 20) {
          uuidValue += "-";
        }
        uuidValue += (
          k == 12 ? 4 : k == 16 ? (randomValue & 3) | 8 : randomValue
        ).toString(16);
      }
      return uuidValue;
    },
    initializeSignalR(group) {
      this.signalr.on("NoteUpdated", (id, note) => {
        this.note = note;
      });
      
      this.signalr.invoke("JoinNote", group);
    },
  },
  created() {
    this.user = this.uuid();
    if (this.$route.params.id) {
      this.loadNote(this.$route.params.id);
      this.initializeSignalR(this.$route.params.id);
    } else {
      const uuid = this.uuid();
      this.$router.push({ name: "editor-id", params: { id: uuid } });
      this.loadNote(uuid);
      this.initializeSignalR(uuid);
    }
  },
  beforeUnmount() {
    this.signalr.invoke("LeaveNote", this.id);
  },
};
</script>

<style scoped>
.paper {
  position: relative;
  width: 95%;
  max-width: 95%;
  min-width: 400px;
  height: 692px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
}

.paper-content {
  position: absolute;
  top: 30px;
  right: 0;
  bottom: 30px;
  left: 0;
  background: linear-gradient(
    transparent,
    transparent 25px,
    hsla(0, 1%, 65%, 0.46) 0
  );
  background-size: 26px 26px;
}

textarea {
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  line-height: 26px;
  padding: 0 10px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #666;
  font-size: 14px;
  box-sizing: border-box;
  z-index: 1;
  resize: none;
  font-weight: 100;
  letter-spacing: 1px;
}
</style>