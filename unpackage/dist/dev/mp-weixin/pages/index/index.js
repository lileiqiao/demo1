"use strict";
const api_api = require("../../api/api.js");
const common_vendor = require("../../common/vendor.js");
require("../../api/axios.js");
const _sfc_main = {
  data() {
    return {
      tabarr: [],
      tabnum: 0,
      lbtarr: []
    };
  },
  onLoad() {
    this.xr();
  },
  methods: {
    xr() {
      api_api.getTypeOne().then((res) => {
        this.tabarr = res.listData;
      });
      api_api.lbt().then((res) => {
        console.log(res.homeData.banners);
        this.lbtarr = res.homeData.banners;
      });
    },
    diantab(i, index) {
      console.log(i, index);
      this.tabnum = index;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabarr, (i, index, i0) => {
      return {
        a: common_vendor.t(i.categoryName),
        b: common_vendor.n($data.tabnum == index ? "tabli1" : ""),
        c: common_vendor.o(($event) => $options.diantab(i, index))
      };
    }),
    b: common_vendor.f($data.lbtarr, (i, index, i0) => {
      return {
        a: i.image
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/wode/umi-app/demo1/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
