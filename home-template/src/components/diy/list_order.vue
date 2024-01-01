<template>
  <div class="list_order">
    <div class="item_order" v-for="(o, i) in list" :key="i">
      <div class="state">
        {{ o.state }}
      </div>
      <div class="goods_list" v-for="(obj, idx) in o.list" :key="idx">
        <router-link
          :to="'./details?order_number=' + o.order_number"
          class="item_goods flex_sbc"
        >
          <div class="img_block">
            <img
              style="width: 4.5rem; height: 4.5rem"
              :src="$fullUrl(obj[vm.img])"
              mode="scaleToFill"
            />
          </div>
          <div class="middle_info">
            <div class="title">
              {{ obj[vm.title] }}
            </div>
            <div class="description">
              {{ obj[vm.description] }}
            </div>
          </div>
          <div class="right_info">
            <div class="price">￥{{ obj[vm.price] }}</div>
            <div class="num">×{{ obj[vm.num] }}</div>
          </div>
        </router-link>
      </div>
      <div class="sum_price flex_sbc">
        <span>实付：￥{{ o.sum_price }}</span>
        <b-button
          @click="del_order(o.order_number, i)"
          class="btn_del"
          type="default"
          size="mini"
        >
          <b-icon icon="trash"></b-icon>
        </b-button>
<!--		<b-button class="btn_ps"-->
<!--			v-if="(user_group == '管理员' || user_group == '卖家') && o.state == '已付款'"-->
<!--			type="default"-->
<!--			size="mini"-->
<!--			@click="addLogi(o.list[0])">-->
<!--			配送-->
<!--		</b-button>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    vm: {
      type: Object,
      default: function () {
        return {
          order_number: "order_number",
          title: "title",
          img: "img",
          price: "price",
          price_ago: "price_ago",
          price_count: "price_count",
          num: "num",
          goods_id: "goods_id",
          description: "description",
          contact_name: "contact_name",
          contact_phone: "contact_phone",
          contact_address: "contact_address",
          postal_code: "postal_code",
          user_id: "user_id",
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 删除订单
     * @param { Number } order_number 订单编号
     */
    del_order(order_number, i) {
      this.$get(
        "~/api/order/del",
        {
          order_number,
        },
        (res) => {
          this.list.splice(i, 1);
        }
      );
    }
	// ,addLogi(data) {
	// 	var today = new Date();
	// 	var year = today.getFullYear();
	// 	var month = today.getMonth() + 1;
	// 	var day = today.getDate();
	// 	var currentDate = year + "/" + month + "/" + day
	// 	var postData = {
	// 		"order_number":data.order_number
	// 		,"product_name":data.title
	// 		,"purchase_quantity":data.num
	// 		,"total_transaction_amount":data.price_count
	// 		,"the_date_of_issuance":currentDate
	// 		,"seller":0
	// 		,"store_name":""
	// 		,"delivery_number":Number(Math.random().toString().substr(3,12) + Date.now()).toString(36)
	// 		,"shipping_address":data.contact_address
	// 		,"delivery_status":"待取货"
	// 		,"signing_status":"待签收"
	// 		,"logistics_delivery_id":0
	// 		,"contact_name":data.contact_name
	// 		,"merchant_id":data.merchant_id
	// 		,"ordinary_users":data.user_id
	// 	}
	// 	this.$post("~/api/logistics_delivery/add?", postData, (json, status) => {
	// 		if (json.result) {
	// 			this.$toast('添加成功！', 'success');
	//             setTimeout(() => {
	//                 this.$router.push('/logistics_delivery/table')
	//             }, 2000)
	// 		} else if (json.error) {
	// 			this.$toast(json.error.message, 'danger');
	// 		}
	// 	});
	// }
  }
};
</script>

<style scoped>
.flex_cc {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex_sbc {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item_order {
  background-color: #ffffff;
  padding: 0.4rem 0.8rem;
  margin-bottom: 0.8rem;
}
.item_order .state {
  text-align: right;
  color: var(--color_primary);
  border-bottom: 2px solid #f8f8f8;
  padding-bottom: 0.5rem;
}

.goods_list .item_goods {
  align-items: stretch;
  padding: 0.2rem;
  border-bottom: 1px solid #f4f4f4;
}

.goods_list .img_block {
  padding: 0.2rem;
}

.goods_list .middle_info {
  width: calc(100% - 8rem);
}

.goods_list .title {
  font-size: 0.9rem;
  min-height: 1.4rem;
}

.goods_list .description {
  color: var(--color_grey);
  font-size: 0.6rem;
}

.goods_list .right_info {
  display: flex;
  flex-direction: column;
}

.goods_list .price {
  font-size: 0.9rem;
}

.goods_list .num {
  color: var(--color_grey);
  text-align: right;
  font-size: 0.5rem;
}

.sum_price {
  height: 2.5rem;
}

.sum_price > text {
  color: var(--color_red);
}

.btn_del {
  padding: 0 1rem;
  margin: 0;
}
.btn_del:hover {
  background: var(--color_info_b);
  border-color: var(--color_info_b);
}
</style>
