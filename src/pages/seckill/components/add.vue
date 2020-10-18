<template>
  <div class="add">
    <el-dialog
      :title="info.isAdd ? '添加秒杀活动' : '编辑秒杀活动'"
      :visible.sync="info.isShow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="活动期限">
          <div class="block">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in listsCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" @change="changeShopping">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品">
          <el-select v-model="form.goodsid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in speckillList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
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
import { mapGetters, mapActions } from "vuex";
import {
  reqSeckillAdd,
  reqSeckillInfo,
  reqSeckillEdit,
  rewCateList,
  reqGoodsList,
} from "../../../utils/api";
import { indexRoutes } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      value: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      // 二级分类
      secondList: [],
      // 商品
      speckillList: [],
    };
  },
  computed: {
    ...mapGetters({
      // 分类list
      listsCate: "cate/lists",
      // 秒杀list
      listsSpeckill: "speckill/lists",
      // 商品管理
      listsGoods: "goods/lists",
    }),
  },
  methods: {
    ...mapActions({
      reqListMenu: "cate/reqListMenu",
      reqListSpeckill: "speckill/reqListMenu",
      reqListGoods: "goods/reqListMenu",
    }),
    // 一级事件
    changeFirst() {
      // 调取分类接口----展示二级分类
      // rewCateList({ pid: this.form.first_cateid }).then((res) => {
      //   this.secondList = res.data.list;
      // });
      this.form.second_cateid = "";
      // 调用二级分类
      this.getChangeFirst();
    },
    // 公共二级分类---查看一条数据的时候需要调用
    getChangeFirst() {
      let obj = this.listsCate.find(
        (item) => item.id == this.form.first_cateid
      );
      this.secondList = obj.children;
    },
    // 二级分类点击事件---展示商品的信息
    changeShopping() {
      this.form.goodsid = "";
      this.getChangeShopping();
    },
    // 公共商品展示
    getChangeShopping() {
      reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.speckillList = res.data.list;
      });
    },
    // 取消事件
    cancel() {
      this.info.isShow = false;
    },
    // 重置事件
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.value = [];
    },
    checkSeckill() {
      if (this.form.title == "") {
        warningAlert("活动名称不能为空");
        return false;
      }
      if (this.form.begintime == "" && this.form.endtime == "") {
        warningAlert("活动期限不能为空");
        return false;
      }
      if (this.form.first_cateid == "") {
        warningAlert("一级分类不能为空");
        return false;
      }
      if (this.form.second_cateid == "") {
        warningAlert("二级分类不能为空");
        return false;
      }
      if (this.form.goodsid == "") {
        warningAlert("商品不能为空");
        return false;
      }
      return true;
    },
    // 添加事件
    menuAdd() {
      if (!this.checkSeckill()) {
        return;
      }
      //转换为时间戳返回给后台
      this.form.begintime = this.value[0].getTime();
      this.form.endtime = this.value[1].getTime();
      reqSeckillAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 成功
          successAlert(res.data.msg);
          // 清空表单
          this.empty();
          // form表单取消事件
          this.cancel();
          // list数据刷新
          this.reqListSpeckill();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取单独一条信息
    look(id) {
      reqSeckillInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 显示时间----将时间戳转换为标准时间
          this.value = [
            new Date(parseInt(this.form.begintime)),
            new Date(parseInt(this.form.endtime)),
          ];
          // 获取单独一条数据的时候没有id所以得拿到id
          this.form.id = id;
          // 分别调取二级分类和商品
          this.getChangeFirst();
          this.getChangeShopping();
          // 转换时间戳
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改事件
    editors() {
      this.form.begintime = this.value[0].getTime();
      this.form.endtime = this.value[1].getTime();
      // 调取接口
      reqSeckillEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListMenu();
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
  },
  mounted() {
    // 分类内容加载
    if (this.listsCate.length == 0) {
      this.reqListMenu();
    }
    // 商品管理
    if (this.listsGoods.length == 0) {
      this.reqListGoods();
    }
  },
};
</script>
<style lang="stylus" scoped>
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

/* element-ui */
.add >>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>