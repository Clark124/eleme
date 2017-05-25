<template>
    <div class="cartcontrol">
        <transition enter-active-class="animated lightSpeedIn" leave-active-class="animated lightSpeedOut" >
        <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)" transition="move">
             <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-remove_circle_outlin"></use>
            </svg>
        </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add" @click="addCart($event)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-add_circle"></use>
            </svg>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    name: 'CarControl',
    props: {
        food: {
            type: Object,

        }
    },
    methods: {
        addCart(event) {
            if(!event._constructed){
                return
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
            } else {
                this.food.count++;
            }
            this.$emit('cartAdd',event.target)
        },
        decreaseCart(event) {
            if(!event._constructed){
                return
            }
            if (this.food.count) {
                this.food.count--;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.cartcontrol {
    font-size: 0;
    .cart-decrease,
    .cart-add {
        display: inline-block;
        padding: 6px;
        line-height: 20px;
        font-size: 20px;
        color: rgb(0, 160, 220);
        background: #fff;
    }
    .cart-count {
        display: inline-block;
        vertical-align: top;
        width: 14px;

        padding-top: 6px;
        line-height: 20px;
        text-align: center;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .cart-add {}
}
</style>

