<template>
  <div>
    <el-row>
      <el-col :span="10">
        <template v-if="model == 'table'">
          <el-input
            class="w-max200 fl"
            v-model="fetchOption.where"
            @keyup.enter.native="handleSearch"
          >
          </el-input>
          <div
            @click="handleSearch"
            class="el-input-group__append search"
          >
            <i class="el-icon-search"></i>
          </div>
        </template>
        <template v-else>
          <el-input
            class="w-max200 fl"
            v-model="imgWhere.where"
            @keyup.enter.native="handleSearchScroll"
          >
          </el-input>
          <div
            @click="handleSearchScroll"
            class="el-input-group__append search"
          >
            <i class="el-icon-search"></i>
          </div>
        </template>
        <el-popover
          ref="popover"
          placement="top-start"
          title="搜索"
          width="200"
          trigger="hover"
          content="Search SKU, NEW SKU, Product Name, Deprecated SKU 字段"
        >
          <el-button
            slot="reference"
            class="radius"
          >?</el-button>
        </el-popover>
      </el-col>
      <el-col :span="14">
        <!-- <el-button
          class="fr"
          @click="handleAdd"
          type="primary"
        >新增SKU</el-button> -->
        <el-button
          class="fr mr10 mt5"
          @click="handleStyleChange"
          size="small"
        >
          <span>樣式切換</span>
          <i
            v-if="model == 'table'"
            class="el-icon-picture"
          ></i>
          <i
            v-else
            class="el-icon-tickets"
          ></i>
        </el-button>
        <el-button
          v-if="privilege"
          :loading="exportLoading"
          class="fr mr10 mt5"
          @click="handleExport"
          size="small"
        >导出SKU</el-button>
        <!-- <el-button
          class="fr mr5 mt5"
          @click="handleReassemble"
          size="small"
        >SKU編碼重編</el-button> -->
        <!-- <el-checkbox-group
          v-model="record"
          @change="handleSize"
          size="small"
          style="display:inline-block;padding:5px;float:right"
        >
          <el-checkbox-button
            label="deprecatedSku"
            :key="4"
          >已停用SKU</el-checkbox-button>
          <el-checkbox-button
            label="price"
            :key="5"
          >成本</el-checkbox-button>
        </el-checkbox-group> -->
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      v-if="model == 'img'"
      style="width: 1200px; margin: 0 auto;"
    >
      <wonScrollPagination
        target=".el-main"
        :fetchData="handleScroll"
        ref="wonScrollPagination"
      >
        <template slot="data">
          <el-col
            style="width: 20%"
            v-for="(v, index) in imgsData"
            :key="v.sku + index"
          >
            <el-card
              :body-style="{ padding: '0px' }"
              @click.native="handleEdit(v)"
              :class="{
           'content-card__select': selectionMethod(v, selection),
           'content-card': true
          }"
            >
              <img
                :src="
          require('@/assets/img/img-error.png')"
                class="info__image"
                loading="lazy"
                v-errorImg="v.snapshotURL"
              >
              <div class="info__footer">
                <span class="info__title">{{ v.productName }}</span>
                <div class="info__bottom info__clearfix">
                  <span class="info__sku">{{ v.sku }}</span>
                  <!-- <el-dropdown
                class="info__button"
                @command="handleDropDownCommand($event, v)"
              >
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="look">查看</el-dropdown-item>
                  <el-dropdown-item command="edit">編輯</el-dropdown-item>
                  <el-dropdown-item command="copy">複製</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
                </div>
                <div>
                  <el-checkbox
                    class="info__button"
                    :value=" v | selectionfilter(selection)"
                    @input="handleCheck($event, v)"
                  ></el-checkbox>
                </div>
              </div>
            </el-card>
          </el-col>
        </template>
      </wonScrollPagination>
    </el-row>
    <el-row
      v-if="model == 'table'"
      class="mt5"
    >
      <el-table
        ref="wonTable"
        :max-height="maxHeight"
        :data="tableData"
        v-loading="isTableLoading"
        @sort-change="handleSortChange"
        :row-key="rowKey"
      >
        <el-table-column
          v-if="privilege"
          type="selection"
          width="55"
          reserve-selection
        >
        </el-table-column>
        <el-table-column
          sortable="custom"
          label="產品名稱"
          prop="productName"
          min-width="180"
        ></el-table-column>
        <el-table-column
          sortable="custom"
          min-width="80"
          label="SKU"
          prop="sku"
        ></el-table-column>
        <el-table-column
          min-width="100"
          key="4"
          label="Amazon(長x寬x高/重)"
          prop="Amazon"
        >
          <template slot-scope="scope">
            <span>{{scope.row.amazonLengthCM}}</span>x<span>{{scope.row.amazonWidthCM}}</span>x<span>{{scope.row.amazonHeightCM}}cm</span>/<span>{{scope.row.amazonWeightKG}}kg</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="80"
          key="7"
          label="小包(長x寬x高/重)"
          prop="parcel"
        >
          <template slot-scope="scope">
            <span>{{scope.row.parcelLengthCM}}</span>x<span>{{scope.row.parcelWidthCM}}</span>x<span>{{scope.row.parcelHeightCM}}cm</span>/<span>{{scope.row.parcelWeightKG}}kg</span>
          </template>
        </el-table-column>
        <template v-if="deprecatedSkuShow">
          <el-table-column
            min-width="100"
            label="已停用 SKU"
            prop="deprecatedSKU"
            algin="center"
            key="11"
          > </el-table-column>
        </template>
        <template v-if="priceShow">
          <el-table-column
            min-width="70"
            label="成本"
            prop="productCost"
            key="10"
          >
            <template slot-scope="scope">
              {{scope.row.productCost | formatToMoney}}&nbsp;{{scope.row.productCostCurrency}}
            </template>
          </el-table-column>
        </template>
        <el-table-column
          class-name="tableColumn"
          label="圖片"
          width="70"
          align="center"
        >
          <template slot-scope="scope">
            <img
              width="50"
              height="50"
              style="cursor:pointer"
              :src="scope.row.snapshotURL"
              @click="scope.row.dialogTableVisible = true"
            >
            <el-dialog
              title="圖片"
              :modal="false"
              :visible.sync="scope.row.dialogTableVisible"
              width="30%"
            >
              <img
                width="100%"
                :src="scope.row.imageURL"
              >
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column
          min-width="50"
          label="動作"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              class="btnh"
              type="text"
              title="查看"
              icon="el-icon-won-40"
              @click="handleLook(scope.row)"
            ></el-button>
            <el-button
              class="btnh"
              type="text"
              title="編輯"
              icon="el-icon-won-1"
              @click="handleEdit(scope.row)"
            ></el-button>
            <el-button
              class="btnh"
              type="text"
              title="複製"
              icon="el-icon-won-124"
              @click="handleCopy(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <won-pagination
        v-bind="paginationProps"
        v-on="paginationListeners"
      >
        <div class="ibbox">
          <span class="fz13 c-gray5">共選擇 {{selection.length}} 條 </span>
          <el-button
            type="text"
            class="pt9"
            @click="clearSelect"
          >取消選擇</el-button>
        </div>
      </won-pagination>
    </el-row>
    <wonDialog
      name="sku"
      ref="dialog"
      size="35%"
      title="sku導出"
      :showConfirm="false"
    >
      <div
        slot="content"
        class="t_a-c"
      >
        <a
          class="pic-text"
          :href="url"
        >點擊下載</a>
      </div>
    </wonDialog>
  </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import wonDialog from "@/common/wonDialog";
