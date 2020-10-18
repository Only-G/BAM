<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="info.isShow"
      @closed="close"
      @opened="opened"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in listsCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="图片" v-if="form.pid != 0">
          <div class="my-upload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt="" />
            <input
              type="file"
              v-if="info.isShow"
              class="my-input"
              @change="getFile"
            />
          </div>
        </el-form-item>

        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" @change="changeSpecs">
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in listsSpecs"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in specsList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述">
          <div id="editor"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="menuAdd" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="editors" v-else>修 改</el-button>
      </div>
    </el-dialog>

    <!--  -->
  </div>
</template>
<script>
// 富文本编辑器引入
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import {
  reqGoodsAdd,
  reqGoodsInfo,
  reqGoodsEdit,
  rewCateList,
} from "../../../utils/api";
import { indexRoutes } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 二级分类
      secondCateList: [],
      // 商品属性
      specsList: [],
    };
  },
  computed: {
    ...mapGetters({
      // 商品分类
      listsCate: "cate/lists",
      // 商品规格
      listsSpecs: "specs/lists",
      // 商品管理list
      listsGoods: "goods/lists",
    }),
  },
  methods: {
    // 富文本编辑器引用opened方法---弹框打开完成
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      // 打开获取文本编辑器的内容
      this.editor.txt.html(this.form.description);
    },
    ...mapActions({
      //  商品分类list
      reqListCate: "cate/reqListMenu",
      //  商品规格list
      reqListSpecs: "specs/reqListMenu",
      // 商品管理
      reqListGoods: "goods/reqListMenu",
      // 总数
      reqTotalAction: "goods/reqTotalAction",
    }),
    // 一级分类修改获取二级分类的list
    changeFirst() {
      // 当点击下一个选项的时候二级分类清空
      this.form.second_cateid = "";
      this.getSecondList();
    },
    // 公共级别分类
    getSecondList() {
      // 加载商品分类
      rewCateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },

    // 商品规格
    changeSpecs() {
      // 当点击下一个规格清空属性在选择
      this.form.specsattr = [];
      this.getAttrSpecs();
    },
    // 公共商品规格属性
    getAttrSpecs() {
      // 在listsSpecs中找到那一条数据的id和当前specsid的id是一样的
      let obj = this.listsSpecs.find((item) => item.id == this.form.specsid);
      this.specsList = obj.attrs;
    },
    // 取消事件
    cancel() {
      this.info.isShow = false;
    },
    // 重置事件
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
      this.secondCateList = [];
      this.specsList = [];
    },
    // 判断
    checkGoods() {
      if (this.form.first_cateid == "") {
        warningAlert("一级分类不能为空");
        return false;
      }
      if (this.form.second_cateid == "") {
        warningAlert("二级分类不能为空");
        return false;
      }
      if (this.form.goodsname == "") {
        warningAlert("商品名称不能为空");
        return false;
      }
      if (this.form.price == "") {
        warningAlert("商品价格不能为空");
        return false;
      }
      if (this.form.specsid == "") {
        warningAlert("商品规格不能为空");
        return false;
      }
      if (this.form.specsattr == "") {
        warningAlert("商品属性不能为空");
        return false;
      }
      if (this.form.goodsname == "") {
        warningAlert("商品名称不能为空");
        return false;
      }
      if (this.form.price == "") {
        warningAlert("商品价格不能为空");
        return false;
      }
      return true;
    },
    // 添加事件
    menuAdd() {
      if (!this.checkGoods()) {
        return;
      }
      // console.log(this.form);
      // 添加之前转换商品规格属性
      // 相当于this.form.specsattr=JSON.stringify(this.form.specsattr),
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGoodsAdd(data).then((res) => {
        if (res.data.code == 200) {
          // 成功
          successAlert(res.data.msg);
          // 清空表单
          this.empty();
          // form表单取消事件
          this.cancel();
          // list数据刷新
          this.reqListGoods();
          // 页总数更新
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 判断菜单
    changPid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 获取单独一条信息
    look(id) {
      reqGoodsInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 获取单独一条数据的时候没有id所以得拿到id
          this.form.id = id;
          // 图片上传
          this.imgUrl = this.$imgPre + this.form.img;
          // 将规格属性字符串转换为数组
          this.form.specsattr = JSON.parse(this.form.specsattr);
          // 调用二级分类和规格属性
          this.getAttrSpecs();
          this.getSecondList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改事件
    editors() {
      // 修改时先设置文本内容
      this.form.description = this.editor.txt.html();
      // 调取接口
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGoodsEdit(data).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListGoods();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 编辑完成后再打开添加内容还在解决方法
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 获取文件
    getFile(e) {
      let file = e.target.files[0];
      // 1.判断图片大小不超过2m
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("文件大小不能超过2M");
        return;
      }
      // 判断后缀名
      let imgExtArr = [".jpg", ".png", ".jpeg", ".gif", "webp"]; //例举后缀
      let extname = file.name.slice(file.name.lastIndexOf(".")); //截取
      //循环遍历每一项后缀名
      if (!imgExtArr.some((item) => item == extname)) {
        warningAlert("文件格式不正确");
        return;
      }
      // URL.createObjectURL通过文件生成一个地址
      this.imgUrl = URL.createObjectURL(file);
      // 将文件保存在img中渲染
      this.form.img = file;
    },
  },

  mounted() {
    // 判断商品分类是否加载过
    if (this.listsCate.length == 0) {
      this.reqListCate();
    }
    // 判断商品规格
    this.reqListSpecs(true);
  },
};
</script>
<style scoped>
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}

.my-upload h3 {
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: 400;
}

.my-upload .my-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}

.my-upload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>