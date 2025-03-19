<script>
export default {
  data() {
    return {
      fruitIntroduce: [
        {
          title: '柳橙',
          imageUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742290179/%E6%9F%B3%E6%A9%99_bkvrsh.png',
          description: '每100克的柳橙可提供超過50毫克的維生素C，不僅有助於增強免疫力、促進鐵的吸收，也有助於保持皮膚健康！',
        },
        {
          title: '莓果',
          imageUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742290181/%E8%8E%93%E6%9E%9C_kyydsa.png',
          description: '莓果類包括草莓、覆盆子、藍莓等，它們富含抗氧化劑，有助於抵抗自由基的損害，並有助於維持心血管健康！',
        },
        {
          title: '西瓜',
          imageUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742290174/%E8%A5%BF%E7%93%9C_rrzvy7.png',
          description: '口感清涼解渴的西瓜富含水分和維生素，有助於保持身體水分的平衡、維持皮膚彈性和預防脫水！',
        },
        {
          title: '鳳梨',
          imageUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742290175/%E9%B3%B3%E6%A2%A8_jiqysk.png',
          description: '鳳梨是一種低熱量、高營養的水果，富含維生素C、維生素A和酵素，有助於促進消化、增強免疫力！',
        },
        {
          title: '奇異果',
          imageUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742290177/%E5%A5%87%E7%95%B0%E6%9E%9C_ovsrgr.png',
          description: '奇異果富含維生素C、維生素E、維生素K和纖維，有助於增強免疫力、保護心血管健康！',
        },
        {
          title: '綜合水果',
          imageUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742290183/%E7%B6%9C%E5%90%88_d1egxn.png',
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
