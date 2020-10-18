<template>
  <div class="add">
    <el-dialog
      :title="info.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="info.isShow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="图片">
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

        <!-- element-ui 上传文件 start -->
        <!-- <el-form-item label="图片">
          <el-upload
            action="#"
            class="avatar-uploader"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="getFile2"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file">
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item> -->

        <!-- element-ui 上传文件 end -->

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
import { reqBannerAdd, reqBannerInfo, reqBannerEdit } from "../../../utils/api";
import { indexRoutes } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      // 图片地址
      imgUrl: "",
      form: {
        title: "",
        img: null,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      lists: "banner/lists",
    }),
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },

    // end
    ...mapActions({
      reqListMenu: "banner/reqListMenu",
    }),
    // 取消事件
    cancel() {
      this.info.isShow = false;
    },
    // 重置事件
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    // 判断
    checkBanner() {
      if (this.form.title == "") {
        warningAlert("标题不能为空");
        return false;
      }
      if (this.form.img == null) {
        warningAlert("图片不能为空");
        return false;
      }
      return true;
    },
    // 添加事件
    menuAdd() {
      if (!this.checkBanner()) {
        return;
      }
      reqBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 成功
          successAlert(res.data.msg);
          // 清空表单
          this.empty();
          // form表单取消事件
          this.cancel();
          // list数据刷新
          this.reqListMenu();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取文件
    getFile(e) {
      // 拿到图片文件
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
    // getFile2(e) {
    //   let file = e.raw;
    //   this.imgUrl = URL.createObjectURL(file);
    //   this.form.img = file;
    // },
    // 获取单独一条信息
    look(id) {
      reqBannerInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 获取单独一条数据的时候没有id所以得拿到id
          this.form.id = id;
          // 拿到图片
          this.imgUrl = this.$imgPre + this.form.img;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改事件
    editors() {
      // 调取接口

      reqBannerEdit(this.form).then((res) => {
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
  mounted() {},
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