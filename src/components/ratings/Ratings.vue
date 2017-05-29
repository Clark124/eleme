<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :size="36" :score="seller.serviceScore"></Star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :size="36" :score="seller.foodScore"></Star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <Split></Split>
      <Ratingselect @refresh="doRefresh" ref="ratingselect" :selectType="selectTypes" :onlyContent="onlyContents" :ratings="ratings"></Ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needshow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star class="star" :size="24" :score="rating.score"></Star>
                <span class="delivery" v-show="rating.deliveryTime">
                  {{rating.deliveryTime}}分钟送达
                </span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class='recommend' v-show="rating.recommend &&　rating.recommend.length>0">
                <span class="up" v-if="rating.rateType===0">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-thumb_up"></use>
                  </svg>
                </span>
                <span　class="recommend-item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '../star/Star'
import Split from '../split/Split'
import Ratingselect from '../ratingselect/Ratingselect'
import AV from '../../lib/leancloud.js'
import { format } from 'silly-datetime'
import BScroll from 'better-scroll'
const ALL = 2;
export default {
  name: 'Ratings',
  props: ['seller'],
  data() {
    return {
      ratings: [],
      showFlag: false,
      selectTypes: { selecttypes: ALL },
      onlyContents: { onlycontent: true },
    }
  },
  created() {
    var query = new AV.Query('ElemeData');
    query.find()
      .then((res) => {
        this.ratings = res[0].attributes.ratings;
        this.$nextTick(() => {
          this.ratingScroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        })
      }, function (error) {
        console.error(error)
      })
  },
  methods: {
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
    doRefresh() {
      this.$nextTick(() => {
        this.ratingScroll.refresh()
      })
    }
  },
  filters: {
    formatDate(time) {
      return format(time, 'YYYY-MM-DD HH:mm')
    }
  },
  components: {
    Star, Split, Ratingselect
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/css/mixin.scss';
.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    padding: 18px 0;
    .overview-left {
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;
      @media only screen and (max-width: 320px) {
        flex:0 0 110px;
        width: 110px;
      }
      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }
      .title {
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
      }
      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;
      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }
      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;
        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          display: inline-block;
          vertical-align: top;
        }
        .star {
          display: inline-block;
          vertical-align: top;
          margin: 0 12px;
        }
        .score {
          font-size: 12px;
          line-height: 18px;
          display: inline-block;
          vertical-align: top;
          color: rgb(255, 153, 0);
        }
      }
      .delivery-wrapper {
        font-size: 0;
        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .delivery-time {
          font-size: 12px;
          color: rgb(147, 153, 159);
          margin-left: 12px;
        }
      }
    }
  }
  .rating-wrapper {
    padding: 0 18px;
    .rating-item {
      display: flex;
      padding: 18px 0;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
        img {
          border-radius: 50%;
        }
      }
      .content {
        flex: 1;
        position: relative;
        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }
        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;
          .star {
            display: inline-block;
            vertical-align: top;
            margin-right: 16px;
          }
          .delivery {
            display: inline-block;
            vertical-align: top;
            color: rgb(147, 153, 159);
            line-height: 12px;
            font-size: 10px;
          }
        }
        .text {
          font-size: 12px;
          line-height: 18px;
          color: (7, 17, 27);
          margin-bottom: 8px;
        }
        .recommend {
          font-size: 0;
          line-height: 16px;
          .up {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            color: rgb(0, 160, 220);
            margin-right: 6px;
          }
          .recommend-item {
            display: inline-block;
            padding: 0 6px;
            vertical-align: top;
            color: rgb(147, 153, 159);
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            font-size: 12px;
            margin-right: 8px;
            margin-bottom: 4px;
            background: #fff;
          }
        }
        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>

