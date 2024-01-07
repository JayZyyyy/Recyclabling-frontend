<template>
  <div class="login">
    <div class="login-box1">
      <div class="left">
        <div class="logo-box">
          <div class="img">
            <img :src="logo" alt="">
          </div>
          <div class="text">Green-ReCycling</div>
        </div>
        <div class="login-container">
          <LoginChoose></LoginChoose>
        </div>
      </div>
      <div class="right">
        <img :src="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from "../assets/login-logo.png";
import image from "../assets/login1.png";
import LoginChoose from "../components/Login/LoginChoose.vue";
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #e8efeb;
  background-image: url("../assets/logo1.jpg");
  background-size: 20% 33%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box1 {
    width: 60vw;
    height: 70vh;
    display: flex;
    background: white;

    .left {
      width: 50%;

      .logo-box {
        width: 100%;
        display: flex;
        height: 14vh;
        justify-content: center;
        align-items: center;

        img {
          width: 100px;
          transform: scale(2.5);
          margin-top: 20px;
          padding-left: 20px;
        }

        .text {
          font-family: "Rubik", sans-serif;
          font-size: 2.3rem;
          font-weight: 600;
          font-style: italic;
          letter-spacing: 0.05rem;
          color: rgb(28, 105, 122);
          padding: 30px;
          margin-top: 5vh;
        }
      }

      .login-container {
        width: 80%;
        height: 70%;
        margin: auto;
      }
    }

    .right {
      width: 50%;
      height: 100%;

      img {
        width: 100%;
        height: 90%;
      }
    }
  }
}
</style>