import C from "js-cookie";
import showDialog from "won-service/component/won-dialog/dialog";
import reassemble from "./skuReassemble";
import imgError from "won-service/_directive/error-img";
import wonScrollPagination from "@/common/wonScrollPagination";
export default {
  extends: wonTableContainer,
  mixins: [imgError],
  name: "sku",
  components: {
    wonDialog,
    wonScrollPagination
  },
  data() {
    let privilege = C.get("privilege") == "admin";
    return {
      model: "img",
      privilege,
      url: "javascript:void(0)",
      exportLoading: false,
      record: [],
      amaShow: false,
      parcelShow: false,
      deprecatedSkuShow: false,
      priceShow: false,
      productShow: false,
      selection: [],
      value: "",
      tableData: [],
      imgsData: [],
      isTableLoading: false,
      isImgLoading: false,
      showDialog: false,
      row: [],
      dialogTableVisible: false,
      fetchCondition: {
        skip: 0,
        limit: 20,
        order: "-AddedTime"
      },
      fetchOption: {
        url: "sku/search",
        where: "",
        method: "post"
      },
      imgWhere: {
        url: "sku/search",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    this.handleSearch();
    this.Bus.$on("refresh", this.handleSearch);
  },
  mounted() {
    this.$refs["wonTable"] &&
      this.$refs["wonTable"].$watch("store.states.selection", v => {
        this.selection = v;
      });
  },
  filters: {
    selectionfilter(value, selection) {
      let obj = selection.find(item => {
        return value.sku == item.sku;
      });
      return !!obj;
    }
  },
  methods: {
    selectionMethod(value, selection) {
      let obj = selection.find(item => {
        return value.sku == item.sku;
      });
      return !!obj;
    },
    handleCheck(event, value) {
      if (event) {
        this.selection.push(value);
      } else {
        this.selection = this.selection.filter(item => {
          return item.sku != value.sku;
        });
      }
    },
    handleStyleChange() {
      this.model = this.model == "img" ? "table" : "img";
      this.$nextTick(() => {
        if (this.model == "table") {
          this.selection.forEach(row => {
            this.$refs["wonTable"] &&
              this.$refs["wonTable"].toggleRowSelection(row);
          });
        }
      });
    },
    handleDropDownCommand(command, v) {
      switch (command) {
        case "copy":
          this.handleCopy(v);
          break;
        case "look":
          this.handleLook(v);
          break;
        case "edit":
          this.handleEdit(v);
          break;
      }
    },
    clearSelect() {
      this.$refs["wonTable"].clearSelection();
    },
    handleExport() {
      this.exportLoading = true;
      let data = [];
      _.each(this.selection, v => {
        data.push(v.sku);
      });
      axios({
        url: "sku/generate/excel",
        method: "post",
        data: {
          token: this.token,
          value: JSON.stringify(data)
        }
      }).then(res => {
        this.$refs["dialog"].dialogVisible = true;
        this.exportLoading = false;
        this.url = res;
      });
    },
    handleReassemble() {
      showDialog(reassemble, {
        title: "SKU重編",
        hideConfirm: true
      });
    },
    handleSearchScroll: _.debounce(function() {
      this.$refs["wonScrollPagination"] &&
        this.$refs["wonScrollPagination"].refresh();
      this.imgsData = [];
    }),
    async handleScroll(option) {
      this.isImgLoading = true;
      let { data } = await axios({
        url: this.imgWhere.url,
        method: this.imgWhere.method,
        data: {
          where: this.imgWhere.where,
          skip: option.skip,
          limit: option.limit
        }
      });
      this.isImgLoading = false;
      _.each(data, v => {
        v.dialogTableVisible = false;
      });
      this.imgsData = this.imgsData.concat(data);
      return data;
    },
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      if (this.fetchOption.where) {
        this.fetchCondition.order = "sku";
      } else {
        this.fetchCondition.order = "-AddedTime";
      }
      axios({
        url: this.fetchOption.url,
        method: this.fetchOption.method,
        data: {
          where: this.fetchOption.where,
          token: this.token,
          skip: this.fetchCondition.skip,
          limit: this.fetchCondition.limit,
          order: this.fetchCondition.order
        }
      }).then(({ data, count }) => {
        this.isTableLoading = false;
        _.each(data, v => {
          v.dialogTableVisible = false;
        });
        this.tableData = _.cloneDeep(data);
        this.paginationProps.total = count;
      });
    }, 500),
    handleAdd() {
      this.$router.push("/skuAdd");
    },
    handleCopy(row) {
      this.$router.push({
        name: "skuAdd",
        query: { data: JSON.stringify(row), copy: 1 }
      });
    },
    handleShow() {
      this.showDialog = false;
    },
    handleLook(row) {
      this.$router.push({
        name: "skuEdit",
        query: { data: JSON.stringify(row), type: "look" }
      });
    },
    handleEdit(row) {
      this.$router.push({
        name: "skuEdit",
        query: { data: JSON.stringify(row) }
      });
    },
    handleSize(val) {
      if (val.includes("ama")) {
        this.amaShow = true;
      } else {
        this.amaShow = false;
      }

      if (val.includes("parcel")) {
        this.parcelShow = true;
      } else {
        this.parcelShow = false;
      }

      if (val.includes("product")) {
        this.productShow = true;
      } else {
        this.productShow = false;
      }

      if (val.includes("deprecatedSku")) {
        this.deprecatedSkuShow = true;
      } else {
        this.deprecatedSkuShow = false;
      }

      if (val.includes("price")) {
        this.priceShow = true;
      } else {
        this.priceShow = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/common/index.scss";
.content-card__select {
  box-shadow: 0px 0px 8px #409eff;
  transition: all 0.4s;
}
.content-card {
  margin-top: 10px;
  .info__title {
    font-size: 18px;
    height: 52px;
    @include multi-ellipsis(2);
  }
  .info__footer {
    padding: 14px;
    height: 100px;
  }
  .info__img {
    display: block;
  }
  .info__sku {
    font-size: 13px;
    color: #999;
  }

  .info__bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .info__button {
    padding: 0;
    float: right;
    color: #409eff;
    cursor: pointer;
  }

  .info__image {
    width: 100%;
    display: block;
    height: 200px;
    // background-size: cover;
    object-fit: cover;
  }

  .info__clearfix:before,
  .info__clearfix:after {
    display: table;
    content: "";
  }

  .info__clearfix:after {
    clear: both;
  }
}
</style>
