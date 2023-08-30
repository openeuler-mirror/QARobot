<template>
  <footer class="footer">
    <AppContent :pc-top="0" :mobile-top="0">
      <div class="atom">
        <p class="atom-text">
          openEuler 是由开放原子开源基金会（OpenAtom
          Foundation）孵化及运营的开源项目
        </p>
        <a
          href="https://openatom.cn/home"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="@/assets/common/footer/atom-new-logo.svg"
            class="atom-logo"
            alt="openEuler"
          />
        </a>
      </div>
    </AppContent>
    <div class="footer-content">
      <AppContent :pc-top="0" :mobile-top="0">
        <div class="inner">
          <div class="footer-logo">
            <img
              class="show-pc"
              src="@/assets/common/footer/footer-logo2.png"
              alt="openEuler"
            />
            <img
              class="show-mo"
              src="@/assets/common/footer/footer-logo1.png"
              alt="openEuler"
            />
            <p>
              <a class="email" @click="goEmail()"> contact@openeuler.io </a>
            </p>
          </div>
          <div class="footer-option">
            <div class="footer-option-item">
              <a
                v-for="link in rightList"
                :key="link.URL"
                href="javascript:;"
                class="link"
                @click="handleNavClick(link.URL)"
                >{{ link.NAME }}</a
              >
            </div>
            <p class="copyright">版权所有 © 2023 openEuler 保留一切权利</p>
          </div>
          <div class="footer-right">
            <div v-if="lang === 'zh'" class="code-box">
              <a
                v-for="(item, index) in footerCodeList"
                :key="index"
                class="code-pop"
                href="javascript:;"
              >
                <img :src="item.img" class="code-img" alt="openEuler" />
                <div class="code-layer">
                  <img :src="item.code" alt="openEuler" />
                  <p class="txt">{{ item.label }}</p>
                </div>
              </a>
            </div>
            <div class="footer-links" :class="{ iszh: lang === 'zh' }">
              <div class="footer-top">
                <img src="" alt="" />
              </div>
              <a
                v-for="item in linksData"
                :key="item.id"
                :href="item.path"
                rel="nofollow noopener noreferrer"
                class="links-logo"
                target="_blank"
              >
                <img :src="item.logo" alt="openEuler" />
              </a>
            </div>
          </div>
        </div>
      </AppContent>
    </div>
  </footer>
</template>

<script>
import AppContent from '@/components/AppContent.vue'
import FooterBg from '@/assets/common/footer/footer-bg.png'
import FooterBgMo from '@/assets/common/footer/footer-bg-mo.png'

// 中文友情链接
import LogoBilibili from '@/assets/common/footer/bilibili.png'
import LogoInfoq from '@/assets/common/footer/infoq.png'
import LogoJuejin from '@/assets/common/footer/juejin.png'
import LogoOschina from '@/assets/common/footer/oschina.png'
import LogoCsdn from '@/assets/common/footer/csdn.png'
import Logo51cto from '@/assets/common/footer/51cto.png'

// 公众号、小助手
import CodeTitleXzs from '@/assets/common/footer/img-xzs.png'
import CodeTitleGzh from '@/assets/common/footer/img-gzh.png'
import CodeImgXzs from '@/assets/common/footer/code-xzs.png'
import CodeImgZgz from '@/assets/common/footer/code-zgz.png'

// float
import floatLight from '@/assets/common/footer/float_light.png'

export default {
  name: 'appFooter',
  components: { AppContent },
  data: () => {
    return {
      lang: 'zh',
      rightList: [
        {
          NAME: '品牌',
          URL: 'https://www.openeuler.org/zh/other/brand/',
        },
        {
          NAME: '隐私政策',
          URL: 'https://www.openeuler.org/zh/other/privacy/',
        },
        {
          NAME: '法律声明',
          URL: 'https://www.openeuler.org/zh/other/legal/',
        },
        {
          NAME: '服务状态',
          URL: 'https://status.openeuler.org/',
        },
      ],
      linksData: [
        {
          path: 'https://my.oschina.net/openeuler',
          logo: LogoOschina,
          id: 'oschina',
        },
        {
          path: 'https://blog.csdn.net/openEuler_?spm=1000.2115.3001.5343',
          logo: LogoCsdn,
          id: 'csdn',
        },
        {
          path: 'https://juejin.cn/user/3183782863845454',
          logo: LogoJuejin,
          id: 'juejin',
        },
        {
          path: 'https://space.bilibili.com/527064077/channel/series',
          logo: LogoBilibili,
          id: 'bilibili',
        },
        {
          path: 'https://www.infoq.cn/profile/6E6CE3E2316F28/publish',
          logo: LogoInfoq,
          id: 'infoq',
        },
        {
          path: 'https://blog.51cto.com/u_14948868',
          logo: Logo51cto,
          id: '51cto',
        },
      ],
      footerCodeList: [
        {
          img: CodeTitleXzs,
          code: CodeImgXzs,
          label: 'openEuler公众号',
        },
        {
          img: CodeTitleGzh,
          code: CodeImgZgz,
          label: 'openEuler小助手',
        },
      ],
      footBg: {
        pc: `url(${FooterBg})`,
        mo: `url(${FooterBgMo})`,
      },
    }
  },
  computed: {
    floatImg() {
      return floatLight
    },
  },
  created() {},
  methods: {
    handleNavClick(path) {
      if (path.indexOf('status') !== -1) {
        window.open(path, '_blank')
      } else {
        // window.location.replace(path);
        window.location.href = path
      }
    },
    goEmail() {
      window.open('mailto:contact@openeuler.io')
    },
  },
}
</script>

