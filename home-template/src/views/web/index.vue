<template>
  <div id ="outerdiv">
    <iframe src="https://news.sina.cn/zt_d/yiqing0121?from=singlemessage&isappinstalled=0" id ='inneriframe' scrolling="no"></iframe>
  </div>
</template>

<script>
	export default {

	}
</script>

<style scoped="scoped">
    #outerdiv
    {
      margin: 0 auto;
      width:1000px;
      height:1800px;
      overflow:hidden;
      position:relative;
    }

    #inneriframe
    {
      position:absolute;
      top:0px;
      left:0px;
      width:1350px;
      height:2000px;
    }
</style>
