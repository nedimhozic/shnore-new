<template>
  <nav>
    <span class="title">Shnore</span>
    <div class="password-container">
      <input type="password" id="password" :class="{ short: inputHidden, hidden: inputReallyHidden }" />
      <span @click="handleInput">Set password</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      inputHidden: true,
      inputReallyHidden: true
    };
  },
  methods: {
    handleInput(){
      if(this.inputHidden){
        this.inputHidden = false;
        this.inputReallyHidden = false;
      } else {
        setTimeout(() => {
          this.inputReallyHidden = true;
        }, 500);
        this.inputHidden = true;
      }
    }
  }
};
</script>

<style scoped>
.title {
  margin-left: 40px;
  float: left;
}

.password-container {
  visibility: hidden;
  float: right;
  margin-right: 40px;
}

.password-container span {
  cursor: pointer;
}

#password {
  margin-right: 20px;
  width: 200px;
  transition: width 0.5s;
}

#password.short {
  width: 0px;
}

#password.hidden {
  visibility: hidden;
}
</style>