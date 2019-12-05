<template>
  <div>
    <div class="scroll-container paddingh30 paddingb30 marginb30">
      <div style="width:150px;" v-for="(item,index) in list" :key="index" class="marginr30">
        <div class="img-container">
          <img :src="item.imageUrl" alt />
        </div>
        <div class="flex-container-col">
          <div class="fs-14 text-black">{{item.name}}</div>
          <div class="fs-12 text-light">{{item.dis}}</div>
          <div class="flex-container left">
            <div class="fs-16" style="color:rgb(255, 83, 57)">¥ {{item.price}}</div>
          </div> 
        </div>
      </div>
    </div>
    <div class="flex-container top">
      <cmui-tabbar position="left">
        <cmui-tabbar-item class="fs-10 text-light" v-for="(item,index) in scrolldata" :key="index" :title="item.title"></cmui-tabbar-item>
      </cmui-tabbar>
      <div class="flex-container-col">
        <div class="flex1 flex-container marginl30 left" v-for="(item, index) in list" :key="index">
            <div class="img-container marginb50" style="width:80px;">
                <img :src="item.imageUrl" alt/>
            </div>
        <div class="marginh50">
            <div>{{item.name}}</div>
            <div class="fs-10 text-light">{{item.dis}}</div>
            <div class="flex-container left">
                <div class="fs-16" style="color:rgb(255, 83, 57)">¥ {{item.price}}</div>
            </div>
        </div>
      </div>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          imageUrl:
            "https://cube.elemecdn.com/2/21/2458f97fe9a32ad89ec8ada130cc5jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_360/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
          name: "水果酸奶盒子蛋糕",
          dis: "月售30 好评率100%",
          price: 1.9
        },

        {
          imageUrl:
            "https://cube.elemecdn.com/7/c0/293ed703fab395f2023232fb22221jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_360/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
          name: "榴莲千层盒子蛋糕",
          dis: "月售80 好评率91%",
          price: 200
        },
        {
          imageUrl:
            "https://cube.elemecdn.com/0/ab/3902c27d1820d8aca0e4c8482be91jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_360/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
          name: "水果毛巾卷",
          dis: "月售55 好评率80%",
          price: 45
        },
        {
          imageUrl:
            "https://cube.elemecdn.com/0/ab/3902c27d1820d8aca0e4c8482be91jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_360/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
          name: "越销过万大蛋糕",
          dis: "月售59 好评率96%",
          price: 99
        },
        {
          imageUrl:
            "https://cube.elemecdn.com/f/5d/47fc665da3b2fad847665dfe23f69jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_360/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
          name: "爆款黑森林8寸",
          dis: "月售66 好评率90%",
          price: 89
        }
      ],
      scrolldata: [
        { title: "热销" },
        { title: "优惠" },
        { title: "水果" },
        { title: "热千层蛋糕销" },
        { title: "毛巾卷" },
        { title: "经典千层蛋糕" },
        { title: "慕斯甜品" },
        { title: "卡通蛋糕" },
        { title: "恶搞系列" },
        { title: "母亲的祝福" },
        { title: "情人节蛋糕" }
      ]
    };
  }
};
</script>
