<template>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div v-show="showFlag" class="food" ref="food" @click="doRefresh">
            <div class="food-content">
                <div class="img-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="hide">
                        <i class="iconfont icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <CartControl :food="food" @cartAdd="drop"></CartControl>
                    </div>
                    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                        <div class="buy" v-show="!food.count || food.count===0" @click="addFirst($event)">加入购物车</div>
                    </transition>
                </div>
                <Split v-show="food.info"></Split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <Split></Split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <Ratingselect ref="ratingselect" @refresh="doRefresh" :selectType="selectTypes" :onlyContent="onlyContents" :desc="desc" :ratings="food.ratings"></Ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needshow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img :src="rating.avatar" class="avatar" width="12" height="12" alt="">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span class="up" v-if="rating.rateType===0">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-thumb_up"></use>
                                        </svg>
                                    </span>
                                    <span class="down" v-else-if="rating.rateType===1">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-thumb_down"></use>
                                        </svg>
                                    </span>
                                    {{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
                            暂无评价
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import BScroll from 'better-scroll'
import CartControl from '../cartcontrol/CarControl'
import Split from '../split/Split'
import Vue from 'vue'
import Ratingselect from '../ratingselect/Ratingselect'
import { format } from 'silly-datetime';


const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2;
export default {

    name: 'Food',
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false,
            selectTypes: { selecttypes: ALL },
            onlyContents: { onlycontent: true },
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        }
    },
    methods: {
        doRefresh() {
            this.$nextTick(() => {
                this.scroll.refresh()
            })

        },
        needshow(type, text) {
            if (this.onlyContents.onlycontent && !text) {
                return false
            }
            if (this.selectTypes.selecttypes === ALL) {
                return true;
            } else {
                return type === this.selectTypes.selecttypes
            }
        },
        drop() {
            this.$emit('cartAdd', event.target)
        },
        addFirst(event) {
            if (!event._constructed) {
                return;
            }
            this.$emit('cartAdd', event.target)
            Vue.set(this.food, 'count', 1);

        },
        show() {
            this.showFlag = true
            // this.selectTypes.selecttypes = ALL
            // this.onlyContents.onlycontent = true

            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    })
                    this.doRefresh()
                } else {
                    this.scroll.refresh()
                }
            })


        },
        hide() {
            this.showFlag = false;
        }
    },
    filters: {
        formatDate(time) {
            return format(time, 'YYYY-MM-DD HH:mm')
        }
    },
    computed: {

    },
    components: {
        CartControl, Split, Ratingselect
    }
}
</script>
<style scoped lang="scss">
@import '../../common/css/mixin.scss';
.food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #FFF;
    .img-header {
        width: 100%;
        img {
            width: 100%;
        }
        .back {
            position: absolute;
            top: 10px;
            left: 0;
            .icon-arrow_lift {
                display: block;
                padding: 10px;
                font-size: 20px;
                color: #fff;
            }
        }
    }
    .content {
        position: relative;
        padding: 18px;
        .title {
            line-height: 14px;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(7, 17, 27);
        }
        .detail {
            margin-bottom: 18px;
            line-height: 10px;
            height: 10px;
            font-size: 0;
            .sell-count,
            .rating {
                font-size: 10px;
                color: rgb(147, 153, 159);
            }
            .sell-count {
                margin-right: 12px;
            }
        }
        .price {
            font-weight: 700;
            line-height: 24px;
            .now {
                margin-right: 18px;
                font-size: 14px;
                color: rgb(240, 20, 20);
            }
            .old {
                text-decoration: line-through;
                font-size: 10px;
                color: rgb(147, 153, 159);
            }
        }
        .cartcontrol-wrapper {
            position: absolute;
            right: 12px;
            bottom: 12px;
        }
        .buy {
            position: absolute;
            right: 18px;
            bottom: 18px;
            z-index: 10;
            height: 24px;
            line-height: 24px;
            padding: 0 12px;
            box-sizing: border-box;
            border-radius: 12px;
            font-size: 10px;
            color: #fff;
            background: rgb(0, 160, 220);
        }
    }
    .info {
        padding: 18px;
        .title {
            line-height: 14px;
            margin-bottom: 16px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .text {
            line-height: 24px;
            padding: 0 8px;
            font-size: 12px;
            color: rgb(77, 85, 93)
        }
    }
    .rating {
        padding-top: 18px;
        .title {
            line-height: 14px;
            margin-left: 16px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .rating-wrapper {
            padding: 0 18px;
            .rating-item {
                position: relative;
                padding: 16px 0;
                @include border-1px(rgba(7, 17, 27, 0.1));
                .user {
                    position: absolute;
                    right: 0;
                    top: 16px;
                    font-size: 0;
                    line-height: 12px;
                    .name {
                        display: inline-block;
                        vertical-align: top;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                        margin-right: 6px;
                    }
                    .avatar {
                        border-radius: 50%;
                    }
                }
                .time {
                    margin-bottom: 6px;
                    line-height: 12px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .text {
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                    .up,
                    .down {
                        margin-right: 4px;
                        line-height: 16px;
                        font-size: 12px;
                    }
                    .up {
                        color: rgb(0, 160, 220);
                    }
                    .down {
                        color: rgb(147, 153, 159);
                    }
                }
            }
            .no-rating {
                padding: 16px 0;
                font-size: 12px;
                color: rgb(147, 153, 159);
            }
        }
    }
}
</style>
