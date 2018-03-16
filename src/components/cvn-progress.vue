<template>
    <canvas width="40" height="40" ref="canvas" class="can"></canvas>
</template>

<script>
  export default {
    props: {
      pcurrentTime: {
        default: 0
      },
      pduration: {
        default: 0
      }
    },
    watch:{
      pcurrentTime() {
        this.drap()
      }
    },
    methods: {
      drap() {
        let content = this.$refs.canvas.getContext('2d');

        //首先清空画布
        content.clearRect(0, 0, 40, 40);
        content.save();

        content.beginPath();

        //偏移坐标系,旋转起始坐标点为12点钟
        content.translate(20,20);
        content.rotate( -90 / 180 * Math.PI);

        content.fillStyle = "#EEEE00";

        //开始画扇形

        //偏转的角度数
        let endDeg = parseInt(this.pcurrentTime) * 360 / parseInt(this.pduration) / 180 * Math.PI;

        content.arc(0, 0, 16, 0, endDeg);
        content.lineTo(0, 0);
        content.closePath();
        content.fill();
        content.restore()
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>
