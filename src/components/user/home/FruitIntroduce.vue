<script>
export default {
  data() {
    return {
      fruitIntroduce: [
        {
          title: '柳橙',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1712667836366.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=nVrdRncvezwLG0wXkbq6uDynOmPL1%2FQKBBS%2FrOx9smNDJV4l8xjT%2Fs25smbedltK6pK1m%2Bo90%2FLjs6SOED3avJzHE0VDhl1FOx2jtE7zL7kYj%2FZZQLN6sRf3O4sQtn9D85BhtTZ7ZC9TXjb6NzEubC%2FFtq%2B1ITCyD0DbUK9FsfrjVODR5IQrAg7wq96GUMHnIhGLMEnbQHtXaoW1nm5EWo7ctvfl9qHBXMhNLNupyChBa3aQVQ%2Fk5NmIlAIvQgR0cj3WTKXsZgL44hS6telzBh9u%2Bx1xZ4de6Dj5L%2BqeR3Bv8%2FSzdXXk3IqA3vNF%2F%2BKa7rHE%2B3ZVwGNuS1TFt5g0rA%3D%3D',
          description: '每100克的柳橙可提供超過50毫克的維生素C，不僅有助於增強免疫力、促進鐵的吸收，也有助於保持皮膚健康！',
        },
        {
          title: '莓果',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1712667906671.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=PYUbkfRIazmxqFfPmEupRODd3MEmPNYMrpRZb8BkdMXSqDg8IfV1u%2FXwFkCT0sj9jpdUtnq0rX6wIhOW7LdkmoM7l%2BND%2FzYIi0zLPxaPAfCBOorDs%2F%2BonXzSGuETrzjYAZKvHhkcYFk9SwsAVbRfKnyK9f9p%2FYPt0rH2aaAW0mHwLexo%2B%2FOypSonyk5TdtyAXqv4A3ajQatKxohHYopbTBJ6UZg4X0%2BkAMP5zFeWly0gtf%2FskUcK%2BZ7W%2BDLPEX23LYK9gXI7BrvYyi%2F%2BcPR9tP5R3HBK9aeG0Tt8pSJkyKeiDkalH2lELzIU%2BdisN8ZPOot01Yq6UhZcg%2FoA8GmvCA%3D%3D',
          description: '莓果類包括草莓、覆盆子、藍莓等，它們富含抗氧化劑，有助於抵抗自由基的損害，並有助於維持心血管健康！',
        },
        {
          title: '西瓜',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1712667922891.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=lAnQaHGMqj7zDAA2Smnk2LB51lMbvxxJk%2BR6sN98ptIl8C6cCvEVSWpPaNsbLlNfWe8R5s%2FjyRKF4uIM8YFOaqMtV00UaKDjSuX3lNmWoEFpN6ChaG%2FC5aakVeBsDdee5LEnyXofALHT3%2Bz2ZFEdOB36EVao4Qba8eI4EZB6Tgo0DGCTDoKFk3nQHbgiDUhefsTX8e6%2Be1%2BgUaj6%2BqxndMFvqcPrqKbmMjcso%2Bj7ugJla%2B7ntRNUkoniNyZP3V5XMyTTK8mI6qgJWSosKmU4c0%2FnskwmOUFAEkkzS%2Fvrtyy%2B5IHJ5diIT9rutSwzEiXu913oyZeF8w7SJYZKS5UntA%3D%3D',
          description: '口感清涼解渴的西瓜富含水分和維生素，有助於保持身體水分的平衡、維持皮膚彈性和預防脫水！',
        },
        {
          title: '鳳梨',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1712667938494.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=LOUHVHTaqz3rGj2UOnfOMHc1nlCWIatoQTNKO2ScIuNu27Js1IkmiFGVCVgP8sz9stMcuQaxwosK5gnXCQb3I%2FJYxhswsEJU14LmEtudQUPh1MNGqupfRM36989T4YRkqBCNFYga3peofGXGVR3EbQDeGZuyzqw6twrv4aL64cqpAfcF02VcrufP9ZLT33TxnEfb06QJZ4%2BnJUgyx%2F6eNrz5DEOAfHV3Z9jxKTbId%2F926%2F%2FLWiMhSaZ0etqYslZv2ppGHQbYnv8nhNPdezkFuQN3T6AExW9cdTaoVNj8xTVQdHk2cjCHHi3ma6ib7JKcoSz6njkuixYJ7H9ITGS5Eg%3D%3D',
          description: '鳳梨是一種低熱量、高營養的水果，富含維生素C、維生素A和酵素，有助於促進消化、增強免疫力！',
        },
        {
          title: '奇異果',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1712667952932.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=le12qlOvxZcHlp6ez7pD%2BzogTyi9e3veOD1QoThw5ZNNFRsLdGQuIJrc5C9xGoDkkB6TNlx0sL%2FmCITvbL6LrfYHTrYepJz1yfUd9e3lLS8irROAqvhS4AeN3SvyGIA3isykb0C%2FUSD2uZokJkmNkU9OqN1poeDFkzWT10UYJnIzkjeS7Aea2Wd5Qe8wX7%2B2FMV8UUnPB%2FNSRp7OR9%2FBPMmJWp1NPtR3HdeebNLTzGAUrn5KCpvVi%2Bx2GSCGqIBeClGp8bQGE8UeIijrEPWoqnbDKjTvfmFKdu54Y9rjb645g%2BsooUvm9F4WEX%2F8pg9Sb%2FrTxvRZI7%2BejxX53Mf3%2BA%3D%3D',
          description: '奇異果富含維生素C、維生素E、維生素K和纖維，有助於增強免疫力、保護心血管健康！',
        },
        {
          title: '綜合水果',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1712667966450.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hQhUSePQloo%2BtjSjE8A8%2BjGIlUvuFZg%2F7OWXWXq5FIyiS2pJtTgL58Gz3EdMDFY8ch9j9thG7JqfWTH%2BZnaZWvaQq%2Bh9fiFjGi5lDYJtqmnb5WSTqnBwPHhSPXc4bSmR5mHvTuux65yzaZNt5Y3YzGLEVAVCCUgwk5gqvkoItp%2FN1nZI4BfC%2F701bdcLBbYRCVlVM9JERvZRYX5WD4RI482RonQAewJmIGxfzmhHN6CwDKo1LOeoBgeCyjlFPqhqSnq%2Bo36lWp0ozfisgQHPqRiHcyISycrvONZ7B3o%2FjzyXBTOuP2zbV7Dhrg9T0aUDtgDe%2FWRmlcjbO5zLlK1owg%3D%3D',
          description: '綜合水果不僅色彩繽紛、口感多樣，還提供多種營養素，每一口都是對身體健康的呵護和美味的享受！',
        },
      ],
      fruitIntroduceTop: [],
      fruitIntroduceBottom: [],
      introduceIndex: 0,
    };
  },
  created() {
    this.fruitIntroduce.forEach((item, key) => {
      this.fruitIntroduce[key].index = key;
    });
    this.fruitIntroduceTop = this.fruitIntroduce.slice(0, this.fruitIntroduce.length / 2);
    this.fruitIntroduceBottom = this.fruitIntroduce.slice(this.fruitIntroduce.length / 2);
  },
};
</script>

