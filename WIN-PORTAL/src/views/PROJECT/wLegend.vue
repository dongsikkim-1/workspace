<template>
  <div class="popup-style">
      <div class="mapfloor" :style ="list.COLOR" :key= "list.NAME" v-for="list in LEGEND_LIST" >{{list.NAME}}</div>
  </div>
</template>

<script>

// Vue 핸들링 영역
export default {
    props: ["legend_list"],
    data(){
        return{
            LEGEND_LIST : ''
        };
    },
    created(){
        this.LEGEND_LIST = this.legend_list;
    }
}
</script>

<style scoped>
.popup-style {
  width:auto; 
  border: 2px solid #e6e6e659;
  background-color: rgb(233 233 233 / 39%);
  border-radius: 0.8em;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: right;
  float: right;
}
.mapfloor {
  /* background-image: url("../../assets/Images/Kiosk/map_zoom_in.svg"); */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 105px;
  height: 33px;
  background-position: center;
  background-size: 35%;
  background-repeat: no-repeat;
  border: 0;
  background-color: #173b7be3;
  border-radius: 10px;
  font-size: 22px;
  font-family: "Malgun Gothic", "맑은 고딕";
  color: black;
  text-align: center;
  font-weight: 700; 
  margin-right: 10px;
}
</style>