<style lang="scss" scoped>
$color: #fff;
.footer {
  background: #1e1e1e;
  :deep(.app-content) {
    padding-bottom: 0;
  }
  .atom {
    text-align: center;
    padding: 32px 0 24px;
    position: relative;
    border-bottom: 1px solid rgba(229, 229, 229, 0.12);
    @media (max-width: 1440px) {
      padding: 24px 0;
    }

    &-text {
      font-size: 20px;
      font-weight: 400;
      color: $color;
      line-height: 28px;
      @media (max-width: 1440px) {
        font-size: 14px;
        line-height: 22px;
      }
    }
    &-logo {
      height: 40px;
      margin-top: 16px;
      @media (max-width: 1100px) {
        height: 30px;
      }
    }
  }

  &-content {
    background: v-bind('footBg.pc') no-repeat bottom center;
    @media (max-width: 767px) {
      background: v-bind('footBg.mo') no-repeat bottom center;
    }
    .inner {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: 18px 0 32px;
      position: relative;
      // min-height: 118px;
      @media (max-width: 1400px) {
        padding: 24px 0;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  &-logo {
    flex: 1;
    img {
      height: 46px;
    }
    .show-pc {
      display: block;
    }
    .show-mo {
      display: none;
    }
    @media (max-width: 1400px) {
      text-align: center;
      margin: 16px 0;
      .show-pc {
        display: none;
      }
      .show-mo {
        display: inline-block;
        height: 20px;
      }
    }
  }

  .copyright {
    font-size: 14px;
    color: $color;
    margin-top: 16px;
    @media (max-width: 1400px) {
      font-size: 12px;
      line-height: 18px;
      margin-top: 8px;
    }
  }

  .footer-option {
    text-align: center;
    .link {
      color: $color;
      font-size: 14px;
      display: inline-block;
      padding: 0 12px;
      border-right: 1px solid $color;
      &:last-child {
        border-right: 0;
      }
      @media (max-width: 1400px) {
        font-size: 12px;
        line-height: 18px;
        padding: 0 6px;
      }
    }
    @media (max-width: 1400px) {
      order: -1;
    }
  }

  .footer-right {
    flex: 1;
    .code-box {
      display: flex;
      justify-content: right;
      gap: 16px;
      margin-bottom: 16px;
      .code-pop {
        position: relative;
        height: 20px;
        display: block;
        > img {
          height: 100%;
          object-fit: cover;
        }
        .code-layer {
          position: absolute;
          top: -105px;
          left: -32px;
          z-index: 99;
          display: none;
          background: #fff;
          padding: 6px;
          img {
            width: 78px;
            height: 78px;
          }
          .txt {
            font-size: 12px;
            color: $color;
            display: none;
          }
          &::after {
            border: 10px solid transparent;
            content: '';
            border-top-color: #fff;
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            display: block;
          }
          @media (max-width: 800px) {
            display: block;
            position: initial;
            background: none;
            padding: 0;
            text-align: center;
            &::after {
              display: none !important;
            }
            .txt {
              display: block;
            }
          }
        }
        &:hover {
          .code-layer {
            display: block;
          }
        }
        @media (max-width: 800px) {
          height: auto;
          > img {
            display: none;
          }
        }
      }
      @media (max-width: 1400px) {
        justify-content: center;
      }
      @media (max-width: 1100px) {
        margin-top: 24px;
      }
    }
    .footer-links {
      display: flex;
      justify-content: right;
      align-items: center;
      gap: 16px;
      .links-logo {
        height: 16px;
        img {
          height: 100%;
          object-fit: cover;
        }
      }
      @media (max-width: 1100px) {
        justify-content: center;
      }
      @media (max-width: 800px) {
        display: flex;
        text-align: center;
        .img {
          height: 16px;
        }
      }
      &.iszh {
        gap: 10px;
        .links-logo {
          height: 14px;

          &:first-child {
            height: 18px;
          }
        }
        @media (max-width: 800px) {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          text-align: center;
          margin-top: 40px;
          .img {
            height: 16px;
          }
        }
      }
    }

    p {
      color: $color;
      font-size: 12px;
      margin-top: 8px;
    }
  }

  .email {
    color: $color;
    font-size: 14px;
    cursor: pointer;
    @media (max-width: 1400px) {
      font-size: 12px;
    }
  }
  .float-right {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 70vh;
    right: 50px;
    z-index: 10;
    box-shadow: 0 1px 5px rgba(45, 47, 51, 0.1);
    .nav-item {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 50px;
      height: 50px;
      background-color: #ffffff;
      background-size: cover;
      font-size: 12px;
      line-height: 18px;
      color: #000000;
      .text {
        word-spacing: 100vw;
        display: none;
      }
      .o-icon {
        font-size: 24px;
      }
      &:hover {
        color: #ffffff;
        background-color: #000000;
        .o-icon {
          display: none;
        }
        .text {
          display: block;
        }
      }
    }

    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
  .dark-nav {
    .nav-item {
      &:hover {
        background-color: #ffffff;
        color: #000000;
      }
    }
  }
  .investigation {
    left: 50px;
    right: inherit;
    @media screen and (max-width: 1430px) {
      display: block;
      bottom: 50px;
      // left: 50%;
      // transform: translateX(-50%);
    }
    .icon {
      cursor: pointer;
      position: absolute;
      right: -10px;
      top: -10px;
      width: 20px;
      color: #000000;
    }
  }
}
</style>