<template>
  <section class="py-4 py-lg-5 bg-light">
    <h3 class="text-primary text-center mb-md-5 d-none d-lg-block">
      每一口水果都是對健康的呵護
    </h3>
    <h3 class="text-primary text-center mb-3 lh-base d-lg-none">
      每一口水果<span class="d-block">都是對健康的呵護</span>
    </h3>
    <div class="container d-none d-lg-block">
      <div class="row flex-nowrap align-items-center">
        <div class="col"
          v-for="(fruit, key) in fruitIntroduce" :key="'introduce-image' + key">
          <div class="position-relative"
            :class="{'border border-3 border-primary-subtle': introduceIndex === key}"
            style="transition: transform 0.5s;"
            :style="{'transform': introduceIndex === key ? 'scale(1.1)' : ''}">
            <img :src="fruit.imageUrl" :alt="fruit.title"
              class="img-fluid shadow" style="object-fit: cover;">
            <div class="position-absolute w-100 h-100 bg-dark top-0 introduceMask"
              :class="{'active': introduceIndex === key}"
              style="cursor: pointer;" @click="introduceIndex = key"></div>
          </div>
        </div>
      </div>
      <div class="position-relative d-flex" style="padding-top: 30px;">
        <template v-for="(fruit, key) in fruitIntroduce" :key="'introduce-description' + key">
          <div class="position-absolute arrow-up z-1"
            :class="{'active': introduceIndex === key}"
            :style="{'left': `${key * 100 / fruitIntroduce.length}%`,
            'margin-left': `calc(${50 / fruitIntroduce.length}% - 20px)`}"></div>
          <div class="introduce-card text-center p-2 z-0"
            :class="{'active': introduceIndex === key,
              'me-auto': key < fruitIntroduce.length * 2 / 3,
              'ms-auto': key >= fruitIntroduce.length / 3,}"
            style="transition: all 0.5s;">
            <div class="bg-white position-relative" style="padding: 2rem; max-width: 350px;">
              <p style="text-align: justify">{{ fruit.description }}</p>
              <router-link :to="`products/search=${fruit.title.substr(0, 1)}`"
                class="btn btn-primary text-decoration-none stretched-link">
                {{ `${fruit.title}相關產品` }}<i class="bi bi-caret-right-fill ms-1"></i>
              </router-link>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="container d-lg-none mb-5">
      <div class="row flex-nowrap align-items-center">
        <div class="col"
          v-for="(fruit, key) in fruitIntroduceTop" :key="'introduce-image-smTop' + key">
          <div class="position-relative"
            :class="{'border border-3 border-primary-subtle': introduceIndex === key}"
            style="transition: transform 0.5s;"
            :style="{'transform': introduceIndex === key ? 'scale(1.1)' : ''}">
            <img :src="fruit.imageUrl" :alt="fruit.title"
              class="img-fluid shadow" style="object-fit: cover;">
            <div class="position-absolute w-100 h-100 bg-dark top-0 introduceMask"
              :class="{'active': introduceIndex === key}"
              style="cursor: pointer;" @click="introduceIndex = key"></div>
          </div>
        </div>
      </div>
      <div class="position-relative" style="padding-top: 30px; padding-bottom: 30px;">
        <template v-for="(fruit, key) in fruitIntroduceTop"
          :key="'introduce-description-smTop' + key">
          <div class="position-absolute arrow-up z-1"
            :class="{'active': introduceIndex === key}"
            :style="{'left': `${key * 100 / fruitIntroduceTop.length}%`,
            'margin-left': `calc(${50 / fruitIntroduceTop.length}% - 20px)`}"></div>
          <div class="introduce-card text-center p-2 z-0"
            :class="{'active': introduceIndex === key}"
            style="transition: all 0.5s;">
            <div class="bg-white" style="padding: 2rem;">
              <p style="text-align: justify">{{ fruit.description }}</p>
              <router-link :to="`products/search=${fruit.title.substr(0, 1)}`"
                class="btn btn-primary text-decoration-none stretched-link">
                {{ `${fruit.title}相關產品` }}<i class="bi bi-caret-right-fill ms-1"></i>
              </router-link>
            </div>
          </div>
        </template>
        <template v-for="(fruit, key) in fruitIntroduceBottom"
          :key="'introduce-description-smBottom' + key">
          <div class="position-absolute arrow-down z-1"
            :class="{'active': introduceIndex === fruit.index}"
            :style="{'left': `${key * 100 / fruitIntroduceBottom.length}%`,
            'margin-left': `calc(${50 / fruitIntroduceBottom.length}% - 20px)`}"></div>
          <div class="introduce-card downToUp text-center p-2 z-0"
            :class="{'active': introduceIndex === fruit.index}"
            style="transition: all 0.5s;">
            <div class="bg-white" style="padding: 2rem;">
              <p style="text-align: justify">{{ fruit.description }}</p>
              <router-link :to="`products/search=${fruit.title.substr(0, 1)}`"
                class="btn btn-primary text-decoration-none stretched-link">
                {{ `${fruit.title}相關產品` }}<i class="bi bi-caret-right-fill ms-1"></i>
              </router-link>
            </div>
          </div>
        </template>
      </div>
      <div class="row flex-nowrap align-items-center">
        <div class="col"
          v-for="(fruit, key) in fruitIntroduceBottom" :key="'introduce-image-smBottom' + key">
          <div class="position-relative"
            :class="{'border border-3 border-primary-subtle': introduceIndex === fruit.index}"
            style="transition: transform 0.5s;"
            :style="{'transform': introduceIndex === fruit.index ? 'scale(1.1)' : ''}">
            <img :src="fruit.imageUrl" :alt="fruit.title"
              class="img-fluid shadow" style="object-fit: cover;">
            <div class="position-absolute w-100 h-100 bg-dark top-0 introduceMask"
              :class="{'active': introduceIndex === fruit.index}"
              style="cursor: pointer;"
              @click="introduceIndex = fruit.index"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.introduceMask{
  opacity: 0.5;
  &:hover{
    opacity: 0;
  }
  &.active{
    opacity: 0;
  }
}
.introduce-card{
  background-color: #e4ebef;
  display: none;
}
.introduce-card.active{
  display: block;
  opacity: 0;
  overflow: hidden;
  animation: cardUpToDown 0.5s forwards;
}
.introduce-card.downToUp.active{
  animation: cardDownToUp 0.5s forwards;
}
.arrow-up{
  top: 16px;
  border-style: solid;
  border-width: 0 15px 15px 15px;
  border-color: transparent transparent #e4ebef transparent;
  opacity: 0;
  &::after{
    content: '';
    position: absolute;
    top: 12px;
    left: -12px;
    border-style: solid;
    border-width: 0 12px 12px 12px;
    border-color: transparent transparent #FFFFFF transparent;
  }
}
.arrow-up.active{
  animation: cardUpToDown 0.3s 0.2s forwards;
}
.arrow-down{
  bottom: 16px;
  border-style: solid;
  border-width: 15px 15px 0 15px;
  border-color: #e4ebef transparent transparent transparent;
  opacity: 0;
  &::after{
    content: '';
    position: absolute;
    bottom: 12px;
    left: -12px;
    border-style: solid;
    border-width: 12px 12px 0 12px;
    border-color: #FFFFFF transparent transparent transparent;
  }
}
.arrow-down.active{
  animation: cardDownToUp 0.3s 0.2s forwards;
}
@keyframes cardUpToDown{
  0%{
    opacity: 0;
    transform: translateY(-20%);
  }
  100%{
    opacity: 1;
    transform: translateY(0%);
  }
}
@keyframes cardDownToUp{
  0%{
    opacity: 0;
    transform: translateY(20%);
  }
  100%{
    opacity: 1;
    transform: translateY(0%);
  }
}
</style>
