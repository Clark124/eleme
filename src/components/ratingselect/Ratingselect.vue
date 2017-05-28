<template>
    <div>
        <div class="ratingselect">
            <div class="rating-type border-1px">
                <span @click="select(2,$event)" class="block positive" :class="{'active':selectType.selecttypes===2}">{{desc.all}}
                    <span class="count">47</span>
                </span>
                <span @click="select(0,$event)" class="block positive" :class="{'active':selectType.selecttypes===0}">{{desc.positive}}
                    <span class="count">40</span>
                </span>
                <span @click="select(1,$event)" class="block negative" :class="{'active':selectType.selecttypes===1}">{{desc.negative}}
                    <span class="count">40</span>
                </span>
            </div>
            <div class="switch" @click="toggleContent($event)">
                <svg class="icon" :class="{'on':onlyContent.onlycontent}" aria-hidden="true">
                    <use xlink:href="#icon-check_circle"></use>
                </svg>
                <span class="text">只看内容的评价</span>
            </div>
        </div>
    </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2;
export default {
    // props:['ratings','selectTypes','onlyContents','desc'],
    props: {
        ratings: {
            type: Array,
            default() {
                return []
            }
        },
        selectType: {
            type: Object,
            default() {
                return {
                    selecttypes: ALL
                }
            }
        },
        onlyContent: {
            type: Object,
            default() {
                return {
                    onlycontent: true
                }
            }
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: "全部",
                    positive: "满意",
                    negative: '不满意'
                }
            }
        }
    },
    // data(){
    //     return{
    //         selectTypes:''
    //     }
    // },
    // mounted(){
    //     this.selectTypes = this.selectType
    // },
    methods: {
        select(type, event) {
            if (!event._constructed) {
                return
            }
            this.selectType.selecttypes = type
        },
        toggleContent(event) {
            if (!event._constructed) {
                return
            }
            this.onlyContent.onlycontent = !this.onlyContent.onlycontent
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../common/css/mixin.scss';
.ratingselect {
    .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        @include border-1px(rbga(7, 17, 27, 0.1));
        font-size: 0;
        .block {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            border-radius: 1px;
            font-size: 12px;
            color: rgb(77, 85, 93);
            &.active {
                color: #fff;
            }
            .count {
                margin-left: 2px;
                font-size: 8px;
            }
            &.positive {
                background: rgba(0, 160, 220, 0.2);
                &.active {
                    background: rgb(0, 160, 220);
                }
            }
            &.negative {
                background: rgba(77, 85, 93, 0.2);
                &.active {
                    background: rgb(77, 85, 93)
                }
            }
        }
    }
}

.switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    font-size: 0;
    .icon {
        display: inline-block;
        margin-right: 4px;
        font-size: 24px;
        vertical-align: top;
        &.on {
             color: #00c850;
        }
    }
    .text {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
    }
}
</style>
